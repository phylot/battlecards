import React from 'react';

export class Deck extends React.Component {
	render() {
		if (!this.props.cards) { // If no card data
			return (
				<div className={'deck ' + this.props.cssClass + ' ' + 'empty'}>
					<div className='deckCounter'><div className='counter'><span>0</span></div></div>
					<div className='deckCards'>
						<div className='deckPlaceholder'>
							<div className='inner'>
		        		<div className='cardLogo'>BATTLE<span>CARDS</span></div>
		        	</div>
						</div>
		      </div>
				</div>
			)
		}
		var cards = this.props.cards.slice(1, 6),
				deckCount = this.props.cards.length > 0 ? this.props.cards.length - 1 : 0,
				slideOut = this.props.slideOut,
				slideDown = this.props.slideDown,
				bombPresent = false,
				bombCount = 0,
				blastWarning = false,
		deckItems = cards.reverse().map(function(item, index, arr) { // Make shallow copy and reverse array, before mapping

			if (item.blastImminent) {
				blastWarning = true;
			}

      return (
        <div key={index} 
        className={'deckCard' + (' card'+(index+1)) + 
        (index == 0 ? ' last' : '') + 
        (arr.length - 1 === index ? ' first' : '') + 
        (item.code == 'BOMB' ? ' bomb' : '') +
        (item.blastImminent ? ' blastImminent' : '')}>
        	<div className='flashOverlay'></div>
        	<div className='inner'>
        		<div className='cardLogo'>BATTLE<span>CARDS</span></div>
        		<div className='bombIcon'><div className='warning'>!</div></div>
        	</div>
        </div>
      );
    });

    // Check for bombs / count bombs
    for (var i = 1; i < this.props.cards.length; i++) { // Skip first 'drawn' card, so i = 1
    	if (this.props.cards[i].code == 'BOMB') {
				bombPresent = true;
				bombCount++;
			}
    }

		return (
			<div className={'deck ' + this.props.cssClass + ' ' + (bombPresent ? 'bombPresent ' : '') + (this.props.damageFlash ? 'damageFlash rumble ' : '') + 
			(this.props.healPulse ? 'healPulse ' : '') + (blastWarning ? 'blastWarning ' : '') + (deckCount < 1 ? 'empty ' : '')}>
				<div className='deckCounter'>
					<div className='counter'><div className='flashOverlay'></div><span>{deckCount}</span></div>
					<div className='bombCounter'><div className='count'>{bombCount}</div><div className='warning'>!</div></div>
				</div>
				<div className='deckCards'>
					<div className={'deckCard animationCard' + (slideDown ? ' slideDown' : '')}>
						<div className='inner'>
	        		<div className='cardLogo'>BATTLE<span>CARDS</span></div>
	        	</div>
					</div>
					<div className='deckPlaceholder'>
						<div className='inner'>
	        		<div className='cardLogo'>BATTLE<span>CARDS</span></div>
	        	</div>
					</div>
					{deckItems}
				</div>
			</div>
		)
	}
}