const state = () => ({
	validationFields: {
		email_Address: {
			name: "email_Address",
			type: "email",
			placeholder: "Email Address",
			value: "",
			valid: false,
			regex:
				/^[a-zA-Z0-9!#$%&'*+-/=?^_`{|]{2,64}@[a-zA-Z0-9][a-zA-Z0-9-.]{0,251}[a-zA-Z0-9].[a-zA-Z.]{2,63}$/,
		},
		password: {
			name: "password",
			type: "password",
			placeholder: "New password",
			value: "",
			valid: false,
			regex:
				/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
		},
		confirm_Password: {
			name: "confirm_Password",
			type: "password",
			placeholder: "Confirm password",
			value: "",
			valid: false,
			regex: "",
		},
		name: {
			name: "name",
			type: "text",
			placeholder: "Name",
			value: "",
			valid: false,
			regex: /^[A-Za-z]{1,}$/,
		},
		surname: {
			name: "surname",
			type: "text",
			placeholder: "Surname",
			value: "",
			valid: false,
			regex: /^[A-Za-z]{1,}$/,
		},
	},
});

const mutations = {
	updateValidation(state, input) {
		state.validationFields[input[0].name].value = input[1];
		state.validationFields[input[0].name].valid = input[2];
	},
	updateConfirmPasswordRegex(state, regex) {
		state.validationFields.confirm_Password.regex = regex;
	},
};

const actions = {
	validationFunction({ commit }, data) {
		if (data.field.name === "email_Address") {
			const emailUsed = this.getters.usersList.find(
				(user) => user.email_Address === data.newValue
			);
			if (emailUsed) {
				commit("updateValidation", [data.field, data.newValue, false]);
				return;
			}
		}

		if (data.field.name === "confirm_Password") {
			const password = this.getters.getFields.password.value;
			const pattern = "^" + password + "$";
			commit("updateConfirmPasswordRegex", new RegExp(pattern));
		}

		if (!data.field.regex.test(data.newValue)) {
			commit("updateValidation", [data.field, data.newValue, false]);
			return;
		}
		commit("updateValidation", [data.field, data.newValue, true]);
	},
	cleanInputs({ commit }, data) {
		commit("updateValidation", data);
	},
};

const getters = {
	getFields: (state) => {
		return state.validationFields;
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
