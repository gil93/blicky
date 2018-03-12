export function getDirection () {

	let slider = this.slider;

	let lefts = slider.directionalHistory

		.filter( direction => direction == 'left' ).length

	;

	let rights = slider.directionalHistory

		.filter( direction => direction == 'right' ).length

	;

	if ( rights > lefts ) {

		return 'right';

	} else if ( lefts > rights ) {

		return 'left';

	} else {

		return 'neutral';

	}

}