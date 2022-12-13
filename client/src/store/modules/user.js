const state = () => ({
	user: {},
});

const mutations = {
	updateUserData(state, response) {
		state.user = response;
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
};
