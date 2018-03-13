const infiniteSlide = ( direction, index, slide ) => {

	let clone = slide.cloneNode( true );

	clone.classList.add( 'blicky-cloned' );

	if ( direction == 'left' ) {

		clone.dataset.blickyIndex = index - 1;

	} else {

		clone.dataset.blickyIndex = index + 1;

	}

	return clone;

}

export function infinite() {

	let slider = this.slider;

	let slides = this.slider.slides;

	slides

		.slice( slider.slideCount - 1, slider.slideCount )

		.reverse()

		.forEach( ( slide, index ) => slider.blicky.insertBefore( infiniteSlide( 'left', index, slide ), slider.blicky.children[0] ) )

	;

	slides

		.slice( 0, 1 )

		.forEach( ( slide, index ) => slider.blicky.appendChild( infiniteSlide( 'right', index, slide ) ) )

	;

}