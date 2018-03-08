import { transition } from './transition';

function right() {

	let slider = this.slider;

	if ( slider.currentSlide == 0 ) {

		slider.posX = slider.currentSlide * slider.width;

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

export function snap() {

	let slider = this.slider;

	let percentChange = Math.round( ( ( Math.abs( slider.posX ) - ( slider.currentSlide * slider.width ) ) / slider.width ) * 100 );

	slider.oldcX = undefined;

	transition.call( this );

	let lefts = slider.directionalHistory.filter( direction => direction == 'left' ).length;

	let rights = slider.directionalHistory.filter( direction => direction == 'right' ).length;

	if ( Math.abs( percentChange ) > 20 ) {

		if ( rights > lefts ) {

			right.call( this );

		} else if ( lefts > rights ) {

			left.call( this );

		} else {

			slider.posX = slider.currentSlide * slider.width;

		}

	} else {

		slider.posX = slider.currentSlide * ( slider.width * -1 );

	}

	slider.directionalHistory.length = 0;

	slider.blicky.style.left = `${slider.posX}px`;

}