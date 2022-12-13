import axios from "axios";

const state = () => ({
	users: [],
});

// actions
const actions = {
	async apiCall(context) {
		try {
			const response = await axios.get("api/loginCredentials/");
			context.commit("updateUsersState", response);
		} catch (e) {
			console.error(e);
		}
	},
};

const mutations = {
	updateUsersState(state, response) {
		state.users = response.data;
	},
	signupUser(state, response) {
		state.users.push(response);
	},
};

const getters = {
	usersList: (state) => {
		return state.users;
	},
};

export default {
	state,
	actions,
	mutations,
	getters,
};
