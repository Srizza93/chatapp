<template>
	<form class="login" @submit.prevent="$emit('getCredentialsFromComp', fields)">
		<input
			class="input-login"
			v-for="(field, index) in fields"
			:key="index + '-field'"
			:type="field.type"
			:placeholder="field.placeholder"
			v-model="field.text"
		/>
		<div class="result-login">
			<input class="submit-button" type="submit" value="Login" />
			<div class="result-login_message" v-if="wrongUser || wrongPass">
				<span v-if="wrongUser">Incorrect Username</span>
				<span v-if="wrongPass">Incorrect Password</span>
				<img
					class="input-container_icon"
					:src="getImgUrl('red-cross')"
					alt="red-cross"
				/>
			</div>
		</div>
		<router-link to="/" class="forgot-password">Forgot Password?</router-link>
		<div class="signup-wrapper">
			<router-link to="/" class="signup-wrapper_link">Sign up</router-link>
		</div>
	</form>
</template>
<script>
export default {
	name: "LoginForm",
	props: {
		wrongUser: {
			type: Boolean,
			required: true,
		},
		wrongPass: {
			type: Boolean,
			required: true,
		},
	},
	data() {
		return {
			fields: [
				{
					name: "username",
					text: "",
					type: "text",
					placeholder: "Username or email",
					regex: /^[a-zA-Z][a-zA-Z_]{5,30}$/,
				},
				{
					name: "password",
					text: "",
					type: "password",
					placeholder: "Password",
					regex:
						/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
				},
			],
		};
	},
	methods: {
		getImgUrl(pic) {
			const images = require.context("@/assets", false, /\.png$/);
			return images("./" + pic + ".png");
		},
	},
};
</script>
<style lang="scss" scoped>
.login {
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 370px;
	padding: $standard-distance;
	margin: $standard-distance;
	border-radius: $standard-radius;
	background-color: white;
}
.input-login {
	display: flex;
	flex-direction: column;
	padding: 10px 20px;
	border: 2px solid $primary-gray;
	border-radius: $standard-radius;
	margin-bottom: 20px;
}
.input-container_input:focus {
	outline: solid $primary-color;
}
.result-login {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 20px;
}
.result-login_message {
	display: flex;
	flex-direction: row;
	align-items: center;
	font-size: 14px;
	color: red;
}
.input-container_icon {
	width: 20px;
	height: 20px;
	margin-left: 10px;
}
.submit-button {
	width: 100%;
	max-width: 150px;
	padding: 5px;
	border: none;
	border-radius: $standard-radius;
	color: white;
	background-color: $primary-color;
	cursor: pointer;
}
.submit-button:hover {
	background-color: $hover-primary-color;
}
.forgot-password {
	margin-bottom: 20px;
	color: $primary-color;
	text-decoration: none;
}
.forgot-password:hover {
	text-decoration: underline;
}
.signup-wrapper {
	display: flex;
	justify-content: center;
	border-top: 2px solid $primary-gray;
	padding-top: 20px;
}
.signup-wrapper_link {
	padding: $button-padding;
	border-radius: $standard-radius;
	background-color: $primary-color;
	color: white;
	text-decoration: none;
}
.signup-wrapper_link:hover {
	background-color: $hover-primary-color;
}
</style>
