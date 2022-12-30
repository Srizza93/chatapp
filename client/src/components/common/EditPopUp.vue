<template>
  <div class="popup-opener" @click.self="togglePopup">
    <form v-if="popupIsOpen" class="popup">
      <span class="close-button" @click="togglePopup">&times;</span>
      <div class="field-container" v-for="field in fields" :key="field.id">
        <div>
          <label :for="field.name">{{ parseText(field.name) }}</label>
          <div class="field-container_input-container">
            <input
              class="field-container_input-container_input"
              :id="field.name"
              :type="field.type"
              :placeholder="
                field.type !== 'password' ? userData[field.name] : '*****'
              "
              v-model="field.value"
            />
            <ErrorIcon :field="field" />
            <SaveComp @click.prevent="$emit('saveData', field)" />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import SaveComp from "./SaveComp.vue";
import ErrorIcon from "./ErrorIcon.vue";

export default {
  name: "EditPopUp",
  components: { SaveComp, ErrorIcon },
  data() {
    return {
      popupIsOpen: false,
    };
  },
  props: {
    userData: {
      type: Object,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
  },
  methods: {
    togglePopup() {
      this.popupIsOpen = !this.popupIsOpen;
    },
    parseText(text) {
      text = text.replace("_", "  ");
      return text[0].toUpperCase() + text.substring(1);
    },
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
  justify-content: center;
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
  margin-right: 15px;
  border: 2px solid $primary-color;
  border-radius: $standard-radius;
}
</style>
