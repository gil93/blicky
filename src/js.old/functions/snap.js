import { transition } from './transition';
import { getDirection } from './get-direction';

function right() {

	let slider = this.slider;

	if ( slider.currentSlide == 0 ) {

		slider.posX = 0;

	} else {

		slider.posX = ( slider.currentSlide - 1 ) * ( slider.width * -1 );

		slider.currentSlide -= 1;

	}

}

function left() {

	let slider = this.slider;

	if ( slider.currentSlide == slider.slideCount - 1 ) {

		slider.posX = slider.currentSlide * ( slider.width * -1 );

	} else {

		slider.posX = ( slider.currentSlide + 1 ) * ( slider.width * -1 );

		slider.currentSlide += 1;

	}

}

function slide() {

	let slider = this.slider;

	slider.directionalHistory.length = 0;

	slider.blicky.style.left = `${slider.posX}px`;

}

export function snap() {

	let slider = this.slider;

	let percentChange = Math.round( ( ( Math.abs( slider.posX ) - ( slider.currentSlide * slider.width ) ) / slider.width ) * 100 );

	let direction = getDirection.call( this );

	slider.oldcX = undefined;

	transition.call( this );

	if ( Math.abs( percentChange ) > 20 ) {

		if ( direction == 'right' ) {

			right.call( this );

		} else if ( direction == 'left' ) {

			left.call( this );

		} else {

			slider.posX = slider.currentSlide * slider.width;

		}

	} else {

		slider.posX = slider.currentSlide * ( slider.width * -1 );

	}

	slide.call( this );

}