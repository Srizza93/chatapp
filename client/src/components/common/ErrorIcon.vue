<template>
	<img
		v-if="field && field.value"
		class="cross"
		:src="getImgUrl(isInputValid(field.valid))"
		alt="red-cross/green-tick"
		v-bind:class="{ 'outline-pop': !field.valid }"
	/>
</template>
<script>
export default {
	name: "ErrorIcon",
	props: {
		field: {
			type: Object,
			required: false,
		},
	},
	methods: {
		getImgUrl(pic) {
			const images = require.context("@/assets", false, /\.png$/);
			return images("./" + pic + ".png");
		},
		isInputValid(input) {
			return input ? "green-tick" : "red-cross";
		},
	},
};
</script>
<style lang="scss" scoped>
.cross {
	position: absolute;
	right: -25px;
	top: 10px;
	width: 20px;
	height: 20px;
	border-radius: 50%;
}

.outline-pop {
	animation: outline-pop 1s infinite;
}

@keyframes outline-pop {
	0% {
		outline: none;
	}
	50% {
		outline: 2px solid red;
	}
	100% {
		outline-offset: 2px;
		outline: transparent;
	}
}
</style>
