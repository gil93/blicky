import Imagesloaded from 'imagesloaded';

import { build } from './../functions/build';
import { publish } from './../functions/publish';
import { infinite } from './../functions/infinite';

export default class Core {

	constructor( blicky ) {

		( async () => {

			await this.setDomProps();

			this.preBuildOptions();

			this.build();

			this.postBuildOptions();

		});

		this.blicky = blicky;

	}

	preBuildOptions() {

	}

	postBuildOptions() {

		let options = this.blicky.options;

		if ( options.infinite === true ) infinite.call( this.blicky );

	}

	setDomProps() {

		let blicky = this.blicky;

		let slides = Array.from( blicky.element.children );

		blicky.slides = slides;

		blicky.originalElement = {

			element: blicky.element,
			slides: slides,
			slideCount: slides.length

		};

		blicky.slider = {

			slideCount: slides.length

		};

		Imagesloaded( blicky.element, () => {

			blicky.originalElement = {

				...blicky.originalElement,
				width: blicky.element.clientWidth,

			};

			blicky = {

				...blicky,
				width: blicky.element.clientWidth,

			};

		});

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

	build() {

		let blicky = this.blicky;

		let markup = this.createContainer();

		let newSlider = new DOMParser().parseFromString( markup, 'text/html' ).body.firstChild;

		publish.call( this, newSlider );

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

		build.call( blicky );

	}

}