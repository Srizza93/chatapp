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
						v-model="field.value"
						:disabled="!field.editable"
					/>
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

export default {
	name: "EditPopUp",
	components: { EditComp, SaveComp },
	data() {
		return {
			personalData: [],
			popupIsOpen: false,
		};
	},
	methods: {
		togglePopup() {
			this.popupIsOpen = !this.popupIsOpen;
		},
		fillData() {
			const excludedProp = ["id", "_id", "date", "__v"];
			const data = Object.entries(this.$store.getters.userData);
			data.forEach((entry, index) => {
				if (!excludedProp.includes(entry[0])) {
					this.personalData.push({
						id: index,
						key: entry[0],
						value: entry[1],
					});
				}
			});
		},
		editData(field) {
			field.editable = !field.editable;
		},
		saveData(field) {
			const id = this.$store.getters.userData._id;
			const newUserData = {
				[field.key]: field.value,
			};

			this.$store.dispatch("updateUserToDatabase", [id, newUserData]);
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
<style lang="scss">
.popup-opener {
	position: absolute;
	top: 0;
	left: 0;
	width: 25px;
	height: 25px;
	cursor: pointer;
}
.popup {
	position: fixed;
	display: flex;
	flex-direction: column;
	width: 60vw;
	top: 20%;
	left: calc(50% - 30vw);
	padding: $standard-distance;
	border: 2px solid $primary-color;
	border-radius: $standard-radius;
	background-color: white;
	cursor: default;
}

.field-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 10px 0;
}
.field-container_input-container {
	display: flex;
	flex-direction: row;
	align-items: center;
}
.field-container_input-container_input {
	padding: 5px 10px;
	border: 2px solid $primary-color;
	border-radius: $standard-radius;
}
.close-button {
	position: absolute;
	top: 0;
	right: 0;
	margin-right: 10px;
	font-size: 35px;
	cursor: pointer;
}
.close-button:hover {
	opacity: $standard-opacity;
}
</style>
