import React from 'react';

export class Graveyard extends React.Component {
	render() {
		return (
			<div className='graveyard'>
				<div className='count'>
					{this.props.count}
				</div>
				<div className='crossImg'></div>
			</div>
		);
	}
}