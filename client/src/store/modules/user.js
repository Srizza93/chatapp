const state = () => ({
	user: {},
});

const mutations = {
	updateUserData(state, response) {
		console.log(response);
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
