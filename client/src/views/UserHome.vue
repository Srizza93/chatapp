<template>
  <div class="user-home">
    <TopUserPage
      :userIsInOwnPage="userIsInOwnPage"
      :userData="userData"
      :fields="fields"
      @saveData="APISaveUserData"
    />
    <FriendsGallery
      v-if="userData._id && userData.friends"
      class="user-friends-gallery"
      :userId="userData._id"
      :friends="friendsList"
      :chatFeature="true"
      :userIsInOwnPage="userIsInOwnPage"
      @chatWithFriend="openChat"
    />
    <AddFriends
      v-if="userData && userData.friends && users && userIsInOwnPage"
      :userData="userData"
      :users="users"
      @APIGetUserData="APIGetUserData"
    />
    <ChatPopup
      v-if="chatIsOpen"
      :userData="userData"
      :friendData="chatFriend"
      @closeChat="closeChat"
    />
    <RouterLink
      v-if="!userIsInOwnPage"
      class="profile-photo-link"
      :to="`/user-home/${userId}`"
    >
      <img class="profile-photo-link_photo" :src="userProfilePhoto" />
    </RouterLink>
  </div>
</template>
<script>
import axios from "axios";
import TopUserPage from "@/components/user/TopUserPage.vue";
import FriendsGallery from "@/components/user/FriendsGallery.vue";
import AddFriends from "@/components/user/AddFriends.vue";
import ChatPopup from "@/components/user/ChatPopup.vue";

export default {
  name: "UserHome",
  components: { TopUserPage, FriendsGallery, AddFriends, ChatPopup },
  data() {
    return {
      users: [],
      userData: {},
      userProfilePhoto: "",
      chatFriend: "",
      chatIsOpen: false,
    };
  },
  computed: {
    userId() {
      const cookie = document.cookie
        .split(";")
        .map((c) => c.trim().split("="))
        .find((c) => c[0] === "userid");
      if (cookie) {
        return cookie[1];
      }
      return "";
    },
    fields() {
      const fieldsNames = [
        "email_Address",
        "name",
        "surname",
        "password",
        "wall_Photo",
        "profile_Photo",
      ];
      return Object.values(this.$store.getters.getFields)
        .filter((field) => fieldsNames.includes(field.name))
        .map((field) => Object.assign({}, field));
    },
    friendsList() {
      return this.users.filter((user) =>
        this.userData.friends.includes(user._id)
      );
    },
    userIsInOwnPage() {
      return (
        this.$route.params.id.substring(
          this.$route.params.id.indexOf(":") + 1 || 0
        ) === this.userId
      );
    },
  },
  watch: {
    $route() {
      this.APIGetUserProfilePhoto();
      this.APIGetUserData();
    },
  },
  mounted() {
    this.cleanUpForm();
    this.APIGetUsers();
    this.APIGetUserData();
  },
  methods: {
    async APIGetUsers() {
      await axios
        .get("/api/users")
        .then((response) => (this.users = response.data))
        .catch(console.error);
    },
    async APIGetUserData() {
      if (this.userId) {
        let id = this.userId;
        if (!this.userIsInOwnPage) {
          id = this.$route.params.id;
        }
        await axios
          .get("/api/users/" + id)
          .then((response) => (this.userData = response.data))
          .catch(console.error);
        return;
      }
      this.$router.push(`/`);
    },
    async APIGetUserProfilePhoto() {
      if (!this.userIsInOwnPage) {
        await axios
          .get("/api/users/" + this.userId)
          .then(
            (response) => (this.userProfilePhoto = response.data.profile_Photo)
          )
          .catch(console.error);
        return;
      }
      this.userProfilePhoto = this.userData.profile_Photo || "";
    },
    async APISaveUserData(field) {
      let computedField = this.fields.find((f) => f.name === field.name);
      const newUserData = {
        [field.name]: field.value,
      };
      const data = {
        field: computedField,
        newValue: field.value,
      };
      this.$store.dispatch("validationFunction", data);
      computedField = this.fields.find((f) => f.name === field.name);
      if (computedField.valid) {
        await axios
          .put(`/api/users/${this.userData._id}`, newUserData)
          .catch(console.error);
        this.APIGetUserData();
      }
    },
    openChat(friend) {
      this.chatFriend = friend;
      this.chatIsOpen = true;
    },
    closeChat() {
      this.chatIsOpen = false;
    },
    cleanUpForm() {
      for (let i = 0; i < this.fields.length; i++) {
        const name = { name: this.fields[i].name };
        this.$store.dispatch("cleanInputs", [name, "", false]);
      }
    },
  },
};
</script>
<style lang="scss">
.user-home {
  display: flex;
  flex-direction: column;
}

.user-friends-gallery {
  border-top: 2px solid $secondary-gray;
  border-bottom: 2px solid $secondary-gray;
}

.profile-photo-link {
  position: fixed;
  right: 0;
  bottom: 0;
  padding: 10px;
  z-index: 99999;
}

.profile-photo-link_photo {
  width: 50px;
  height: 50px;
  border: 2px solid $primary-color;
  border-radius: 50%;
}
.profile-photo-link_photo:hover {
  opacity: $standard-opacity;
}
</style>
