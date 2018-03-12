export function move( cX, resizing ) {

	let slider = this.slider;

	if ( slider.element.classList.contains( 'snapping' ) ) return;

	if ( ! resizing ) {

		if ( slider.oldcX == undefined ) return;

		if ( Math.abs( cX ) - Math.abs( slider.oldcX ) == 0 ) return;

		slider.directionalHistory.push( ( cX - slider.oldcX ) > 0 ? 'right' : 'left' );

		slider.posX += ( cX - slider.oldcX );

	}

	slider.blicky.style.left = `${slider.posX}px`;

}