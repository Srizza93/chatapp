<template>
  <form class="login" @submit.prevent="$emit('getCredentialsFromComp', fields)">
    <input
      class="input-app"
      v-for="(field, index) in fields"
      :key="index + '-field'"
      :type="field.type"
      :placeholder="field.placeholder"
      :autocomplete="field.type === 'password' ? 'current-password' : ''"
      v-model="field.text"
    />
    <div class="result-login">
      <input class="submit-button" type="submit" value="Login" />
      <div class="result-login_message" v-if="wrongUser || wrongPass">
        <span class="result-login_message_text" v-if="wrongUser"
          >Incorrect Email Address</span
        >
        <span class="result-login_message_text" v-if="wrongPass"
          >Incorrect Password</span
        >
        <img
          class="input-container_icon"
          :src="getImgUrl('red-cross')"
          alt="red-cross"
        />
      </div>
    </div>
    <router-link to="/" class="forgot-password">Forgot Password?</router-link>
    <div class="submit-button signup-wrapper">
      <router-link to="/signup" class="signup-wrapper_link"
        >Sign up</router-link
      >
    </div>
  </form>
</template>
<script>
export default {
  name: "LoginForm",
  props: {
    wrongUser: {
      type: Boolean,
      required: true,
    },
    wrongPass: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      fields: [
        {
          name: "email_Address",
          text: "",
          type: "email",
          placeholder: "Email Address",
        },
        {
          name: "password",
          text: "",
          type: "password",
          placeholder: "Password",
        },
      ],
    };
  },
  methods: {
    getImgUrl(pic) {
      const images = require.context("@/assets", false, /\.png$/);
      return images("./" + pic + ".png");
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 370px;
  padding: $standard-distance;
  margin: $standard-distance;
  border-radius: $standard-radius;
  background-color: white;
}
.result-login {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.result-login_message {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 12px;
  color: red;
}
.result-login_message_text {
  padding: 10px;
}
.input-container_icon {
  width: 20px;
  height: 20px;
  margin-left: 5px;
}
.forgot-password {
  margin-bottom: 20px;
  color: $primary-color;
  text-decoration: none;
}
.forgot-password:hover {
  text-decoration: underline;
}
.signup-wrapper {
  max-width: $small-button;
}
.signup-wrapper_link {
  color: white;
  text-decoration: none;
}
.signup-wrapper_link:hover {
  background-color: $hover-primary-color;
}
</style>
