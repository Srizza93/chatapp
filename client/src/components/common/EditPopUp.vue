<template>
	<div class="popup-opener" @click.self="togglePopup">
		<form v-if="popupIsOpen" class="popup">
			<span class="close-button" @click="togglePopup">&times;</span>
			<div
				class="field-container"
				v-for="field in personalData"
				:key="field.id"
			>
				<label :for="field.key">{{ parseText(field.key) }}</label>
				<div class="field-container_input-container">
					<input
						class="field-container_input-container_input"
						:id="field.key"
						:type="field.type"
						v-model="field.value"
						:disabled="!field.editable"
					/>
					<ErrorIcon :field="fields[field.key]" />
					<EditComp @click.prevent="editData(field)" />
					<SaveComp @click.prevent="saveData(field)" />
				</div>
			</div>
		</form>
	</div>
</template>
<script>
import EditComp from "./EditComp.vue";
import SaveComp from "./SaveComp.vue";
import ErrorIcon from "./ErrorIcon.vue";

export default {
	name: "EditPopUp",
	components: { EditComp, SaveComp, ErrorIcon },
	data() {
		return {
			personalData: [],
			popupIsOpen: false,
		};
	},
	computed: {
		fields() {
			return this.$store.getters.getFields;
		},
	},
	methods: {
		togglePopup() {
			this.popupIsOpen = !this.popupIsOpen;
		},
		fillData() {
			const fieldsNames = [
				"email_Address",
				"name",
				"surname",
				"password",
				"wall_Photo",
				"profile_Photo",
			];
			const fields = this.$store.getters.getFields;
			let index = 0;

			for (const field in fields) {
				if (fieldsNames.includes(fields[field].name)) {
					this.personalData.push({
						id: index,
						key: fields[field].name,
						value: fields[field].value,
						type: fields[field].type,
					});
				}
				index++;
			}
		},
		editData(field) {
			field.editable = !field.editable;
		},
		saveData(field) {
			const id = this.$store.getters.userData._id;
			const newUserData = {
				[field.key]: field.value,
			};

			this.dispatchData(field, id, newUserData);
		},
		dispatchData(field, id, newUserData) {
			const data = {
				field: this.fields[field.key],
				newValue: field.value,
			};
			this.$store.dispatch("validationFunction", data);
			if (this.fields[field.key].valid) {
				this.$store.dispatch("updateUserToDatabase", [id, newUserData]);
			}
		},
		parseText(text) {
			text = text.replace("_", " ");
			return text[0].toUpperCase() + text.substring(1);
		},
	},
	mounted() {
		this.fillData();
	},
};
</script>
<style lang="scss" scoped>
.popup-opener {
	position: absolute;
	top: 0;
	left: 0;
	width: 25px;
	height: 25px;
	cursor: pointer;
}
.field-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 10px 0;
}
.field-container_input-container {
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
}
.field-container_input-container_input {
	padding: $small-distance;
	border: 2px solid $primary-color;
	border-radius: $standard-radius;
}
</style>
