import Imagesloaded from 'imagesloaded';
import { move } from './move';

export function build() {

	this.slider.blicky.style.width = `${this.slider.width * this.slider.slideCount}px`;

	this.slider.slides.forEach( slide => slide.style.width = `${this.slider.width}px` );

	this.slider.container.style.height = `${this.slider.height}px`;

}

export function rebuild() {

	new Imagesloaded( this.slider.element, () => {

		let newWidth = this.slider.element.parentElement.clientWidth;

		this.slider.blicky.style.width = `${newWidth * this.slider.slideCount}px`;

		this.slider.slides.forEach( slide => slide.style.width = `${newWidth}px` );

		this.slider.container.style.height = `${this.slider.slides[0].clientHeight}px`;

		this.slider.width = this.slider.element.clientWidth;

		this.slider.posX = ( this.slider.currentSlide * this.slider.width ) * -1;

		move.call( this, 0, true );

	});

}