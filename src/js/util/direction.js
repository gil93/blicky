export function direction( blicky ) {

	let slider = blicky.slider;

	let lefts = slider.directionalHistory.filter( dir => dir == 'left' ).length;

	let rights = slider.directionalHistory.filter( dir => dir == 'right' ).length;

	if ( rights > lefts ) {

		return 'right';

	} else if ( lefts > rights ) {

		return 'left';

	} else {

		return 'neutral';

	}

}