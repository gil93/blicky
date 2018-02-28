'use strict';

import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const distPath = path.resolve( __dirname, 'dist' );

const config = {

	output: {

		path: `${distPath}/`,
		filename: '[name].js',
		'libraryTarget': 'umd',
		umdNamedDefine: true

	},
	devtool: 'cheap-module-source-map',
	devServer: {

		contentBase: `${distPath}/`,
		publicPath: `/`,
		inline: true,
		hot: true

	},
	plugins: [

		new ExtractTextPlugin({

			filename: '[name].css'

		}),
		new webpack.HotModuleReplacementPlugin()

	]

}

module.exports = config;