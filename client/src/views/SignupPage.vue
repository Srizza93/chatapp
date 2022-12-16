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
			return Object.values(this.$store.getters.getFields);
		},
	},
	methods: {
		async signUp() {
			const allFieldsValid = Object.values(this.fields).every(
				(field) => field.valid
			);

			if (!allFieldsValid) {
				return;
			}

			const data = {
				email_Address: this.fields[0].value,
				password: this.fields[1].value,
				name: this.fields[3].value,
				surname: this.fields[4].value,
			};

			try {
				await axios.post("api/loginCredentials/", data).then((response) => {
					if (response.status === 200) {
						this.$store.commit("signupUser", response);
						this.validateSignup("Account Created Successfully!!!");
					}
					if (response.status === 401) {
						console.log("Please verify your email");
					}
				});
			} catch (error) {
				this.validateSignup(
					"An error occurred while creating the account, please try again.",
					error
				);
				console.log("Error is: " + error);
			}
		},
		async validateSignup(outcome, error) {
			this.signupOutcome = true;
			this.signupMessage = outcome;
			this.outcomeError = false;
			if (error) {
				this.outcomeError = true;
			}
			this.cleanUpForm();
			await setTimeout(() => {
				this.signupOutcome = false;
			}, 5000);
		},
		cleanUpForm() {
			for (const key in this.fields) {
				const name = { name: this.fields[key].name };
				this.$store.dispatch("cleanInputs", [name, "", false]);
			}
		},
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
