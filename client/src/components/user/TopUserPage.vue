<template>
	<div class="top-page">
		<img class="photo-wall" :src="userData.wallPhoto" alt="wall-photo" />
		<div class="photo-container">
			<img
				class="photo-container_profile"
				:src="userData.profilePhoto"
				alt="profile-photo"
			/>
			<span class="photo-container_user-name"
				>{{ userData.name }} {{ userData.surname }}</span
			>
		</div>
	</div>
</template>
<script>
export default {
	name: "TopUserPage",
	props: {
		userData: {
			type: Object,
			required: true,
		},
	},
};
</script>
<style lang="scss" scoped>
.top-page {
	display: flex;
	flex-direction: column;
}
.photo-wall {
	width: 100%;
	height: 300px;
	object-fit: cover;
}
.photo-container {
	position: relative;
	display: flex;
	justify-content: center;
	width: 200px;
	margin-left: 50px;
}
.photo-container_profile {
	position: absolute;
	top: -150px;
	width: 200px;
	height: 200px;
	border-radius: 50%;
}
.photo-container_user-name {
	font-size: 26px;
	margin-top: 65px;
}
</style>
