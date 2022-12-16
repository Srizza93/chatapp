<template>
	<div class="add-friends">
		<button class="submit-button add-button" @click="showPotentialFriends">
			Find new friends
		</button>
		<div class="friends-container">
			<FriendsGallery
				class="popup users-list"
				v-bind:class="{ 'users-list-closed': !usersListOpen }"
				:friends="users"
				:addFriend="true"
			>
				<span class="close-button" @click="closePotentialFriends">&times;</span>
			</FriendsGallery>
		</div>
	</div>
</template>
<script>
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
		userId: {
			type: String,
			required: true,
		},
	},
	computed: {
		users() {
			const myUser = this.$store.getters.userData;
			return this.$store.getters.usersList.filter(
				(user) =>
					user._id !== myUser._id &&
					!myUser.friends.find((id) => id === user._id)
			);
		},
	},
	methods: {
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
	justify-content: flex-start;
	width: 60vw;
	padding: 40px;
	overflow: scroll;
}
.users-list-closed {
	display: none !important;
}
</style>
