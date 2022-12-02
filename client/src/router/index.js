import { createWebHistory, createRouter } from "vue-router";

const routeOptions = [
	{
		path: "/",
		name: "HomePage",
	},
	{
		path: "/user-home/:id",
		name: "UserHome",
	},
	{
		path: "/:pathMatch(.*)*",
		name: "HomePage",
	},
];

const routes = routeOptions.map((route) => {
	return {
		...route,
		component: () =>
			import(/* webpackChunkName: "[request]" */ `../views/${route.name}.vue`),
	};
});

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
