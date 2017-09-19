const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body',
})

module.exports = {
	entry: './client/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public'),
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './public',
		hot: true,
	},
	plugins: [
		HtmlWebpackPluginConfig,
		new webpack.HotModuleReplacementPlugin(),
		new webpack.ProvidePlugin({
            Promise: 'es6-promise', // Thanks Aaron (https://gist.github.com/Couto/b29676dd1ab8714a818f#gistcomment-1584602)
            fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
        }),
	],
	module: {
		rules: [
			{
			    test: /\.(js|jsx)$/,
			    loader: 'babel-loader',
			    exclude: /node_modules/,
			},
			{
		        test: /\.css$/,
		        use: [
		          'style-loader',
		          'css-loader',
		        ],
			},
			{
		        test: /\.(png|svg|jpg|gif)$/,
		        use: [
		          'file-loader',
		        ],
		    },
		    {
				test: /\.less$/,
				use: [
					'style-loader', // creates style nodes from JS strings 
					'css-loader', // translates CSS into CommonJS 
					'less-loader', // compiles Less to CSS 
				],
		    },
		    {
				test: /\.(eot|ttf|otf)$/,
				use: [
					'file-loader',
				],
			},
			{ 	test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader?limit=10000&mimetype=application/font-woff',
			},
		],
	},
};
