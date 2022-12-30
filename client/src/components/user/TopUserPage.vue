<template>
  <div class="top-page">
    <img
      v-if="userData && userData.wall_Photo"
      class="photo-wall"
      :src="userData.wall_Photo"
      alt="wall-photo"
    />
    <div v-else class="no-photo-wall"></div>
    <div class="photo-container">
      <div class="photo-container_sub-container">
        <img
          v-if="userData && userData.profile_Photo"
          class="photo-container_profile"
          :src="userData.profile_Photo"
          alt="profile-photo"
        />
        <EditComp :editClass="editClass">
          <EditPopUp
            :userData="userData"
            :fields="fields"
            @saveData="saveData"
          />
        </EditComp>
      </div>
      <span
        v-if="userData && userData.name && userData.surname"
        class="photo-container_user-name"
        >{{ userData.name }} {{ userData.surname }}</span
      >
    </div>
  </div>
</template>
<script>
import EditComp from "../common/EditComp.vue";
import EditPopUp from "../common/EditPopUp.vue";

export default {
  name: "TopUserPage",
  components: { EditComp, EditPopUp },
  data() {
    return {
      editClass: "edit-comp-anchor",
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
    saveData(field) {
      this.$emit("saveData", field);
    },
  },
};
</script>
<style lang="scss" scoped>
.top-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.photo-wall,
.no-photo-wall {
  width: 100%;
  height: 300px;
  object-fit: cover;
  background-color: white;
}
.no-photo-wall {
  border-bottom: 2px solid $secondary-gray;
}
.photo-container {
  position: relative;
  display: flex;
  justify-content: center;
  width: 200px;
}
.photo-container_sub-container {
  position: absolute;
  top: -150px;
  width: 200px;
  height: 200px;
  border: 1px solid $secondary-gray;
  border-radius: 50%;
  background-color: white;
}
.photo-container_profile {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.photo-container_user-name {
  font-size: 26px;
  margin-top: 65px;
}
</style>

<style>
.edit-comp-anchor {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
