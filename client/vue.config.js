const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
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
	},
});
