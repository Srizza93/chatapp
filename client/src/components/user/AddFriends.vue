<template>
  <div class="add-friends">
    <button class="submit-button add-button" @click="showPotentialFriends">
      Find new friends
    </button>
    <div class="friends-container">
      <FriendsGallery
        v-if="userData._id && strangers"
        class="popup users-list"
        v-bind:class="{ 'users-list-closed': !usersListOpen }"
        :userId="userData._id"
        :friends="strangers"
        :addFriend="true"
        @addFriendToUser="addFriendToUser"
      >
        <span class="close-button" @click="closePotentialFriends">&times;</span>
      </FriendsGallery>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import FriendsGallery from "./FriendsGallery.vue";

export default {
  name: "AddFriends",
  components: { FriendsGallery },
  data() {
    return {
      usersListOpen: false,
    };
  },
  props: {
    userData: {
      type: Object,
      required: true,
    },
    users: {
      type: Array,
      required: true,
    },
  },
  computed: {
    strangers() {
      return this.users.filter(
        (user) =>
          user._id !== this.userData._id &&
          !this.userData.friends.includes(user._id)
      );
    },
  },
  methods: {
    async addFriendToUser(friendId) {
      try {
        await axios.post(`/api/users/${this.userData._id}/friends`, {
          friend: friendId,
        });
      } catch (error) {
        console.log(error);
      }
      this.$emit("APIGetUserData");
    },
    showPotentialFriends() {
      this.usersListOpen = true;
    },
    closePotentialFriends() {
      this.usersListOpen = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.add-friends {
  display: flex;
  justify-content: center;
}
.add-button {
  margin: $full-width-distance;
}
.friends-container {
  position: relative;
}
.users-list {
  text-align: center;
  padding: 40px;
}
.users-list-closed {
  display: none !important;
}
</style>
