export function transition() {

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

	}

}