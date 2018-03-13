import { infinite } from './../options/infinite';
import { set } from './../functions/set';

import Imagesloaded from 'imagesloaded';

export default class Core {

	constructor( blicky ) {

		this.blicky = blicky;

		return ( async () => {

			await this.props();

			this.preBuild();

			this.build();

			this.postBuild();

			set( this.blicky );

			return this.blicky;

		})();

	}

	async props() {

		let options = this.blicky.options;

		let slides = Array.from( this.blicky.wrapper.children );

		this.blicky = {

			...this.blicky,
			slides: slides,
			slider: {

				slideCount: slides.length

			}

		};

		await new Promise( ( resolve, reject ) => {

			new Imagesloaded( this.blicky.wrapper, result => {

				this.blicky = {

					...this.blicky,
					slider: {

						...this.blicky.slider,
						width: this.blicky.wrapper.clientWidth

					}
				}

				resolve( result );

			});

		});

	}

	preBuild() {

	}

	publish( newSlider ) {

		let blicky = this.blicky;

		document.body.insertBefore( newSlider, blicky.wrapper );

		document.body.removeChild( blicky.wrapper );

		blicky.wrapper = newSlider;

	}

	slides() {

		return this.blicky.slides

			.map( slide => `

				<div class="blicky-slide">

					${ slide.outerHTML }

				</div>

			` )

			.join( ' ' )

		;

	}

	wrapper() {

		return `

			<div class="blicky-wrapper">

				<div class="blicky-container">

					<div class="blicky">

						${ this.slides() }

					</div>

				</div>

			</div>

		`;

	}

	build() {

		this.publish( new DOMParser().parseFromString( this.wrapper(), 'text/html' ).body.firstChild );

		let slides = Array

			.from( this.blicky.wrapper.getElementsByClassName( 'blicky-slide' ) )

			.map( ( slide, index ) => {

				slide.dataset.blickyIndex = index;

				return slide;

			})

		;

		let newSliderProps = {

			wrapper: this.blicky.wrapper,
			height: this.blicky.wrapper.getElementsByClassName( 'blicky-slide' )[0].clientHeight,
			container: this.blicky.wrapper.children[0],
			blicky: this.blicky.wrapper.children[0].children[0],
			slides: slides,
			currentSlide: 0,
			directionalHistory: [],
			snapping: false

		};

		this.blicky.slider = {

			...this.blicky.slider,
			...newSliderProps

		};

	}

	postBuild() {

		if ( this.blicky.options.infinite == true ) infinite( this.blicky );

	}

}