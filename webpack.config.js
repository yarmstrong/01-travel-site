module.exports = {
	entry: {
		App: "./app/assets/scripts/App.js",
		Vendor: "./app/assets/scripts/Vendor.js"
	}, //our chance to tell webpack which fille to begin looking at to create its bundle (which is the main App.js file)
	output: {
		path: __dirname + "/app/temp/scripts", //absolute path where the bundled file is to be created
		filename: "[name].js"
	},
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				},
				test: /\.js$/,
				exclude: /node_modules/
			}
		]
	}
}