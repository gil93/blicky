import './../scss/main.scss';

import Core from './modules/core';
import Drag from './modules/drag';

export class Blicky {

	constructor( element, options ) {

		if ( ! element.length ) throw Error( 'Need to provide element' );

		this.element = typeof element == 'object' ? element[0] : document.querySelectorAll( element )[0];

		this.defaults = {};

		this.options = { ...this.defaults, ...options };

		new Core( this );

		new Drag( this );

	}

}