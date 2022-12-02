<template>
	<div class="login">
		<span>{{ user.username }}</span>
	</div>
</template>
<script>
export default {
	name: "LoginPage",
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
