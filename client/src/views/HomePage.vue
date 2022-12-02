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
import LoginForm from "@/components/LoginForm.vue";

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
	async mounted() {
		const response = await axios.get("api/loginCredentials/");
		this.users = response.data;
	},
	methods: {
		inputsValidation(data) {
			const user = this.users.find((user) => user.username === data[0].text);
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
