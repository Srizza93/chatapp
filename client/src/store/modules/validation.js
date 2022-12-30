import axios from "axios";

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
      regex: /^$/,
    },
    name: {
      name: "name",
      type: "text",
      placeholder: "Name",
      value: "",
      valid: false,
      regex: /^[A-Za-z]+$/,
    },
    surname: {
      name: "surname",
      type: "text",
      placeholder: "Surname",
      value: "",
      valid: false,
      regex: /^[A-Za-z]+$/,
    },
    wall_Photo: {
      name: "wall_Photo",
      type: "text",
      placeholder: "Wall Photo",
      value: "",
      valid: false,
      regex: /./,
    },
    profile_Photo: {
      name: "profile_Photo",
      type: "text",
      placeholder: "Profile Photo",
      value: "",
      valid: false,
      regex: /./,
    },
  },
});

const mutations = {
  updateValidation(state, input) {
    state.validationFields[input[0].name].value = input[1];
    state.validationFields[input[0].name].valid = input[2];
  },
};

const actions = {
  async validationFunction({ state, commit, dispatch }, data) {
    if (data.field.name === "email_Address") {
      let users = [];

      await axios
        .get("/api/users")
        .then((response) => (users = response.data))
        .catch(console.error);

      const emailUsed = users.find(
        (user) => user.email_Address === data.newValue
      );

      if (emailUsed) {
        commit("updateValidation", [data.field, data.newValue, false]);
        return;
      }
    }

    let fieldRegex = data.field.regex;

    if (data.field.name === "confirm_Password") {
      const password = this.getters.getFields.password.value;
      fieldRegex = new RegExp("^" + password + "$");
    }

    dispatch("regexValidation", {
      data,
      fieldRegex,
    });

    if (data.field.name === "password") {
      const confirmPassword = state.validationFields.confirm_Password;
      fieldRegex = new RegExp("^" + data.newValue + "$");
      data = {
        field: confirmPassword,
        newValue: confirmPassword.value,
      };
      dispatch("regexValidation", {
        data,
        fieldRegex,
      });
    }
  },
  regexValidation({ commit }, data) {
    if (!data.fieldRegex.test(data.data.newValue)) {
      commit("updateValidation", [data.data.field, data.data.newValue, false]);
      return;
    }
    commit("updateValidation", [data.data.field, data.data.newValue, true]);
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
