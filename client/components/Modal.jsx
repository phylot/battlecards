import React from 'react';

export class Modal extends React.Component {
	render() {
		return (
			<div className={'overlay' + ( this.props.info.visible ? ' visible' : '' )}>
				<div className='modal'>
					<h1>{this.props.info.heading}</h1>
					<h2>{this.props.info.subHeading}</h2>
					<p>{this.props.info.paragraph}</p>
					<button onClick={this.props.onClick} className='button'>{this.props.info.button}</button>
				</div>
			</div>
		)
	}
}