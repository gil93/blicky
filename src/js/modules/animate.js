function animateInit() {

	let slider = this.slider;

	slider.container.style.height = `${slider.height}px`;

	slider.blicky.style.width = `${slider.width * slider.slideCount}px`;

	slider.slides.forEach( slide => slide.style.width = `${slider.width}px` );

}

function draggable() {

	let self = this;

	let slider = this.slider;

	slider.posX = 0;

	slider.blicky.addEventListener( 'mousedown', mousedown, false );

	function mousedown() {

		document.addEventListener( 'mousemove', mousemove, false );

		document.addEventListener( 'mouseup', mouseup, false );

		document.addEventListener( 'mouseout', mouseup, false );
		
	}

	function mousemove( e ) {

		let cX = e.clientX;

		move.call( self, cX );

		slider.oldcX = cX;

	}

	function mouseup() {

		snap.call( self );

		document.removeEventListener( 'mousemove', mousemove, false );

		document.removeEventListener( 'mouseup', mouseup, false );

		document.removeEventListener( 'mouseout', mouseup, false );

	}

}

function swapSlides() {

	let slider = this.slider;

	slider.blicky.insertBefore( slider.blicky.children[ slider.slideCount - 2 ], slider.blicky.children[0] );

	slider.blicky.insertBefore( slider.blicky.children[ slider.slideCount - 1 ], slider.blicky.children[0] );



}

function move( cX ) {

	let slider = this.slider;

	if ( slider.oldcX == undefined ) return;

	if ( Math.abs( cX ) - Math.abs( slider.oldcX ) == 0 ) return;

	slider.directionalHistory.push( ( cX - slider.oldcX ) > 0 ? 'right' : 'left' );

	if ( this.options.infinite ) swapSlides.call( this );

	slider.posX += ( ( cX - slider.oldcX ) );

	slider.blicky.style.left = `${slider.posX}px`;

}

function transition() {

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

function snapRight() {

	let slider = this.slider;

	if ( slider.currentSlide == 0 ) {

		slider.posX = slider.currentSlide * slider.width;

	} else {

		slider.posX = ( slider.currentSlide - 1 ) * ( slider.width * -1 );

		slider.currentSlide -= 1;

	}

}

function snapLeft() {

	let slider = this.slider;

	if ( slider.currentSlide == slider.slideCount - 1 ) {

		slider.posX = slider.currentSlide * ( slider.width * -1 );

	} else {

		slider.posX = ( slider.currentSlide + 1 ) * ( slider.width * -1 );

		slider.currentSlide += 1;

	}

}

function snap() {

	let slider = this.slider;

	let percentChange = Math.round( ( ( Math.abs( slider.posX ) - ( slider.currentSlide * slider.width ) ) / slider.width ) * 100 );

	slider.oldcX = undefined;

	transition.call( this );

	let lefts = slider.directionalHistory.filter( direction => direction == 'left' ).length;

	let rights = slider.directionalHistory.filter( direction => direction == 'right' ).length;

	if ( Math.abs( percentChange ) > 20 ) {

		if ( rights > lefts ) {

			snapRight.call( this );

		} else if ( lefts > rights ) {

			snapLeft.call( this );

		} else {

			slider.posX = slider.currentSlide * slider.width;

		}

	} else {

		slider.posX = slider.currentSlide * ( slider.width * -1 );

	}

	slider.directionalHistory.length = 0;

	slider.blicky.style.left = `${slider.posX}px`;

}

export function animate() {

	animateInit.call( this );

	draggable.call( this );

}