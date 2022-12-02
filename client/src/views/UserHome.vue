<template>
	<div class="login">
		<TopUserPage :userData="user" />
	</div>
</template>
<script>
import TopUserPage from "@/components/TopUserPage.vue";

export default {
	name: "LoginPage",
	components: { TopUserPage },
	data() {
		return {
			user: {},
		};
	},
	mounted() {
		this.user = this.$store.getters.userData;
	},
};
</script>
<style lang=""></style>
