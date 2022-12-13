<template>
	<div class="signup">
		<span class="signup-title">Signup on ChatApp</span>
		<span
			v-bind:class="{ 'show-message': successSignup }"
			class="signup-success"
			>Account Created Successfully!!!</span
		>
		<span
			v-bind:class="{ 'show-message': unsuccessSignup }"
			class="signup-unsuccess"
			>An error occurred while creating the account, please try again.</span
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
		const self = this;
		return {
			successSignup: false,
			unsuccessSignup: false,
			fields: [
				{
					id: 1,
					name: "emailaddress",
					type: "email",
					placeholder: "Email Address",
					value: "",
					valid: false,
					validationFunction: function (input) {
						const emailUsed = self.$store.getters.usersList.find((user) => {
							return user.emailaddress === input.value;
						});
						if (emailUsed) {
							input.valid = false;
							return;
						}
						const regex =
							/^[a-zA-Z0-9!#$%&'*+-/=?^_`{|]{2,64}@[a-zA-Z0-9][a-zA-Z0-9-.]{0,251}[a-zA-Z0-9].[a-zA-Z.]{2,63}$/;
						self.testRegex(input, regex);
					},
				},
				{
					id: 2,
					name: "password",
					type: "password",
					placeholder: "New password",
					value: "",
					valid: false,
					validationFunction: function (input) {
						const regex =
							/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
						self.testRegex(input, regex);
					},
				},
				{
					id: 3,
					name: "confirm password",
					type: "password",
					placeholder: "Confirm password",
					value: "",
					valid: false,
					validationFunction: function (input) {
						const password = document.querySelector("[name='password']").value;
						const pattern = "^" + password + "$";
						const regex = new RegExp(pattern);
						self.testRegex(input, regex);
					},
				},
				{
					id: 4,
					name: "name",
					type: "text",
					placeholder: "Name",
					value: "",
					valid: false,
					validationFunction: function (input) {
						const regex = /^[A-Za-z]{1,}$/;
						self.testRegex(input, regex);
					},
				},
				{
					id: 5,
					name: "surname",
					type: "text",
					placeholder: "Surname",
					value: "",
					valid: false,
					validationFunction: function (input) {
						const regex = /^[A-Za-z]{1,}$/;
						self.testRegex(input, regex);
					},
				},
			],
		};
	},
	methods: {
		testRegex(input, regex) {
			if (!regex.test(input.value)) {
				input.valid = false;
				return;
			}
			input.valid = true;
		},
		async signUp() {
			const data = {
				emailaddress: this.fields[0].value,
				password: this.fields[1].value,
				name: this.fields[3].value,
				surname: this.fields[4].value,
			};
			try {
				await axios.post("api/loginCredentials/", data).then((response) => {
					if (response.status === 200) {
						this.$store.commit("signupUser", response);
						this.successfulSignup();
						this.cleanUpForm();
					}
					if (response.status === 401) {
						console.log("Please verify your email");
					}
				});
			} catch (error) {
				this.unsuccessfulSignup();
				console.log("Error is: " + error);
			}
		},
		successfulSignup() {
			this.unsuccessSignup = false;
			this.successSignup = true;
		},
		unsuccessfulSignup() {
			this.successSignup = false;
			this.unsuccessSignup = true;
		},
		cleanUpForm() {
			this.fields.forEach(
				(field) => ((field.value = ""), (field.valid = false))
			);
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
}
.signup-title {
	width: 100%;
	margin-bottom: $standard-margin;
	font-size: 28px;
	color: $primary-color;
	font-weight: bold;
}
.signup-success {
	visibility: hidden;
	color: #2bcd2b;
}
.signup-unsuccess {
	visibility: hidden;
	color: rgb(198, 0, 0);
}
</style>
