import { isInfinite } from './../options/infinite';

export function transition( blicky ) {

	let slider = blicky.slider;

	let $blicky = slider.blicky;

	slider.snapping = true;

	slider.wrapper.classList.add( 'snapping' );

	let transitionDuration = window.parseFloat( window.getComputedStyle( $blicky ).getPropertyValue( 'transition-duration' ), 10 );

	window.setTimeout( () => {

		// have to return promise and continue this operation from within snap.js

		// if ( isInfinite ) {

		// 	if ( slider.currentSlide == 0 ) {

		// 		let realCurrentSlide = Array.from( $blicky

		// 			.getElementsByClassName( 'blicky-slide' ) )

		// 			.filter( slide => slider.posX == slide.offsetLeft )

		// 		;

		// 		if ( realCurrentSlide.length ) {

		// 			slider.snapping = false;

		// 			slider.wrapper.classList.remove( 'snapping' );

		// 			slider.currentSlide = slider.slides.length - 1;

		// 			slider.posX = Math.abs( slider.slides[slider.currentSlide].offsetLeft ) * -1;

		// 			$blicky.style.left = `${slider.posX}px`;

		// 			console.log( slider.currentSlide );

		// 			console.log( slider.posX );

		// 		}

		// 	}

		// }

		slider.snapping = false;

		slider.wrapper.classList.remove( 'snapping' );

	}, ( transitionDuration * 1000 ) + 100 );

}