import './../scss/main.scss';

import Core from './modules/core';
import Events from './modules/events';
// import Drag from './modules/drag';

export class Blicky {

	constructor( element, options ) {

		let self = this;

		if ( ! element.length ) throw Error( 'Need to provide element' );

		this.wrapper = typeof element == 'object' ? element[0] : document.querySelectorAll( element )[0];

		this.defaults = { infinite: false };

		this.options = { ...this.defaults, ...options };

		( async () => {

			let core = await new Core( this );

			let self = { ...self, ...core };

			new Events( self );	

		})();

	}

}