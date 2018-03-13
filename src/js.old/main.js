// import './../scss/main.scss';

// import Core from './modules/core';
// import Drag from './modules/drag';
// import Events from './modules/events';

// export class Blicky {

// 	constructor( element, options ) {

// 		let self = this;

// 		if ( ! element.length ) throw Error( 'Need to provide element' );

// 		this.element = typeof element == 'object' ? element[0] : document.querySelectorAll( element )[0];

// 		this.defaults = {

// 			infinite: false

// 		};

// 		this.options = { ...this.defaults, ...options };

// 		( async () => {

// 			let core = await new Core( this );

// 			let self = {

// 				...self,
// 				...core

// 			};

// 			new Drag( self );

// 			new Events( self );

// 		})();

// 	}

// }