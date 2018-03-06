export default class Core {

	constructor( blicky ) {

		this.blicky = blicky;

		this.setDomProps();

		this.build();

	}

	setDomProps() {

		let blicky = this.blicky;

		let slides = Array.from( blicky.element.children );

		blicky.slides = slides;

		blicky.originalElement = {

			element: blicky.element,
			width: blicky.element.clientWidth,
			slides: slides,
			slideCount: slides.length

		};

		blicky.slider = {

			width: blicky.originalElement.width,
			slideCount: slides.length

		}

	}

	createSlides() {

		return this.blicky.originalElement.slides

			.map( slide => `

				<div class="blicky-slide">

					${ slide.outerHTML }

				</div>

			`)

			.join( ' ' )

		;

	}

	createContainer() {

		let self = this;

		return `

			<div class="blicky-wrapper">

				<div class="blicky-container">

					<div class="blicky">

						${ self.createSlides() }

					</div>

				</div>

			</div>

		`;

	}

	publish( newSlider ) {

		let blicky = this.blicky;

		document.body.insertBefore( newSlider, blicky.element );

		document.body.removeChild( blicky.element );

		blicky.element = newSlider;

	}

	build() {

		let blicky = this.blicky;

		let markup = this.createContainer();

		let newSlider = new DOMParser().parseFromString( markup, 'text/html' ).body.firstChild;

		this.publish( newSlider );

		let newSliderProps = {

			element: blicky.element,
			height: blicky.element.getElementsByClassName( 'blicky-slide' )[0].clientHeight,
			container: blicky.element.children[0],
			blicky: blicky.element.children[0].children[0],
			slides: Array.from( blicky.element.getElementsByClassName( 'blicky-slide' ) ),
			currentSlide: 0,
			directionalHistory: []

		};

		blicky.slider = {

			...blicky.slider,
			...newSliderProps

		};

		blicky.slider.container.style.height = `${blicky.slider.height}px`;

		blicky.slider.blicky.style.width = `${blicky.slider.width * blicky.slider.slideCount}px`;

		blicky.slider.slides.forEach( slide => slide.style.width = `${blicky.slider.width}px` );

	}

}