const path = require('path');
const sass = require('node-sass');
const webpack = require('webpack');


module.exports = {

	mode: process.env.NODE_ENV,
	entry: path.resolve('./client', 'index.js'),
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
	},

	module: {
		rules: [{
			test: /\.jsx?/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env', '@babel/preset-react']
				}
			}
		}, {
			test: /\.scss$/,
			exclude: /(node_modules|bower_components)/,
			use: [{
				loader: 'style-loader'
			}, {
				loader: 'css-loader',
			}, {
				loader: 'sass-loader',
				options: {
					implementation: sass
				}
			}]
		}],

	},
	
	devServer: {
		publicPath: '/build',
		proxy: {
			'/api/leaders': 'http://localhost:3000'
		},
		contentBase: './',
		hot: true,
		port: 8080,
	}, 
}