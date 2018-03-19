import { drag } from './drag';

import Imagesloaded from 'imagesloaded';

export function set( blicky ) {

	let slider = blicky.slider;

	let $blicky = slider.blicky;

	let domSlides = $blicky.getElementsByClassName( 'blicky-slide' );

	$blicky.style.width = `${slider.width * domSlides.length }px`;

	Array.from( domSlides ).forEach( slide => slide.style.width = `${slider.width}px` );

	$blicky.style.left = `${window.parseInt(domSlides[0].dataset.blickyIndex) * slider.width}px`;

	slider.container.style.height = `${slider.height}px`;

}

export function reset( blicky ) {

	let slider = blicky.slider;

	let $blicky = slider.blicky;

	new Imagesloaded( slider.wrapper, () => {

		let newWidth = slider.wrapper.parentElement.clientWidth;

		let domSlides = $blicky.getElementsByClassName( 'blicky-slide' );

		$blicky.style.width = `${newWidth * slider.slideCount}px`;

		Array.from( domSlides ).forEach( slide => slide.style.width = `${newWidth}px` );

		slider.container.style.height = `${domSlides[0].clientHeight}px`;

		slider.width = slider.wrapper.clientWidth;

		slider.posX = ( ( slider.currentSlide + 1 ) * slider.width ) * -1;

		$blicky.style.left = `${slider.posX}px`;

	});

}