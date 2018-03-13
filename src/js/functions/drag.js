export function drag( blicky, cX, resizing ) {

	let slider = blicky.slider;

	let $blicky = slider.blicky;

	if ( slider.wrapper.classList.contains( 'snapping' ) || slider.snapping ) return;

	if ( ! resizing ) {

		if ( slider.oldcX == undefined ) return;

		if ( Math.abs( cX ) - Math.abs( slider.oldcX ) == 0 ) return;

		slider.directionalHistory.push( ( cX - slider.oldcX ) > 0 ? 'right' : 'left' );

		slider.posX += ( cX - slider.oldcX );

	}

	$blicky.style.left = `${slider.posX}px`;

}