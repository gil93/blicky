import { isInfinite } from './../options/infinite';
import { direction } from './direction';

export function transition( blicky ) {

	let slider = blicky.slider;

	let $blicky = slider.blicky;

	let dir = direction( blicky );

	slider.snapping = true;

	slider.wrapper.classList.add( 'snapping' );

	let transitionDuration = window.parseFloat( window.getComputedStyle( $blicky ).getPropertyValue( 'transition-duration' ), 10 );

	window.setTimeout( () => {

		if ( isInfinite ) {

			if ( slider.currentSlide == 0 && dir == 'right' ) {

				let realCurrentSlide = Array.from( $blicky

					.getElementsByClassName( 'blicky-slide' ) )

					.filter( slide => slider.posX == slide.offsetLeft )

				;

				if ( realCurrentSlide.length ) {

					slider.snapping = false;

					slider.wrapper.classList.remove( 'snapping' );

					slider.currentSlide = slider.slides.length - 1;

					slider.posX = Math.abs( slider.slides[slider.currentSlide].offsetLeft ) * -1;

					$blicky.style.left = `${slider.posX}px`;

				}

			} else if ( dir == 'left' ) {

				if ( slider.currentSlide == 0 && slider.currentDisplaySlide == slider.slideCount ) {

					slider.snapping = false;

					slider.wrapper.classList.remove( 'snapping' );

					var currentDisplaySlide = slider.currentDisplaySlide = slider.displaySlides

						.filter( slide => window.parseInt( slide.dataset.blickyIndex, 10 ) == slider.currentSlide )[0]

					;

					slider.currentDisplaySlide = slider.displaySlides.indexOf( currentDisplaySlide );

					slider.posX = currentDisplaySlide.offsetLeft * -1;

					$blicky.style.left = `${slider.posX}px`;

				}

			}

		}

		slider.snapping = false;

		slider.wrapper.classList.remove( 'snapping' );

	}, ( transitionDuration * 1000 ) + 100 );

}