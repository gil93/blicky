import { move } from './../functions/move';
import { snap } from './../functions/snap';

export default class Drag {

	constructor( blicky ) {

		this.blicky = blicky;

		let slider = this.blicky.slider;

		slider.posX = 0;

		slider.posX = window.parseInt( slider.blicky.getElementsByClassName( 'blicky-slide' )[0].dataset.blickyIndex, 10 ) * slider.width;

		this.events();

	}

	events() {

		let blicky = this.blicky;

		blicky.slider.blicky.addEventListener( 'mousedown', mousedown, false );

		function mousedown() {

			document.addEventListener( 'mousemove', mousemove, false );

			document.addEventListener( 'mouseup', mouseup, false );

			document.addEventListener( 'mouseout', mouseup, false );
			
		}

		function mousemove( e ) {

			let cX = e.clientX;

			move.call( blicky, cX );

			blicky.slider.oldcX = cX;

		}

		function mouseup() {

			snap.call( blicky );

			document.removeEventListener( 'mousemove', mousemove, false );

			document.removeEventListener( 'mouseup', mouseup, false );

			document.removeEventListener( 'mouseout', mouseup, false );

		}

	}

}