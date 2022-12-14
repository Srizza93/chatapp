<template>
	<div class="footer">
		<div class="about-us">
			<span>About us</span>
			<p>
				We are a platform where you can get in contact with people with the same
				interests as you. Discover our page and let us know your feedback.
			</p>
		</div>
		<ul class="link-list">
			<li v-for="link in links" :key="(link.id = '-link')">
				<a class="link-list_url-link" :href="link.url">{{ link.text }}</a>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	name: "FooterComp",
	data() {
		return {
			links: [
				{
					id: 1,
					text: "Home",
					url: "/",
				},
				{
					id: 2,
					text: "Customer Service",
					url: "/",
				},
				{
					id: 3,
					text: "Legal Department",
					url: "/",
				},
				{
					id: 4,
					text: "Help us",
					url: "/",
				},
				{
					id: 5,
					text: "Careers",
					url: "/",
				},
				{
					id: 6,
					text: "Useful Information",
					url: "/",
				},
			],
		};
	},
};
</script>
<style lang="scss">
.footer {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: $standard-distance;
	margin-top: auto;
	color: white;
	background-color: $primary-color;
}
.about-us {
	display: flex;
	flex-direction: column;
	width: 60%;
}
.link-list {
	list-style-type: none;
}
.link-list_url-link {
	color: white;
	text-decoration: none;
}
.link-list_url-link:hover {
	text-decoration: underline;
}
</style>
