const path = require('path');
const webpack = require('webpack');

module.exports = {
	devtool: 'cheap-module-source-map',
	entry: './html/js/main.js',
	output: {
		filename: 'app.bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist/'
	},
	devServer: {
		historyApiFallback:{
			index:'./public_html/index.html'
		}
	},
	plugins: [
	  new webpack.DefinePlugin({
	    'process.env': {
	      'NODE_ENV': JSON.stringify('production')
	    }
	  })
	],
	module: {
		rules: [
			{
				loader: 'babel-loader',
				test: /\.js$/,
				exclude: [
					/node_modules/
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
		modules: ["node_modules"]
	}
};
