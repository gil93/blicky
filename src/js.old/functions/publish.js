export function publish( newSlider ) {

	let blicky = this.blicky;

	document.body.insertBefore( newSlider, blicky.element );

	document.body.removeChild( blicky.element );

	blicky.element = newSlider;

}