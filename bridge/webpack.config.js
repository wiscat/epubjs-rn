var webpack = require("webpack");

module.exports = {
	entry: {
		"bridge": "./bridge/bridge.js",
	},
	output: {
		filename: "./bridge/[name].min.js",
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				//exclude: /node_modules/,
				loader: "babel-loader",
				query: {
					presets: ['es2015']
				}
			}
		]
	},
}
