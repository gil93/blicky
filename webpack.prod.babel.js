'use strict';

import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

const distPath = path.resolve( __dirname, 'dist' );

const config = {

	output: {

		path: `${distPath}/`,
		filename: '[name].min.js',
		'libraryTarget': 'umd',
		umdNamedDefine: true

	},
	devtool: 'cheap-module-source-map',
	watch: false,
	plugins: [

		new webpack.DefinePlugin({

			'process.env': {

				NODE_ENV: JSON.stringify( 'production' )

			}

		}),
		new webpack.LoaderOptionsPlugin({

			minimize: true

		}),
		new UglifyJsPlugin({

			sourceMap: true,
			uglifyOptions: { ecma: 8 }

		}),
		new ExtractTextPlugin( '[name].min.css' )

	]

}

module.exports = config;