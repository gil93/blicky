const infiniteSlide = slide => {

	let clone = slide.cloneNode( true );

	clone.classList.add( 'blicky-cloned' );

	clone.style.cssText = 'display: none';

	return clone;

}

export function infinite() {

	let slider = this.slider;

	let slides = this.slider.slides;

	let half = Math.ceil( this.slider.slideCount / 2 );

	slides

		.slice( 0, half )

		.reverse()

		.forEach( slide => slider.blicky.insertBefore( infiniteSlide( slide ), slider.blicky.children[0] ) )

	;

	slides

		.slice( half - 1, slider.slideCount )

		.reverse()

		.forEach( slide => slider.blicky.appendChild( infiniteSlide( slide ) ) )

	;

}