import './../scss/main.scss';

import Core from './modules/core';
import Events from './modules/events';
// import Drag from './modules/drag';

export class Blicky {

	constructor( elem, options ) {

		let self = this;

		let element = elem;

		if ( typeof elem == 'string' ) element = document.querySelectorAll( elem );

		if ( ! element.length || typeof element == 'string' ) throw new Error( 'Bad element' );

		this.wrapper = element[0];

		this.defaults = { infinite: false };

		this.options = { ...this.defaults, ...options };

		( async () => {

			let core = await new Core( this );

			let self = { ...self, ...core };

			new Events( self );	

		})();

	}

}