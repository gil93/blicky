import './../scss/main.scss';

import * as core from './modules/core';
import * as animate from './modules/animate';

export class Blicky {

	constructor( element, options ) {

		if ( ! element.length ) throw Error( 'Need to provide element' );

		this.element = typeof element == 'object' ? element[0] : document.querySelectorAll( element )[0];

		this.defaults = {};

		this.options = {

			...this.defaults,
			...options

		}

		core.setDomProps.call( this );

		core.build.call( this );

		animate.animate.call( this );

	}

}