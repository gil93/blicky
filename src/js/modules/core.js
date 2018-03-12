import Imagesloaded from 'imagesloaded';

import { build } from './../functions/build';
import { publish } from './../functions/publish';
import { infinite } from './../functions/infinite';

export default class Core {

	constructor( blicky ) {

		this.blicky = blicky;

		return ( async () => {

			this.preBuildOptions();

			await this.setDomProps();

			this.buildSlider();

			this.postBuildOptions();

			build.call( this.blicky );

			return this.blicky;

		})();

	}

	preBuildOptions() {

		let options = this.blicky.options;

	}

	postBuildOptions() {

		let options = this.blicky.options;

		if ( options.infinite === true ) infinite.call( this.blicky );

	}

	async setDomProps() {

		let slides = Array.from( this.blicky.element.children );

		this.blicky = {

			...this.blicky,
			slides: slides,
			slider: {

				slideCount: slides.length

			}

		};

		await new Promise( ( resolve, reject ) => {

			new Imagesloaded( this.blicky.element, result => {

				this.blicky = {

					...this.blicky,
					slider: {

						...this.blicky.slider,
						width: this.blicky.element.clientWidth

					}
				}

				resolve( result );

			});

		});

	}

	createSlides() {

		return this.blicky.slides

			.map( slide => `

				<div class="blicky-slide">

					${ slide.outerHTML }

				</div>

			`)

			.join( ' ' )

		;

	}

	createContainer() {

		return `

			<div class="blicky-wrapper">

				<div class="blicky-container">

					<div class="blicky">

						${ this.createSlides() }

					</div>

				</div>

			</div>

		`;

	}

	buildSlider() {

		let markup = this.createContainer();

		let newSlider = new DOMParser().parseFromString( markup, 'text/html' ).body.firstChild;

		publish.call( this, newSlider );

		let slides = Array

			.from( this.blicky.element.getElementsByClassName( 'blicky-slide' ) )

			.map( ( slide, index ) => {

				slide.dataset.blickyIndex = index;

				return slide;

			})

		;

		let newSliderProps = {

			element: this.blicky.element,
			height: this.blicky.element.getElementsByClassName( 'blicky-slide' )[0].clientHeight,
			container: this.blicky.element.children[0],
			blicky: this.blicky.element.children[0].children[0],
			slides: slides,
			currentSlide: 0,
			directionalHistory: []

		};

		this.blicky.slider = {

			...this.blicky.slider,
			...newSliderProps

		};

	}

}