import { transition } from './../util/transition';
import { direction } from './../util/direction';

function right( blicky ) {

	let slider = blicky.slider;

	if ( slider.currentSlide == 0 ) {

		slider.posX = 0;

	} else {

		slider.posX = ( slider.currentSlide - 1 ) * ( slider.width * -1 );

		slider.currentSlide -= 1;

	}

}

function left( blicky ) {

	let slider = blicky.slider;

	if ( slider.currentSlide == slider.slideCount - 1 ) {

		slider.posX = slider.currentSlide * ( slider.width * -1 );

	} else {

		slider.posX = ( slider.currentSlide + 1 ) * ( slider.width * -1 );

		slider.currentSlide += 1;

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

	transition( blicky );

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

	slide( blicky );

}