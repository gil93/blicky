'use strict';

import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';
import path from 'path';

const webpackLoaderOptions = path.resolve( __dirname, 'webpack-loader-options.babel' );

const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

const distPath = path.resolve( __dirname, 'dist' );

const sourcePath = path.resolve( __dirname, 'src' );

const envConfig = require( path.resolve( __dirname, `webpack.${env}.babel` ) );

const config = {

	context: __dirname,
	entry: {

		'blicky': `${sourcePath}/js/main.js`

	},
	module: {

		rules: [

			{

				test: /\.js$/,
				include: /js/,
				exclude: /node_modules/,
				use: {

					loader: 'babel-loader',
					options: {

						presets: [

							['@babel/preset-env', {

								targets: {

									browsers: [

										'last 5 versions',
										'safari >= 8',
										'ie >= 11'

									]

								}

							}]

						],
						plugins: [

							'@babel/plugin-transform-runtime',
							'@babel/plugin-syntax-object-rest-spread'

						]

					}

				}

			},
			{

				test: /\.scss?$/,
				include: /scss/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({

					fallback: 'style-loader',
					use: [

						{

							loader: 'css-loader',
							options: {

								...webpackLoaderOptions.cssLoader

							}

						},
						{

							loader: 'postcss-loader',
							options: {

								plugins: [

									autoprefixer({

										browsers: [

											'last 2 major versions',
											'ie >= 11',
											'safari >= 8',
											'> 5%'

										]

									})

								]

							}

						},
						{

							loader: 'sass-loader'

						}

					]

				})

			},
			{

				test: /\.ttf?$/,
				exclude: /node_modules/,
				loader: 'file-loader',
				options: {

					name: `${distPath}/fonts/[name].[ext]`,
					minefonts: 'application/font-sfnt'

				}

			},
			{

				test: /\.eot?$/,
				exclude: /node_modules/,
				loader: 'file-loader',
				options: {

					name: `${distPath}/fonts/[name].[ext]`,
					minefonts: 'application/vnd.ms-fontobjec'

				}

			},
			{

				test: /\.woff?$/,
				exclude: /node_modules/,
				loader: 'file-loader',
				options: {

					name: `${distPath}/fonts/[name].[ext]`,
					minefonts: 'application/font-woff'

				}

			},
			{

				test: /\.woff2?$/,
				exclude: /node_modules/,
				loader: 'file-loader',
				options: {

					name: `${distPath}/fonts/[name].[ext]`,
					minefonts: 'application/font-woff2'

				}

			},
			{

				test: /\.svg?$/,
				include: /public\/fonts/,
				exclude: /(node_modules|images)/,
				loader: 'file-loader',
				options: {

					name: `${distPath}/fonts/[name].[ext]`,
					mimefonts: 'image/svg+xml'

				}

			},
			{
				test: /\.(jpg|png|svg|gif)$/,
				exclude: /(node_modules|dist\/fonts)/,
				loader: 'url-loader',
				options: {

					limit: 1500000

				}
			}

		]

	},
	...envConfig

}

module.exports = config;