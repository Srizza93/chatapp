<template>
	<div class="signup">
		<span class="signup-title">Signup on ChatApp</span>
		<signup-form />
	</div>
</template>
<script>
import SignupForm from "@/components/SignupForm.vue";

export default {
	name: "SignupPage",
	components: { SignupForm },
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
	font-size: 28px;
	color: $primary-color;
	font-weight: bold;
}
</style>
