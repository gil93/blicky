export function setDomProps() {

	let slides = Array.from( this.element.children );

	this.originalElement = {

		element: this.element,
		width: this.element.clientWidth,
		slides: slides,
		slideCount: slides.length

	};

	this.slider = {

		width: this.originalElement.width,
		slideCount: slides.length

	}

}

export function build() {

	let markup = createContainer.call( this );

	let newSlider = new DOMParser().parseFromString( markup, 'text/html' ).body.firstChild;

	publish.call( this, newSlider );

	let newSliderProps = {

		element: this.element,
		height: this.element.getElementsByClassName( 'blicky-slide' )[0].clientHeight,
		container: this.element.children[0],
		blicky: this.element.children[0].children[0],
		slides: Array.from( this.element.getElementsByClassName( 'blicky-slide' ) ),
		currentSlide: 0,
		directionalHistory: []

	};

	this.slider = {

		...this.slider,
		...newSliderProps

	};

}

function createSlides() {

	return this.originalElement.slides

		.map( slide => `

			<div class="blicky-slide">

				${ slide.outerHTML }

			</div>

		`)

		.join( ' ' )

	;

}

function createContainer() {

	return `

		<div class="blicky-wrapper">

			<div class="blicky-container">

				<div class="blicky">

					${ createSlides.call( this ) }

				</div>

			</div>

		</div>

	`;

}

function publish( newSlider ) {

	document.body.insertBefore( newSlider, this.element );

	document.body.removeChild( this.element );

	this.element = newSlider;

}