<template>
  <div class="home">
    <login-form
      :wrongUser="wrongUser"
      :wrongPass="wrongPass"
      @getCredentialsFromComp="inputsValidation"
    />
  </div>
</template>
<script>
import axios from "axios";
import LoginForm from "@/components/homepage/LoginForm.vue";

export default {
  name: "HomePage",
  components: { LoginForm },
  data() {
    return {
      users: [],
      wrongUser: false,
      wrongPass: false,
    };
  },
  mounted() {
    this.APIGetUsers();
  },
  methods: {
    async APIGetUsers() {
      await axios
        .get("/api/users")
        .then((response) => (this.users = response.data))
        .catch(console.error);
    },
    inputsValidation(data) {
      const user = this.users.find(
        (user) => user.email_Address === data[0].text
      );
      if (!user) {
        this.wrongUser = true;
        return;
      }
      this.wrongUser = false;
      if (user.password !== data[1].text) {
        this.wrongPass = true;
        return;
      }
      this.wrongPass = false;
      document.cookie = `userid=${user._id}`;
      this.$router.push(`/user-home/:${user._id}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
