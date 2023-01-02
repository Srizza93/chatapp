<template>
  <div class="friends-gallery">
    <slot></slot>
    <div v-if="friends && friends.length > 0" class="friends-gallery_sub">
      <div
        class="friend-card"
        v-for="(friend, index) in friends"
        :key="index + '-friend'"
      >
        <router-link
          class="friend-card_router-link"
          :to="'../user-home/' + friend._id"
        >
          <img
            class="friend-card_photo"
            v-if="friend.profile_Photo"
            :src="friend.profile_Photo"
            alt="friend-photo"
          />
          <span class="friend-card_name">{{ friend.name }}</span>
        </router-link>
        <button
          v-if="addFriend && userIsInOwnPage"
          class="friend-card_add"
          @click="$emit('addFriendToUser', friend._id)"
        >
          Add
        </button>
        <button
          v-if="chatFeature && userIsInOwnPage"
          class="friend-card_add"
          @click="$emit('chatWithFriend', friend)"
        >
          Chat
        </button>
      </div>
    </div>
    <span v-else>There are no friends here</span>
  </div>
</template>
<script>
export default {
  name: "FriendsGallery",
  props: {
    userId: {
      type: String,
      required: true,
    },
    friends: {
      type: Array,
      required: true,
    },
    addFriend: {
      type: Boolean,
      required: false,
    },
    chatFeature: {
      type: Boolean,
      required: false,
    },
    userIsInOwnPage: {
      type: Boolean,
      required: false,
    },
  },
};
</script>
<style lang="scss" scoped>
.friends-gallery {
  display: flex;
  justify-content: center;
  padding: $full-width-distance;
  margin: $full-width-distance;
}
.friends-gallery_sub {
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow: scroll;
}
.friend-card {
  position: relative;
  margin: 0 5px;
  border-radius: $standard-radius;
  background-color: $secondary-gray;
  cursor: pointer;
}
.friend-card_name {
  position: absolute;
  top: 0;
  left: 0;
  margin: 10px;
  color: white;
}
.friend-card_router-link {
  display: flex;
  width: 150px;
  height: 200px;
}
.friend-card_router-link:hover {
  opacity: $standard-opacity;
}
.friend-card_photo {
  width: 150px;
  height: 200px;
  border-radius: $standard-radius;
  object-fit: cover;
}
.friend-card_add {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: $button-padding;
  border: none;
  border-radius: 0 10px 0 10px;
  color: white;
  background-color: $primary-color;
  z-index: 999;
  cursor: pointer;
}
</style>
