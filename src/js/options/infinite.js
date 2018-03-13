const infiniteSlide = ( direction, index, slide ) => {

	let clone = slide.cloneNode( true );

	clone.classList.add( 'blicky-cloned' );

	clone.dataset.blickyIndex = direction == 'left' ? index - 1 : index + 1;

	return clone;

}

const addSlides = ( blicky ) => {

	let slider = blicky.slider;

	let slides = slider.slides;

	slides

		.slice( slider.slideCount - 1, slider.slideCount )

		.reverse()

		.forEach( slide => slider.blicky.insertBefore( infiniteSlide( 'left', 0, slide ), slider.blicky.children[0] ) )

	;

	slides

		.slice( 0, 1 )

		.forEach( slide => slider.blicky.appendChild( infiniteSlide( 'right', slider.slideCount - 1, slide ) ) )

	;

}

export function infinite( blicky ) {

	addSlides( blicky ); 

}

export function isInfinite( blicky ) {

	return blicky.options.infinite;

}