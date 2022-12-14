import axios from "axios";

const state = () => ({
	user: {},
});

const mutations = {
	updateUserData(state, response) {
		state.user = response;
	},
};

const actions = {
	async updateUserToDatabase({ commit }, newUserData) {
		try {
			const response = await axios.put(
				"/api/loginCredentials/" + newUserData[0],
				newUserData[1]
			);
			commit("updateUserData", response.data);
		} catch (error) {
			console.log("Error in store: Axios Error " + error);
		}
	},
};

const getters = {
	userData: (state) => {
		return state.user;
	},
};

export default {
	state,
	mutations,
	getters,
	actions,
};
