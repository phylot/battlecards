import React from 'react';
import Button from '../components/Button.jsx';
import { EnergyBar } from '../components/EnergyBar.jsx';
import { SpeechBubble } from '../components/SpeechBubble.jsx';
import SwapButton from '../components/SwapButton.jsx';

export class Card extends React.Component {

	renderButton(attack, disabled, index) {
		return (
			<Button key={index.toString()} info={attack} onClick={() => this.props.onClick(attack, index)} disabled={disabled} />
		);
	}

	render() {

		if (!this.props.cardData) { // If no card data
			return (
				<div className={'card ' + this.props.styleName}>
					<div className='cardPlaceholder'>
						<div className='inner'>
	        		<div className='cardLogo'>BATTLE<span>CARDS</span></div>
	        	</div>
					</div>
				</div>
			);
		}

		var bombPresent = false,
				buttons = [];

		// Check for bombs / count bombs
    for (var i = 1; i < this.props.opponentDeck.length; i++) { // Skip first 'drawn' card, so i = 1
    	if (this.props.opponentDeck[i].code == 'BOMB') {
				bombPresent = true;
			}
    }

		for (var i = 0; i < this.props.cardData.attacks.length; i++) {
			// TODO: Offset more button logic to here, where the buttons are created... such as disabed logic if amount == 0
			var buttonDisabled = this.props.disabled || 
													(this.props.graveyardEmpty && this.props.cardData.attacks[i].effect == 'RESURRECT') ||
													(!bombPresent && this.props.cardData.attacks[i].effect == 'DETONATE');

			buttons.push(this.renderButton(this.props.cardData.attacks[i], buttonDisabled, i));
		};

		return (
			<div className={'card ' + this.props.styleName}>
				<div className='cardPlaceholder'>
					<div className='inner'>
        		<div className='cardLogo'>BATTLE<span>CARDS</span></div>
        	</div>
				</div>
				<div className={'flip-container' + (this.props.show ? ' slideIn' : ' flip') + (this.props.slideUp ? ' slideUp' : '') + (this.props.hidden ? ' hidden' : '')}>
					<div className='flipper'>
						<div className='front'>
							<SpeechBubble info={this.props.speechBubble} />
							<div className={'playerMarker' + (this.props.turnMarker ? ' visible' : '')}>
								<div className='wrap'>
									<div className='playerName'>{this.props.turnMarkerText}<span>Turn</span></div>
								</div>
							</div>
							<SwapButton onClick={this.props.swapClick} disabled={this.props.disabled || this.props.deck.length < 2} />
							<div className={'flashOverlay' + (this.props.damageFlash ? ' damageFlash' : '') + (this.props.sleepPulse ? ' sleepPulse' : '') + 
							(this.props.asleep ? ' asleep' : '')}></div>
							<div className='cardImage'>
								<img key={this.props.cardData.image} src={this.props.cardData.image} alt={this.props.cardData.name} />
							</div>
							<div className='cardStats'>
								<p className='cardNumber'>{this.props.cardData.number}</p>
								<h1 className='cardTitle'>{this.props.cardData.name}</h1>
								<EnergyBar barWidth={this.props.cardData.energy} />
								<div className='cardButtons'>
									{buttons}
								</div>
							</div>
						</div>
						<div className='back'>
							<div className='cardLogo'>BATTLE<span>CARDS</span></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}