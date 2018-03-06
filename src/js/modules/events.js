import { rebuild } from './../functions/build';

export default class Events {

	constructor( blicky ) {

		this.blicky = blicky;

		this.resize();

	}

	resize() {

		let self = this;

		window

			.addEventListener( 'resize', e => {

				let event = new CustomEvent( 'blicky.resize', e );

				window.dispatchEvent( event );

			})

		;

		window

			.addEventListener( 'blicky.resize', e => {

				rebuild.call( self.blicky );

			})

		;

	}

}