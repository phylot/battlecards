import React from 'react';

export class SpeechBubble extends React.Component {
	render() {
		return (
			<div className={'speechBubble' + (this.props.info.visible ? ' popIn' : ' popOut') + (this.props.info.thoughtBubble ? ' thoughtBubble' : '')}>
				<div className='inner'>
					<p>{this.props.info.content}</p>
				</div>
				<div className='arrow'></div>
				<div className='bubbles'>
					<div className='bubbleOne'></div>
					<div className='bubbleTwo'></div>
				</div>
			</div>
		)
	}
}