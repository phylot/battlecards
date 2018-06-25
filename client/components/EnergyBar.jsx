import React from 'react';

export class EnergyBar extends React.Component {
	render() {
		var barWidth = { width: this.props.barWidth + '%' };
		
		return (
			<div className='energyBar'>
				<div className='border'>
					<div className='bar' style={barWidth}></div>
				</div>
			</div>
		);
	}
}