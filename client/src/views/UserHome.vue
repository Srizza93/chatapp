<template>
  <div class="user-home">
    <TopUserPage
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
      @chatWithFriend="openChat"
    />
    <AddFriends
      v-if="userData && userData.friends && users"
      :userData="userData"
      :users="users"
      @APIGetUserData="APIGetUserData"
    />
    <ChatPopup
      v-if="chatIsOpen"
      :chatId="chatId"
      :friendId="chatFriend"
      @closeChat="closeChat"
    />
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
      chatId: "",
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
  },
  mounted() {
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
        await axios
          .get("/api/users/" + this.userId)
          .then((response) => (this.userData = response.data))
          .catch(console.error);
        return;
      }
      this.$router.push(`/`);
    },
    async APISaveUserData(field) {
      const newUserData = {
        [field.name]: field.value,
      };
      const data = {
        field: this.fields.find((f) => f.name === field.name),
        newValue: field.value,
      };
      this.$store.dispatch("validationFunction", data);
      if (field.valid) {
        await axios
          .put(`/api/users/${this.userData._id}`, newUserData)
          .catch(console.error);
        this.APIGetUserData();
      }
    },
    openChat(friend) {
      console.log(friend);
    },
    closeChat() {
      this.chatIsOpen = false;
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
</style>
