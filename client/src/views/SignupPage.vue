<template>
  <div class="signup">
    <span class="signup-title">Signup on ChatApp</span>
    <span
      v-bind:class="{
        'show-message': signupOutcome,
        'signup-unsuccess': outcomeError,
      }"
      class="signup-success"
      >{{ signupMessage }}</span
    >
    <signup-form :fields="fields" @sendFormToParent="signUp" />
  </div>
</template>
<script>
import axios from "axios";
import SignupForm from "@/components/signup/SignupForm.vue";

export default {
  name: "SignupPage",
  components: { SignupForm },
  data() {
    return {
      signupMessage: "Account Created Successfully!!!",
      signupOutcome: false,
      outcomeError: false,
    };
  },
  computed: {
    fields() {
      const fieldsNames = [
        "email_Address",
        "password",
        "confirm_Password",
        "name",
        "surname",
      ];
      return Object.values(this.$store.getters.getFields)
        .filter((field) => fieldsNames.includes(field.name))
        .map((field) => Object.assign({}, field));
    },
  },
  methods: {
    async signUp() {
      const allFieldsValid = this.fields.every((field) => field.valid);
      if (!allFieldsValid) {
        return;
      }

      const data = {
        email_Address: this.fields.find((f) => f.name === "email_Address")
          .value,
        password: this.fields.find((f) => f.name === "password").value,
        name: this.fields.find((f) => f.name === "name").value,
        surname: this.fields.find((f) => f.name === "surname").value,
      };

      await axios
        .post("api/users/", data)
        .then(() => {
          this.validateSignup("Account Created Successfully!!!", false);
        })
        .catch(() => {
          this.validateSignup(
            "An error occurred while creating the account, please try again.",
            true
          );
        });
    },
    validateSignup(outcome, error) {
      this.signupOutcome = true;
      this.signupMessage = outcome;
      this.outcomeError = false;
      if (error) {
        this.outcomeError = true;
      }
      this.cleanUpForm();
      setTimeout(() => {
        this.signupOutcome = false;
      }, 5000);
    },
    cleanUpForm() {
      for (let i = 0; i < this.fields.length; i++) {
        const name = { name: this.fields[i].name };
        this.$store.dispatch("cleanInputs", [name, "", false]);
      }
    },
  },
  mounted() {
    this.cleanUpForm();
  },
};
</script>
<style lang="scss">
.signup {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $standard-distance;
  text-align: center;
}
.signup-title {
  width: 100%;
  margin-bottom: $standard-margin;
  font-size: 28px;
  color: $primary-color;
  font-weight: bold;
}
.signup-success {
  opacity: 0;
  transition-duration: 2s;
  color: #2bcd2b;
}
.signup-unsuccess {
  color: rgb(198, 0, 0);
}
</style>
