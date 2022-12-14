<template>
	<div id="app">
		<RouterLink class="icon-container" to="/">
			<img src="@/assets/chat-icon.png" alt="icon" />
		</RouterLink>
		<RouterView></RouterView>
		<footer-comp />
	</div>
</template>

<script>
import FooterComp from "./components/common/FooterComp.vue";

export default {
	name: "App",
	components: { FooterComp },
};
</script>

<style lang="scss" scoped>
#app {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}
.icon {
	cursor: pointer;
}
.icon-container {
	position: fixed;
	right: 0;
	display: flex;
	justify-content: end;
	padding: 10px;
}
.icon-container:hover {
	opacity: $standard-opacity;
}
</style>
