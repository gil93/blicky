import Imagesloaded from 'imagesloaded';
import { move } from './move';

export function build() {

	let domSlides = this.slider.blicky.getElementsByClassName( 'blicky-slide' );

	this.slider.blicky.style.width = `${this.slider.width * domSlides.length }px`;

	Array.from( domSlides ).forEach( slide => slide.style.width = `${this.slider.width}px` );

	this.slider.blicky.style.left = `${window.parseInt(domSlides[0].dataset.blickyIndex) * this.slider.width}px`;

	this.slider.container.style.height = `${this.slider.height}px`;

}

export function rebuild() {

	new Imagesloaded( this.slider.element, () => {

		let newWidth = this.slider.element.parentElement.clientWidth;

		let domSlides = this.slider.blicky.getElementsByClassName( 'blicky-slide' );

		this.slider.blicky.style.width = `${newWidth * this.slider.slideCount}px`;

		Array.from( domSlides ).forEach( slide => slide.style.width = `${newWidth}px` );

		this.slider.container.style.height = `${domSlides[0].clientHeight}px`;

		this.slider.width = this.slider.element.clientWidth;

		this.slider.posX = ( this.slider.currentSlide * this.slider.width ) * -1;

		move.call( this, 0, true );

	});

}