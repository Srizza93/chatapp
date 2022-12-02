<template>
	<div id="app">
		<RouterView></RouterView>
		<footer-comp />
	</div>
</template>

<script>
import FooterComp from "./components/FooterComp.vue";

export default {
	name: "App",
	components: { FooterComp },
};
</script>

<style>
#app {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}
.icon {
	cursor: pointer;
}
</style>
