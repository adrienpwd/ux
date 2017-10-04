const path = require('path');
const webpack = require('webpack');

module.exports = {
	devtool: 'cheap-module-source-map',
	context: __dirname,
	entry: path.resolve(__dirname, './html/js/main.js'),
	output: {
		filename: 'app.bundle.js',
		path: path.resolve(__dirname, './dist/assets'),
		publicPath: '/assets'
	},
	devServer: {
		contentBase: path.resolve(__dirname, './html')
	},
	module: {
		rules: [
			{
				loader: 'babel-loader',
				test: /\.js$/,
				exclude: [
					/node_modules/,
					path.resolve(__dirname, "html", "js", "versions")
				]
			}, {
				loader: 'json-loader',
				test: /\.json/
			}, {
				test: /\.less$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {importLoaders: 1,
							modules: true
						}
					},
					'less-loader'
				]
			}, {
				loader: 'file-loader',
				test: /\.woff$/
			}, {
				loader: 'file-loader',
				test: /\.woff2$/
			}, {
				loader: 'file-loader',
				test: /\.svg$/
			}
		]
	},
	resolve: {
		modules: [path.resolve(__dirname, "src"), "node_modules"]
	}
};
