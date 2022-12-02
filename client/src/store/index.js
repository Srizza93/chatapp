import { createStore, createLogger } from "vuex";
import users from "./modules/users";
import user from "./modules/user";

const debug = process.env.NODE_ENV !== "production";

export default createStore({
	modules: {
		users,
		user,
	},
	strict: debug,
	plugins: debug ? [createLogger()] : [],
});
