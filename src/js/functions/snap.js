import { transition } from './../util/transition';
import { direction } from './../util/direction';
import { isInfinite } from './../options/infinite';

function right( blicky ) {

	let slider = blicky.slider;

	debugger;

	if ( slider.currentSlide == 0 ) {

		slider.posX = 0;

		debugger;

	} else {

		debugger;

		if ( isInfinite ) {

			debugger;

			slider.posX = slider.slides[slider.currentSlide].offsetLeft * -1;

			slider.currentSlide -= 1;

		} else {

			debugger;

		}

	}

}

function left( blicky ) {

	let slider = blicky.slider;

	if ( slider.currentSlide < slider.slideCount - 1 ) {

		slider.currentSlide += 1;

		let currentDisplaySlide = slider.currentDisplaySlide = slider.displaySlides

			.filter( slide => window.parseInt( slide.dataset.blickyIndex, 10 ) == slider.currentSlide )

		;

		slider.currentDisplaySlide = currentDisplaySlide

			.map( slide => window.parseInt( slide.dataset.blickyIndex, 10 ) )[0]

		;

		slider.posX = currentDisplaySlide[0].offsetLeft * -1;

	} else {

		let currentDisplaySlide = slider.currentDisplaySlide = slider.displaySlides

			.filter( slide => window.parseInt( slide.dataset.blickyIndex, 10 ) == ( slider.currentSlide + 1 ) )

		;

		slider.currentDisplaySlide = slider.currentSlide + 1;

		slider.currentSlide = 0;

		slider.posX = currentDisplaySlide[0].offsetLeft * -1;

	}

	// if ( slider.currentSlide == slider.slideCount - 1 ) {

	// 	debugger;

	// 	if ( isInfinite ) {

	// 		debugger;

	// 		slider.currentSlide += 1;

	// 		slider.posX = slider.blicky.getElementsByClassName( 'blicky-slide' )[slider.slideCount + 1].offsetLeft * -1;

	// 	} else {

	// 		debugger;

	// 		slider.posX = slider.slides[slider.currentSlide].offsetLeft * -1;

	// 	}

	// } else {

	// 	debugger;

	// 	slider.currentSlide += 1;

	// 	slider.posX = slider.slides[slider.currentSlide].offsetLeft * -1;

	// }

}

function slide( blicky ) {

	let slider = blicky.slider;

	let $blicky = slider.blicky;

	slider.directionalHistory.length = 0;

	$blicky.style.left = `${slider.posX}px`;

}

export function snap( blicky ) {

	let slider = blicky.slider;

	let currentSlide = isInfinite ? slider.currentDisplaySlide : currentSlide;

	let percentChange = ( ( Math.abs( slider.posX ) - slider.slides[currentSlide].offsetLeft ) / slider.width ) * 100;

	let dir = direction( blicky );

	slider.oldcX = undefined;

	if ( Math.abs( percentChange ) > 20 ) {

		if ( dir == 'right' ) {

			right( blicky );

		} else if ( dir == 'left' ) {

			left( blicky );

		} else {

			slider.posX = slider.slides[currentSlide].offsetLeft * -1;

		}

	} else {

		slider.posX = slider.slides[currentSlide].offsetLeft * -1;

	}

	transition( blicky );

	slide( blicky );

}