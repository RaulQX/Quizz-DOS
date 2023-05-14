module.exports = function (api) {
	api.cache(true)
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			"react-native-reanimated/plugin",
			[
				"module-resolver",
				{
					extensions: [
						".ios.js",
						".android.js",
						".js",
						".ts",
						".tsx",
						".json",
					],

					root: ["."],
					alias: {
						"@components": "./components",
						"@screens": "./screens",
						"@assets": "./assets",
						"@palette": "./palette",
					},
				},
			],
		],
	}
}
