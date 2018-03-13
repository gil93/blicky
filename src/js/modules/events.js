import { drag } from './../functions/drag';
import { snap } from './../functions/snap';
import { reset } from './../functions/set';

export default class Events {

	constructor( blicky ) {

		this.blicky = blicky;

		this.resize();

		this.mouse();

	}

	mouse() {

		let blicky = this.blicky;

		let slider = blicky.slider;

		let $blicky = slider.blicky;

		slider.posX = 0;

		slider.posX = window.parseInt( $blicky.getElementsByClassName( 'blicky-slide' )[0].dataset.blickyIndex, 10 ) * slider.width;

		$blicky.addEventListener( 'mousedown', mousedown, false );

		function mousedown() {

			document.addEventListener( 'mousemove', mousemove, false );

			document.addEventListener( 'mouseup', mouseup, false );

			document.addEventListener( 'mouseout', mouseup, false );
			
		}

		function mousemove( e ) {

			let cX = e.clientX;

			drag( blicky, cX );

			slider.oldcX = cX;

		}

		function mouseup() {

			snap( blicky );

			document.removeEventListener( 'mousemove', mousemove, false );

			document.removeEventListener( 'mouseup', mouseup, false );

			document.removeEventListener( 'mouseout', mouseup, false );

		}

	}

	resize() {

		let blicky = this.blicky;

		let $blicky = blicky.slider.blicky;

		window

			.addEventListener( 'resize', e => {

				let event = new CustomEvent( 'blicky.resize', e );

				$blicky.addEventListener( 'blicky.resize', resizeAdjust, false );

				$blicky.dispatchEvent( event );

			}, false )

		;

		function resizeAdjust() {

			reset( blicky );

			$blicky.removeEventListener( 'blicky.resize', resizeAdjust, false );

		}

	}

}