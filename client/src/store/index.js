import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import users from "./modules/users";
import user from "./modules/user";

const debug = process.env.NODE_ENV !== "production";

export default createStore({
	modules: {
		users,
		user,
	},
	strict: debug,
	plugins: [createPersistedState()],
});
