'use strict';

const devConfig = {

	cssLoader: {

	}

}

const prodConfig = {

	cssLoader: {

		minimize: true

	}

}

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

module.exports = config;