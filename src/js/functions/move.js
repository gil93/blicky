export function move( cX ) {

	let slider = this.slider;

	if ( slider.oldcX == undefined ) return;

	if ( Math.abs( cX ) - Math.abs( slider.oldcX ) == 0 ) return;

	slider.directionalHistory.push( ( cX - slider.oldcX ) > 0 ? 'right' : 'left' );

	slider.posX += ( ( cX - slider.oldcX ) );

	slider.blicky.style.left = `${slider.posX}px`;

}