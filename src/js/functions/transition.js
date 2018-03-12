function infiniteReset() {

	let slider = this.slider;

	let currentSlide = this.slider.currentSlide;

	if ( currentSlide == 0 && this.slider.posX == 0 ) {

		let clonesLength = this.slider.blicky.getElementsByClassName( 'blicky-cloned' ).length;

		let lastSlide = this.slider.slideCount - 1 + ( clonesLength / 2 );

		this.slider.currentSlide = lastSlide;

		this.slider.posX = lastSlide * this.slider.width * -1;

		this.slider.blicky.style.left = `${this.slider.posX}px`;

	}

}

export function transition() {

	let self = this;

	let slider = this.slider;

	slider.element.classList.add( 'snapping' );

	let transitionDuration = window.parseFloat( window.getComputedStyle( slider.blicky ).getPropertyValue( 'transition-duration' ), 10 );

	if ( transitionDuration == 0 ) {

		slider.element.classList.remove( 'snapping' );

		return;

	}

	slider.element.addEventListener( 'transitionend', transitionend, false );

	slider.element.addEventListener( 'webkitTransitionend', transitionend, false );

	slider.element.addEventListener( 'otransitionend', transitionend, false );

	function transitionend( e ) {

		slider.element.classList.remove( 'snapping' );

		slider.element.removeEventListener( 'transitionend', transitionend, false );

		slider.element.removeEventListener( 'webkitTransitionend', transitionend, false );

		slider.element.removeEventListener( 'otransitionend', transitionend, false );

		if ( self.options.infinite ) infiniteReset.call( self );

	}

}