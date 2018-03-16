const infiniteSlide = ( direction, index, slide ) => {

	let clone = slide.cloneNode( true );

	clone.classList.add( 'blicky-cloned' );

	clone.dataset.blickyIndex = direction == 'left' ? index - 1 : index + 1;

	return clone;

}

const addSlides = blicky => {

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

	slider.displaySlides = [

		...Array.from( slider.blicky.getElementsByClassName( 'blicky-cloned' ) ),
		...slides

	].sort( ( a, b ) => {

		let aIndex = window

			.parseInt( a.dataset.blickyIndex, 10 )

		;

		let bIndex = window

			.parseInt( b.dataset.blickyIndex, 10 )

		;

		return aIndex > bIndex;

	});

}

export function infinite( blicky ) {

	blicky.slider = {

		...blicky.slider,
		currentDisplaySlide: blicky.slider.currentSlide,
		displaySlides: []

	};

	addSlides( blicky ); 

}

export function isInfinite( blicky ) {

	return blicky.options.infinite;

}