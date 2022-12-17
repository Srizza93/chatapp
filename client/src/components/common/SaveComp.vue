<template>
	<div class="save-container">
		<button class="save">
			<img class="save_img" src="@/assets/save-icon.png" alt="save" />
		</button>
	</div>
</template>
<script>
export default {
	name: "SaveComp",
};
</script>
<style lang="scss">
.save-container {
	display: flex;
}
.save {
	display: flex;
	width: 25px;
	height: 25px;
	padding: 0;
	border: none;
	background: transparent;
	cursor: pointer;
}
.save:hover {
	opacity: $standard-opacity;
}
.save_img {
	width: 25px;
	height: 25px;
}
</style>
