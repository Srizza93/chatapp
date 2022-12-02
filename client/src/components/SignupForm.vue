<template>
	<form class="signup-form">
		<div
			class="input-container"
			v-for="field in fields"
			:key="field.id + '-field'"
		>
			<input
				:name="field.name"
				:type="field.type"
				:placeholder="field.placeholder"
				@focusout="field.validationFunction(field, this)"
				v-model="field.value"
			/>
			<img
				v-if="field.value"
				class="input-container_cross"
				:src="getImgUrl(isInputValid(field.valid))"
				alt="red-cross"
			/>
		</div>
	</form>
</template>
<script>
export default {
	name: "SignupForm",
	data() {
		return {
			fields: [
				{
					id: 1,
					name: "username",
					type: "text",
					placeholder: "Username",
					value: "",
					valid: false,
					validationFunction: function (input, self) {
						const usernameUsed = self.$store.getters.usersList.find(
							(user) => user.username === input.value
						);
						console.log(self.$store.state.users);
						if (usernameUsed) {
							input.valid = false;
							return;
						}
						const regex = /^[A-Za-z][A-Za-z_]{1,}$/;
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
					validationFunction: function (input, self) {
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
					validationFunction: function (input, self) {
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
					validationFunction: function (input, self) {
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
					validationFunction: function (input, self) {
						const regex = /^[A-Za-z]{1,}$/;
						self.testRegex(input, regex);
					},
				},
			],
		};
	},
	methods: {
		getImgUrl(pic) {
			const images = require.context("@/assets", false, /\.png$/);
			return images("./" + pic + ".png");
		},
		testRegex(input, regex) {
			if (!regex.test(input.value)) {
				input.valid = false;
				return;
			}
			input.valid = true;
		},
		isInputValid(input) {
			return input ? "green-tick" : "red-cross";
		},
	},
};
</script>
<style lang="scss">
.signup-form {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: $standard-distance;
	margin: $standard-distance;
	background-color: white;
}
.input-container {
	display: flex;
	flex-direction: row;
}
.input-container_cross {
	width: 20px;
	height: 20px;
}
</style>
