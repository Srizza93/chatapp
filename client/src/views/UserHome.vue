<template>
	<div class="user-home">
		<TopUserPage :userData="user" />
		<FriendsGallery
			class="user-friends-gallery"
			:friends="friendsData"
			:chatFeature="true"
		/>
		<AddFriends :userId="user._id" />
	</div>
</template>
<script>
import axios from "axios";
import TopUserPage from "@/components/user/TopUserPage.vue";
import FriendsGallery from "@/components/user/FriendsGallery.vue";
import AddFriends from "@/components/user/AddFriends.vue";

export default {
	name: "LoginPage",
	components: { TopUserPage, FriendsGallery, AddFriends },
	data() {
		return {
			friendsData: [],
		};
	},
	computed: {
		user() {
			return this.$store.getters.userData;
		},
		friends() {
			return this.user.friends;
		},
		fields() {
			return this.$store.getters.getFields;
		},
	},
	watch: {
		friends() {
			this.fillFriendsList(this.friendsData.length);
		},
	},
	methods: {
		async fillFriendsList(index) {
			const friendsIds = this.friends;

			if (friendsIds.length === 0) {
				return;
			}

			for (let i = index; i < friendsIds.length; i++) {
				try {
					const response = await axios.get("/api/users/" + friendsIds[i]);
					this.friendsData.push(response.data);
				} catch (error) {
					console.log("Error in UserHome: " + error);
				}
			}
		},
		cleanUpForm() {
			for (const key in this.fields) {
				const name = { name: this.fields[key].name };
				const value = this.user[key];
				this.$store.dispatch("cleanInputs", [name, value, true]);
			}
		},
	},
	mounted() {
		this.fillFriendsList(0);
		this.cleanUpForm();
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
