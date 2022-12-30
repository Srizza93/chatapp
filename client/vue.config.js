const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? "/chatapp/" : "/",
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/variables.scss";`,
      },
    },
  },
  configureWebpack: {
    devServer: {
      proxy: {
        "/api": {
          target: "http://localhost:3000",
        },
      },
    },
    devtool: false,
  },
});
