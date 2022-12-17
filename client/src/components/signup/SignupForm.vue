<template>
	<form class="signup-form" @submit.prevent="$emit('sendFormToParent')">
		<div
			class="input-container"
			v-for="(field, index) in fields"
			:key="index + '-field'"
		>
			<input
				class="input-container_input"
				:name="field.name"
				:type="field.type"
				:placeholder="field.placeholder"
				@focusout="inputValidation($event, field)"
				required
			/>
			<ErrorIcon :field="field" />
		</div>
		<input class="submit-button" type="submit" />
	</form>
</template>
<script>
import ErrorIcon from "../common/ErrorIcon.vue";

export default {
	name: "SignupForm",
	components: { ErrorIcon },
	props: {
		fields: {
			type: Array,
			required: true,
		},
	},
	methods: {
		inputValidation(e, field) {
			const data = {
				field,
				newValue: e.target.value,
			};
			this.$store.dispatch("validationFunction", data);
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
	border-radius: $standard-radius;
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
</style>
