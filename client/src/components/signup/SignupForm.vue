<template>
	<form class="signup-form" @submit.prevent="$emit('sendFormToParent')">
		<div
			class="input-container"
			v-for="field in fields"
			:key="field.id + '-field'"
		>
			<input
				class="input-container_input"
				:name="field.name"
				:type="field.type"
				:placeholder="field.placeholder"
				@focusout="field.validationFunction(field)"
				v-model="field.value"
			/>
			<img
				v-if="field.value"
				class="input-container_cross"
				:src="getImgUrl(isInputValid(field.valid))"
				alt="red-cross"
			/>
		</div>
		<input class="submit-button" type="submit" />
	</form>
</template>
<script>
export default {
	name: "SignupForm",
	props: {
		fields: {
			type: Array,
			required: true,
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
<style lang="scss">
.signup-form {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: $standard-distance;
	margin: $standard-distance;
	background-color: white;
}
.input-container {
	position: relative;
	display: flex;
	flex-direction: row;
}
.input-container_input {
	padding: $small-distance;
	border: 2px solid $primary-gray;
	border-radius: $standard-radius;
	margin-bottom: 20px;
}
.input-container_cross {
	position: absolute;
	right: -25px;
	top: 10px;
	width: 20px;
	height: 20px;
}
</style>
