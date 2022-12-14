<template>
	<div class="login">
		<TopUserPage :userData="user" />
	</div>
</template>
<script>
import TopUserPage from "@/components/user/TopUserPage.vue";

export default {
	name: "LoginPage",
	components: { TopUserPage },
	computed: {
		user() {
			return this.$store.getters.userData;
		},
	},
};
</script>
<style lang=""></style>
