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
	methods: {
		async dispatchApiCall() {
			await this.$store.dispatch("apiCall");
			this.users = this.$store.getters.usersList;
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
			this.$store.commit("updateUserData", user);
			this.$router.push(`/user-home/:${user._id}`);
		},
	},
	mounted() {
		this.dispatchApiCall();
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
