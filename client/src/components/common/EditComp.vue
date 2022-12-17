<template>
	<div :class="editClass">
		<button class="edit-container">
			<img
				class="edit-container_photo"
				src="@/assets/edit-icon.png"
				alt="edit"
			/>
		</button>
		<slot></slot>
	</div>
</template>
<script>
export default {
	name: "EditComp",
	props: {
		editClass: {
			type: String,
			required: false,
		},
	},
};
</script>
<style lang="scss">
.edit-container {
	position: relative;
	display: flex;
	width: 25px;
	height: 25px;
	padding: 0;
	border: none;
	background: transparent;
	cursor: pointer;
}
.edit-container:hover {
	opacity: $standard-opacity;
}
.edit-container_photo {
	width: 25px;
	height: 25px;
}
</style>
