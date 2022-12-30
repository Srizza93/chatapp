<template>
  <div id="app">
    <RouterLink class="icon-container" to="/" @click="logOut">
      <img src="@/assets/chat-icon.png" alt="icon" />
    </RouterLink>
    <RouterView></RouterView>
    <footer-comp />
  </div>
</template>

<script>
import FooterComp from "./components/common/FooterComp.vue";

export default {
  name: "App",
  components: { FooterComp },
  methods: {
    logOut() {
      document.cookie =
        "userid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.icon {
  cursor: pointer;
}
.icon-container {
  position: fixed;
  right: 0;
  display: flex;
  justify-content: end;
  padding: 10px;
  z-index: 99999;
}
.icon-container:hover {
  opacity: $standard-opacity;
}
</style>
