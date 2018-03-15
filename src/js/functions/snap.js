import { transition } from './../util/transition';
import { direction } from './../util/direction';
import { isInfinite } from './../options/infinite';

function right( blicky ) {

	let slider = blicky.slider;

	if ( slider.currentSlide == 0 ) {

		slider.posX = 0;

		debugger;

	} else {

		if ( isInfinite ) {

			slider.posX = slider.slides[slider.currentSlide].offsetLeft * -1;

			slider.currentSlide -= 1;

		} else {

			debugger;

		}

	}

}

function left( blicky ) {

	let slider = blicky.slider;

	if ( slider.currentSlide == slider.slideCount - 1 ) {

		if ( isInfinite ) {

			slider.currentSlide += 1;

			slider.posX = slider.blicky.getElementsByClassName( 'blicky-slide' )[slider.slideCount + 1].offsetLeft * -1;

		} else {

			slider.posX = slider.slides[slider.currentSlide].offsetLeft * -1;

		}

	} else {

		slider.currentSlide += 1;

		slider.posX = slider.slides[slider.currentSlide].offsetLeft * -1;

	}

}

function slide( blicky ) {

	let slider = blicky.slider;

	let $blicky = slider.blicky;

	slider.directionalHistory.length = 0;

	$blicky.style.left = `${slider.posX}px`;

}

export function snap( blicky ) {

	let slider = blicky.slider;

	let percentChange = ( ( Math.abs( slider.posX ) - slider.slides[slider.currentSlide].offsetLeft ) / slider.width ) * 100;

	let dir = direction( blicky );

	slider.oldcX = undefined;

	if ( Math.abs( percentChange ) > 20 ) {

		if ( dir == 'right' ) {

			right( blicky );

		} else if ( dir == 'left' ) {

			left( blicky );

		} else {

			slider.posX = slider.slides[slider.currentSlide].offsetLeft * -1;

		}

	} else {

		slider.posX = slider.slides[slider.currentSlide].offsetLeft * -1;

	}

	transition( blicky );

	slide( blicky );

}