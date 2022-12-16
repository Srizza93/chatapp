import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import users from "./modules/users";
import user from "./modules/user";
import validaton from "./modules/validation.js";

const debug = process.env.NODE_ENV !== "production";

export default createStore({
	modules: {
		users,
		user,
		validaton,
	},
	strict: debug,
	plugins: [createPersistedState()],
});
