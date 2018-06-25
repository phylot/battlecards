import React from 'react';
import { Card } from '../components/Card.jsx';
import { Deck } from '../components/Deck.jsx';
import { Graveyard } from '../components/Graveyard.jsx';
import { Modal } from '../components/Modal.jsx';
import { LoadingModal } from '../components/LoadingModal.jsx';
import { cards } from '../api.js'; // Get data - TODO: AJAX call (use a new separate container?) using the ES6 fetch API...
																		// fetch('http.api.something.com').then(res => res.json()).then(data => console.log(data));
																		// Could even use axios ... very smally library specifically for HTTP Requests / AJAX

export class Game extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	cardDecks: [],
    	graveyard: [],
    	gameStarted: false,
    	playerOneTurn: true,
    	cpuPlayer: true,
      cpuThinking: false,
      loading: false,
      bombKey: 0,
    	playerOne: {
    		turnOpen: false,
    		showCard: false,
    		asleep: false,
    		turnsAsleep: 0,
    		sleepPulse: false,
    		cardDamage: false,
    		slideUp: false,
    		slideDown: false,
    		deckDamage: false,
    		deckHeal: false,
    		speechBubble: {
	      	visible: false,
	      	thoughtBubble: false,
	      	content: ''
	      }
    	},
    	playerTwo: {
    		turnOpen: false,
    		showCard: false,
    		asleep: false,
    		turnsAsleep: 0,
    		sleepPulse: false,
    		cardDamage: false,
    		slideUp: false,
    		slideDown: false,
    		deckDamage: false,
    		deckHeal: false,
    		speechBubble: {
	      	visible: false,
	      	thoughtBubble: false,
	      	content: ''
	      }
    	},
      modal: {
      	visible: true,
      	heading: 'Welcome',
      	subHeading: 'Let the Combat Begin',
      	paragraph: 'Press PLAY to start...',
      	button: 'PLAY',
      	startGame: true
      }
    };
    this.startGame = this.startGame.bind(this);
    this.setupFirstTurn = this.setupFirstTurn.bind(this);
    this.startTurn = this.startTurn.bind(this);
    this.swapTurn = this.swapTurn.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.swapCard = this.swapCard.bind(this);
    this.applyCardDamage = this.applyCardDamage.bind(this);
    this.checkForDeadCard = this.checkForDeadCard.bind(this);
    this.removeCurrentCard = this.removeCurrentCard.bind(this);
    this.drawNextCards = this.drawNextCards.bind(this);
    this.checkForBombAttack = this.checkForBombAttack.bind(this);
    this.findBombs = this.findBombs.bind(this);
    this.loopDeck = this.loopDeck.bind(this);
    this.checkForBomb = this.checkForBomb.bind(this);
    this.checkForWinner = this.checkForWinner.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

	startGame() {

		let playerOneState = Object.assign({}, this.state.playerOne),
				playerTwoState = Object.assign({}, this.state.playerTwo);

		// TODO: Call a resetGame() function to handle this logic?... which then calls startGame() ? ...
		// ... Means I don't have to hide cards and set a timeout at start of the first game
		this.hideModal();

		playerOneState.showCard = false;
		playerTwoState.showCard = false;

		this.setState({
			loading: true,
			graveyard: [],
			playerOne: playerOneState,
			playerTwo: playerTwoState
		}, () => {
			
			var timeoutLength = this.state.gameStarted ? 600 : 0;
			setTimeout(() => {
				this.setState({
					cardDecks: shuffleCards(),
			    playerOneTurn: calculateChance(2)
			    // playerOneTurn: true // TEMP
				}, () => {

			  	// Preload initial card images
			  	var cardImages = [
			  		this.state.cardDecks[0][0].image,
			  		this.state.cardDecks[1][0].image
			  	];
			  	preloadImages(cardImages, () => {
			  		this.setState({
			  			loading: false,
						  modal: {
						  	visible: true,
						  	heading: (this.state.playerOneTurn ? 'You Go First!' : 'CPU Goes First!'),
						  	subHeading: '',
						  	paragraph: '',
						  	button: 'OK',
						  	startGame: false
						  }
						});
			  	});

			  });
			}, timeoutLength); 
		});
	}

	renderCards() {

		const deckOne = this.state.cardDecks.length ? this.state.cardDecks[0] : null,
					deckTwo = this.state.cardDecks.length ? this.state.cardDecks[1] : null,
					cardOne = this.state.cardDecks.length ? this.state.cardDecks[0][0] : null,
					cardTwo = this.state.cardDecks.length ? this.state.cardDecks[1][0] : null,
					cardOneEnabled = this.state.playerOne.turnOpen,
					graveyardEmpty = this.state.graveyard.length < 1 ? true : false;

		return (
			<div className='cardContainer'>
 				<Card styleName='playerTwo' cardData={cardTwo} deck={deckTwo} opponentDeck={deckOne} graveyardEmpty={graveyardEmpty}
 				turnMarker={!this.state.playerOneTurn && this.state.gameStarted} turnMarkerText='CPU' 
				speechBubble={this.state.playerTwo.speechBubble} damageFlash={this.state.playerTwo.cardDamage} sleepPulse={this.state.playerTwo.sleepPulse} 
				asleep={this.state.playerTwo.asleep} slideUp={this.state.playerTwo.slideUp} show={this.state.playerTwo.showCard} disabled={true}
				onClick={(attack, index) => this.handleClick(attack, index)} swapClick={() => this.swapCard()} />

				<div className='cardSeparator'>Vs<Graveyard count={this.state.graveyard.length} /></div>

				<Card styleName='playerOne' cardData={cardOne} deck={deckOne} opponentDeck={deckTwo} graveyardEmpty={graveyardEmpty}
				turnMarker={this.state.playerOneTurn && this.state.gameStarted} turnMarkerText='Your' 
				speechBubble={this.state.playerOne.speechBubble} damageFlash={this.state.playerOne.cardDamage} sleepPulse={this.state.playerOne.sleepPulse} 
				asleep={this.state.playerOne.asleep} slideUp={this.state.playerOne.slideUp} show={this.state.playerOne.showCard} disabled={!cardOneEnabled}
				onClick={(attack, index) => this.handleClick(attack, index)} swapClick={() => this.swapCard()} />

				<Deck cards={deckOne} slideDown={this.state.playerOne.slideDown} damageFlash={this.state.playerOne.deckDamage} 
				healPulse={this.state.playerOne.deckHeal} cssClass={'deckOne'} hidden={!this.state.gameStarted} />
				<Deck cards={deckTwo} slideDown={this.state.playerTwo.slideDown} damageFlash={this.state.playerTwo.deckDamage} 
				healPulse={this.state.playerTwo.deckHeal} cssClass={'deckTwo'} hidden={!this.state.gameStarted} />
			</div>
		);
	}

	setupFirstTurn() { // Rename setupGame() ??

		let playerOneState = Object.assign({}, this.state.playerOne),
				playerTwoState = Object.assign({}, this.state.playerTwo); 

		this.hideModal();
		// TODO: Use setState to cascade both decks into view

		// Use setState to slide + flip both cards into view
		playerOneState.showCard = true;
		playerTwoState.showCard = true;
		this.setState({ 
			playerOne: playerOneState,
			playerTwo: playerTwoState,
			gameStarted: true 
		}, () => {
			// Preload next images, ready
	  	var cardImages = [];
	  	if (this.state.cardDecks[0].length > 1) { cardImages.push(this.state.cardDecks[0][1].image); }
	  	if (this.state.cardDecks[1].length > 1) { cardImages.push(this.state.cardDecks[1][1].image); }

	  	preloadImages(cardImages, () => {
				this.startTurn();
	  	});
		});
	}

	startTurn() {

		let stateObj = {};
		stateObj.playerOne = Object.assign({}, this.state.playerOne);
		stateObj.playerTwo = Object.assign({}, this.state.playerTwo);

		var activePlayerState = this.state.playerOneTurn ? stateObj.playerOne : stateObj.playerTwo;

		// If player is asleep and it's their turn
		if (activePlayerState.asleep) {

			activePlayerState.speechBubble.visible = true;
			activePlayerState.speechBubble.content = 'Zzzzz...';

			this.setState( stateObj, () => {
				setTimeout(() => { // 2500

					activePlayerState.turnsAsleep++;

					// 1 in 4 chance of waking up on first turn asleep, then 1 in 2 chance of waking up on subsequent turns
					var wokeUp = activePlayerState.turnsAsleep < 2 ? calculateChance(3) : calculateChance(2);

					if (wokeUp || activePlayerState.turnsAsleep > 3) { 

						// Wake player up
						activePlayerState.asleep = false;
						activePlayerState.turnsAsleep = 0;
						activePlayerState.speechBubble.visible = false;

						this.setState( stateObj, () => {
							activePlayerState.speechBubble.content = 'I woke up!';
							setTimeout(() => { // 1000

								activePlayerState.speechBubble.visible = true;

								this.setState( stateObj, () => {
									setTimeout(() => { 
										// Hide speech bubble
										activePlayerState.speechBubble.visible = false;
										this.setState( stateObj, () => {
											setTimeout(() => { 
											// this.swapTurn();
											this.startTurn();
											}, 300);
										});
									}, 2500);
								});

							}, 1000);

						});

					} else {
						this.setState( stateObj, () => {
							this.swapTurn();
						});
					}

				}, 2500);
			});

		} else { // Player isn't asleep on their turn

			if (this.state.cpuPlayer && !this.state.playerOneTurn) {
					// Display 'thinking' speech bubble
					activePlayerState.speechBubble.visible = true;
					activePlayerState.speechBubble.thoughtBubble = true;
					activePlayerState.speechBubble.content = '???';
					stateObj.cpuThinking = true;
					this.setState( stateObj, () => {

						var attack = selectCpuAttack(this.state.cardDecks[1][0], this.state.cardDecks[1], this.state.cardDecks[0][0], this.state.cardDecks[0], this.state.playerOne.asleep, this.state.graveyard);

						activePlayerState.speechBubble.visible = false;
						stateObj.cpuThinking = false;
						setTimeout(() => {

							this.setState( stateObj, () => {
								setTimeout(() => {

									activePlayerState.speechBubble.thoughtBubble = false; // Reset to standard speech bubble after speech bubble is hidden
									this.setState( stateObj, () => {
										this.handleClick(attack, attack.index);
									});

								}, 300);
							});

						}, 1500);

					});
			} else {
				// Enable active player's card
				activePlayerState.turnOpen = true;
				this.setState( stateObj );
			}

		}
	}

	swapTurn() {

		var turn = !this.state.playerOneTurn;

		this.findBombs({}, () => {
			setTimeout(() => { 
				this.setState({ playerOneTurn: turn }, () => {
					this.startTurn();
				});
			}, 1500);
		});
	}

	handleClick(attack, attackIndex) {
		// TODO: Offset all attack logic to separate function - handleAttack() or calculateAttack()
		// ... to be used during cpuTurn after selectCpuAttack() (using the return value from this function)
		if (attack == 'SWAP') {
			this.swapCard();

		} else {

			var stateObj = {},
			// playerOneState = JSON.parse(JSON.stringify(this.state.playerOne)), // Deep copies of player states
			// playerTwoState = JSON.parse(JSON.stringify(this.state.playerTwo)),
			cardDecks = JSON.parse(JSON.stringify(this.state.cardDecks)); // Deep copy of card deck states

			// stateObj.playerOne = playerOneState;
			// stateObj.playerTwo = playerTwoState;
			stateObj.playerOne = Object.assign({}, this.state.playerOne);
			stateObj.playerTwo = Object.assign({}, this.state.playerTwo);

			var attackingPlayerState = this.state.playerOneTurn ? stateObj.playerOne : stateObj.playerTwo,
					defendingPlayerState = this.state.playerOneTurn ? stateObj.playerTwo : stateObj.playerOne,
					playerOneDeck = cardDecks[0],
					playerTwoDeck = cardDecks[1],
					attackingDeck = this.state.playerOneTurn ? playerOneDeck : playerTwoDeck,
					defendingDeck = this.state.playerOneTurn ? playerTwoDeck : playerOneDeck,
					attackingCard = this.state.playerOneTurn ? playerOneDeck[0] : playerTwoDeck[0],
					defendingCard = this.state.playerOneTurn ? playerTwoDeck[0] : playerOneDeck[0];

			stateObj.cardDecks = [playerOneDeck, playerTwoDeck]; // Add decks to setState object

			// Highlight 'selected' attack button / disable attacker's card
			attackingCard.attacks[attackIndex].selected = true;
			attackingPlayerState.turnOpen = false;
			// Display card's battlecry
			attackingPlayerState.speechBubble.visible = true;
			attackingPlayerState.speechBubble.content = attackingCard.battlecry;

			this.setState( stateObj, () => {
				setTimeout(() => { // 2000ms

					// Remove 'selected' highlight from attack button / hide battlecry
					attackingCard.attacks[attackIndex].selected = false;
					attackingPlayerState.speechBubble.visible = false;

					this.setState( stateObj, () => {

						// Reduce attacking card's attack 'amount'
						if (attack.amount !== 'INFINITE') {
							attackingCard.attacks[attackIndex].amount = attackingCard.attacks[attackIndex].amount - 1;
						}

						// Handle damage
						if (attack.effect == 'DAMAGE') {

							this.checkForBombAttack(attackingCard, () => {

								this.applyCardDamage(attack, (attackResult) => {

									this.checkForDeadCard(attackResult, () => {
										
										this.drawNextCards(() => {

											this.checkForWinner(() => {
												this.swapTurn();
											});
										})
									});
								});
							});
						}
						if (attack.effect == 'SLEEP') {

							defendingPlayerState.sleepPulse = true;

							this.setState( stateObj, () => {
								setTimeout(() => { // 4000 ms

									defendingPlayerState.sleepPulse = false;

									this.setState( stateObj, () => {

										defendingPlayerState.asleep = true;
										defendingPlayerState.turnsAsleep = 0;

										setTimeout(() => { // Timeout required due to bug in Chrome where removing/adding class at same time doesn't trigger the required transition animation

											this.setState( stateObj, () => {
												setTimeout(() => {

													defendingPlayerState.speechBubble.content = 'Zzzzz...';
													defendingPlayerState.speechBubble.visible = true;
													this.setState( stateObj, () => {
														this.swapTurn();
													});

												}, 500);
											});

										}, 1);

									});

								}, 4000);
							});
						}
						if (attack.effect == 'DETONATE') {
							var defendingDeckIndex = this.state.playerOneTurn ? 1 : 0;

							this.findBombs({detonate: true, index: defendingDeckIndex}, () => {
								this.swapTurn();
							});
						}
						if (attack.effect == 'DISMISS') {  
							this.swapCard(true);
						}
						if (attack.effect == 'RESURRECT') {

							// Remove random card from graveyard array
							var graveyardArray = this.state.graveyard;
							var randomCard = getRandomArrayItem(graveyardArray);
							graveyardArray.splice(randomCard.index, 1);
							stateObj.graveyard = graveyardArray;
							randomCard.item.energy = 50; // Set random card to half energy

							// Deck card animation
							attackingPlayerState.slideDown = true;

							this.setState( stateObj, () => {
								setTimeout(() => {

									attackingPlayerState.slideDown = false;
									// Add random card to current player's deck
									attackingDeck.push(randomCard.item);

									this.setState( stateObj, () => {
										this.swapTurn();
									});

								}, 600);
							});

						}
						if (attack.effect == 'BOMB') {

							// Choose random deck and random position in this deck
							if (calculateChance(2)) {
								var targetDeck = playerOneDeck;
								var targetPlayerState = stateObj.playerOne;
							} else {
								var targetDeck = playerTwoDeck;
								var targetPlayerState = stateObj.playerTwo;
							}
							var randDeckIndex = Math.floor(Math.random()*targetDeck.length);
							randDeckIndex = randDeckIndex == 0 ? randDeckIndex = 1 : randDeckIndex; // Adjust index if non-deck card index chosen ie. the drawn card at index 0

							// Create UNIQUE bomb card
							var bombCard = {
								number: '10' + this.state.bombKey,
							  code: 'BOMB',
							  name: 'Bomb',
							  attacks: [{type:'PRIMARY',effect:'DAMAGE',name:'BOMB',power:70,missChance:0,amount:1,label:'Explode',description:'Throw a bomb at your opponent'}],
							  energy: 100,
							  damageFactor: 1,
							  asleep: false,
							  blastImminent: false,
							  battlecry: '3...2...1...',
							  deathcry: 'Boom!',
							  image: 'img/bomb.png'
							};

							// deckCard animationCard animation
							targetPlayerState.slideDown = true;

							this.setState( stateObj, () => {
								setTimeout(() => {

									targetPlayerState.slideDown = false;
									// Insert bomb card into chosen deck at the chosen position
									targetDeck.splice(randDeckIndex, 0, bombCard);
									// Increment unique key for bomb card
									stateObj.bombKey = this.state.bombKey;
									stateObj.bombKey++;

									this.setState( stateObj, () => {
										this.swapTurn();
									});

								}, 600);
							});
						}
						if (attack.effect == 'TEAMHEAL') {

							attackingPlayerState.deckHeal = true;
							// TOO: Move this to separate function, rather than polluting this function with var i and extra code
							for (var i = 1; i < attackingDeck.length; i++) { // i = 1 because the drawn card at index 0 isn't in the deck
									attackingDeck[i].energy = attackingDeck[i].energy + 20;
									if (attackingDeck[i].energy > 100) {
										attackingDeck[i].energy = 100;
									}
							}
							this.setState( stateObj, () => {
								setTimeout(() => {

									attackingPlayerState.deckHeal = false;
									this.setState( stateObj, () => {
										this.swapTurn();
									});
								}, 4000);
							});
						}

					});

				}, 2000);
			});

		// TODO: Create new <AttackAnimation> class (sits in .cardContainer? ) and use this to display the various attack graphics over the targetCard... 
		// ...triggers a global setState value ( attackAnimation: { visible: true, etc } ), which itself is based on 'attack.effect' and 'attack.power'
		}
	}

	swapCard(dismiss) {

		let stateObj = {};
		var decks = JSON.parse(JSON.stringify(this.state.cardDecks)),
				activePlayerState,
				activeDeck;

		stateObj.cardDecks = decks;

		if ((this.state.playerOneTurn && !dismiss) || (!this.state.playerOneTurn && dismiss)) {
			activePlayerState = stateObj.playerOne = Object.assign({}, this.state.playerOne);
			activeDeck = stateObj.cardDecks[0];
		} else {
			activePlayerState = stateObj.playerTwo = Object.assign({}, this.state.playerTwo);
			activeDeck = stateObj.cardDecks[1];
		}

		activePlayerState.turnOpen = false; // Disable and hide card
		activePlayerState.showCard = false;
		activePlayerState.asleep = false; // Reset any sleep states associated with player
		activePlayerState.turnsAsleep = 0;
		activePlayerState.speechBubble.visible = false; // ... and hide speech bubble if visible

		this.setState( stateObj, () => {
			setTimeout(() => {
				activeDeck.push(activeDeck.shift()); // Move first card to back of deck

				this.setState( stateObj, () => {
					activePlayerState.showCard = true; // Show card again

					this.setState( stateObj, () => {
						this.swapTurn();
						// Preload next card image ready
						if (activeDeck.length > 1) {
					  	var cardImages = [
					  		activeDeck[1].image
					  	];
				  		preloadImages(cardImages);
				  	}
					});
				});

			}, 600);
		});
	}

	applyCardDamage(attack, callback) {

		let stateObj = {};
		stateObj.playerOne = Object.assign({}, this.state.playerOne);
		stateObj.playerTwo = Object.assign({}, this.state.playerTwo);

		var defendingPlayerState = this.state.playerOneTurn ? stateObj.playerTwo : stateObj.playerOne,
				cardDecks = JSON.parse(JSON.stringify(this.state.cardDecks)),
				defendingDeck = this.state.playerOneTurn ? cardDecks[1] : cardDecks[0],
				defendingCard = this.state.playerOneTurn ? cardDecks[1][0] : cardDecks[0][0];

		stateObj.cardDecks = [cardDecks[0], cardDecks[1]];

		defendingPlayerState.cardDamage = true;

		this.setState( stateObj, () => {

			// Reduce defending card's 'energy' and stop card flashing
			defendingCard.energy = defendingCard.energy - (attack.power * defendingCard.damageFactor);
			if (defendingCard.energy < 0) {
				defendingCard.energy = 0;
			}
			defendingPlayerState.cardDamage = false;

			setTimeout(() => { // 2000
				this.setState( stateObj, () => {
					if (callback) {
						callback(defendingCard);
					}
				});
			}, 2000);

		});
	}

	checkForDeadCard(card, callback) {

		if (card.energy == 0) {

			var deckIndex = this.state.playerOneTurn ? 1 : 0, // TODO: Pass this as a parameter 'deckIndex' ?
					stateObj = {};

			stateObj.playerOne = Object.assign({}, this.state.playerOne);
			stateObj.playerTwo = Object.assign({}, this.state.playerTwo);
			var defendingPlayerState = this.state.playerOneTurn ? stateObj.playerTwo : stateObj.playerOne;

			// Reset any states associated with the defending player
			defendingPlayerState.asleep = false;
			defendingPlayerState.turnsAsleep = 0;
			this.setState( stateObj, () => {

				this.removeCurrentCard(deckIndex, true, () => {
			  	if (callback) {
			  		callback();
			  	}
			  });
			});

		} else {
			if (callback) {
				callback();
			}
		}
	}

	removeCurrentCard(deckIndex, graveyard, callback) {

		var decks = JSON.parse(JSON.stringify(this.state.cardDecks)),
				stateObj = {};

		stateObj.cardDecks = decks;
		stateObj.playerOne = Object.assign({}, this.state.playerOne);
		stateObj.playerTwo = Object.assign({}, this.state.playerTwo);

		var deck = stateObj.cardDecks[deckIndex],
				currentCard = deck[0],
				playerState = deckIndex == 0 ? stateObj.playerOne : stateObj.playerTwo;

		playerState.speechBubble.visible = true;
		playerState.speechBubble.content = currentCard.deathcry;

		this.setState( stateObj, () => {
			setTimeout(() => { // 2500

				playerState.speechBubble.visible = false;
		  	playerState.slideUp = true;

		  	this.setState( stateObj, () => {
					setTimeout(() => { // 600

						// Reset card's animation states, ready to show again
						playerState.showCard = false;
						playerState.slideUp = false;

						if (graveyard) {
							// Send dead card to graveyard
							var graveyardArray = this.state.graveyard.slice(); // Shallow copy of array
							graveyardArray.push(currentCard);
							stateObj.graveyard = graveyardArray;
						}

						this.setState( stateObj, () => {
							if (callback) {
								callback();
							}
				  	});

			  	}, 600);
			  });

			}, 2500);
		});
	}

	drawNextCards(callback) {

		var decks = JSON.parse(JSON.stringify(this.state.cardDecks)),
				stateObj = {};

		stateObj.cardDecks = decks;
		stateObj.playerOne = Object.assign({}, this.state.playerOne);
		stateObj.playerTwo = Object.assign({}, this.state.playerTwo);

		function loadNextCard(deck, playerState, callback) {
			if (!playerState.showCard) {
				// Remove card from deck
				deck.splice(0, 1);
				if (deck.length > 0) {
					playerState.showCard = true;
				}
				if (deck.length > 1) {
					// Preload images
					var cardImages = [
			  		deck[1].image
			  	];
		  		preloadImages(cardImages);
				}
			}
			if (callback) {
				callback();
			}
		}
		
		if (!stateObj.playerOne.showCard || !stateObj.playerTwo.showCard) {

			loadNextCard(stateObj.cardDecks[0], stateObj.playerOne, () => {
				loadNextCard(stateObj.cardDecks[1], stateObj.playerTwo, () => {

					setTimeout(() => { // 600
						this.setState( stateObj, () => {
								if (callback) {
									callback();
								}
						});
					}, 600);
				});
			});
			
		} else {
			if (callback) {
				callback();
			}
		}
	}

	checkForBombAttack(card, callback) {

		if (card.code == 'BOMB') {

			var deckIndex = this.state.playerOneTurn ? 0 : 1;
			this.removeCurrentCard(deckIndex, false, () => {
		  	if (callback) {
		  		callback();
		  	}
			});

		} else {
			if (callback) {
				callback();
			}
		}
	}

	// Check each deck looking for / detonating bombs
	findBombs(options, callback) {

		var decksCopy = JSON.parse(JSON.stringify(this.state.cardDecks)),
				detonate = options.detonate || false,
				deckIndex = options.index || 0;
		
		if (detonate) {
			this.loopDeck(decksCopy[deckIndex], deckIndex, detonate, () => {
	    	if (callback) {
	      	callback();
	      }
	    });

		} else {
			this.loopDeck(decksCopy[deckIndex], deckIndex, detonate, () => {
		    deckIndex++;
		    this.loopDeck(decksCopy[deckIndex], deckIndex, detonate, () => {
		    	if (callback) {
		      	callback();
		      }
		    });
		  });
		}
	}

	loopDeck(arr, deckIndex, detonate, callback) {

	  var i = 1, // Ignore drawn card, so i = 1
	 			indexAdjustment = 0;

	  const doALoop = () => {

	  	var adjustedIndex = i - indexAdjustment;

	    this.checkForBomb(arr[i], deckIndex, adjustedIndex, detonate, function(result) {
	    	if (result) {
	    		indexAdjustment++;
	    	}

	      i++;
	      if (i < arr.length) {
	        doALoop();   
	      } else {
	        if (callback) {
	          callback();
	        }
	      }
	    }); 
	  }
	  if (arr.length > 1) {
	  	doALoop();
	  } else {
	    if (callback) {
	  		callback();
	  	}
	  }
	}

	checkForBomb(card, deckIndex, adjustedIndex, detonate, callback) {

		var decks = JSON.parse(JSON.stringify(this.state.cardDecks)),
				playerKey = deckIndex == 0 ? 'playerOne' : 'playerTwo',
				stateObj = {},
				result = false;

		stateObj.cardDecks = decks;
		stateObj.playerOne = Object.assign({}, this.state.playerOne);
		stateObj.playerTwo = Object.assign({}, this.state.playerTwo);

	  if (card.code == 'BOMB' && (calculateChance(8) || detonate)) {
			result = true;
			stateObj.cardDecks[deckIndex][adjustedIndex].blastImminent = true;
			stateObj[playerKey].blastImminent = true;

			this.setState( stateObj, () => {
				setTimeout(() => { // 3000 ms

					stateObj.cardDecks[deckIndex][adjustedIndex].blastImminent = false;
					stateObj[playerKey].blastImminent = false;
		  		// Remove exploded bomb card from deck array and start deck flashing
		  		stateObj.cardDecks[deckIndex].splice(adjustedIndex, 1);
		  		stateObj[playerKey].deckDamage = true;

					this.setState( stateObj, () => {
						setTimeout(() => { 

							// Reduce energy of all deck cards by 20
							// TODO: Could check card 'energy' after reduction and, if == 0, call new function removeDeckCard, which does the animation of a card leaving the deck vertically, then immediately removes the card from deck
							for (var i = 1; i < stateObj.cardDecks[deckIndex].length; i++) { // Ignore drawn card, so i = 1
								stateObj.cardDecks[deckIndex][i].energy = stateObj.cardDecks[deckIndex][i].energy - 20;
								if (stateObj.cardDecks[deckIndex][i].energy <= 0) {
									stateObj.cardDecks[deckIndex][i].energy = 10;
								}
							}
							// Stop deck flashing
		  				stateObj[playerKey].deckDamage = false;

							this.setState( stateObj, () => {
								callback(result);
							});

						}, 2000);
					});
				}, 3000);
			});

		} else {
			if (callback) {
				callback(result);
			}
		}
	}

	checkForWinner(callback) {

		var stateObj = {},
				playerOneWin = this.state.cardDecks[1].length < 1 ? true : false,
				playerTwoWin = this.state.cardDecks[0].length < 1 ? true : false,
				drawCondition = this.state.cardDecks[0].length < 1 && this.state.cardDecks[1].length < 1 ? true : false,
				winnerModal;

		if (playerOneWin || playerTwoWin || drawCondition) {

			if (playerOneWin) {
				winnerModal = this.state.cpuPlayer ? { heading: 'You WIN!!', subheading: 'You\'re getting good at this!' } :
											{ heading: 'Player 1 WINS!!', subheading: 'Well played!' };
			}
			if (playerTwoWin) {
				winnerModal = this.state.cpuPlayer ? { heading: 'CPU WINS!!', subheading: 'Better luck next time!' } :
											{ heading: 'Player 2 WINS!!', subheading: 'Well played!' };
			}
			if (drawCondition) {
				winnerModal = { heading: 'Draw!', subheading: 'After all that, it\'s a draw.' };
			}

			stateObj.modal = {
				visible: true,
		  	heading: winnerModal.heading,
	    	subHeading: winnerModal.subheading,
	    	paragraph: 'Play again?',
	    	button: 'PLAY AGAIN',
		  	startGame: true
			};

			setTimeout(() => {			
				this.setState( stateObj );
			}, 500);

		} else {
			if (callback) {
				callback();
			}
		}
	}

	hideModal() {
		this.setState({ modal: {visible: false} });
	}

	render() {
		return (
			<div>
				<LoadingModal visible={this.state.loading} />
				<Modal info={this.state.modal}
				onClick={this.state.modal.startGame ? this.startGame : this.setupFirstTurn} />
				<div className='header'>
					<h1 className='logo'>BATTLE<span>CARDS</span></h1>
				</div>
				<div className='gameBoard'>
					{this.renderCards()}
				</div>
			</div>
		);
	}
}

export default class App extends React.Component {
	render() {
		return (
			<Game />
		);
	}
}

// =======================================
// Helper functions

function isEven(n) {
	return n % 2 == 0;
}

function shuffleCards() { // TODO: Pass 'cards' in here as a param?

	const playerOneDeck = [], playerTwoDeck = [];
	const cardsCopy = cards.slice(0); // Shallow copy of cards array

	for (var count = 0; count < cards.length; count++) {
	  // Select a random card
	  var randomCard = cardsCopy[Math.floor(Math.random()*cardsCopy.length)];

	  if (isEven(count)) {
	    playerOneDeck.push(randomCard);
	  } else {
	    playerTwoDeck.push(randomCard);
	  }
	  // Get index of the selected random card
	  var index = cardsCopy.indexOf(randomCard);
	  // ... and remove from initial deck
	  cardsCopy.splice(index, 1);
  }

	return [playerOneDeck, playerTwoDeck];
}

function calculateChance(odds) {
	var randNum = Math.random(),
			chance = 1 / odds;

	if (randNum < chance) {
		return true;
	} else {
		return false;
	}
}

function preloadImages(imgUrls, callback) {

	if (imgUrls.length < 1) { // If no images in array
		callback();
	} else {

		var imageCount = imgUrls.length,
		images = [],
		imagesLoaded = 0;

		for (var i = 0; i < imageCount; i++) {
			images[i] = new Image();

	    images[i].onload = function() {
	    	// console.log('Loaded: ',images[imagesLoaded].src.toString());
	      imagesLoaded++;
	      if (imagesLoaded == imageCount) {
	      	if (callback) {
	        	callback();
	        }
	      }
	    }
	    // TODO: Implement error handling
	    // img.onerror = function() {};
			images[i].src = imgUrls[i];
		}
	}
}

function getAvailableAttacks(attacksArr) {
	var availableAttacks = [];
	var flags = [{
		specialAvailable: false, 
		resurrectAvailable: false, 
		sleepAvailable: false, 
		dismissAvailable: false, 
		detonateAvailable: false
	}];

	for (var i = 0; i < attacksArr.length; i++) {
		if (attacksArr[i].amount > 0 || attacksArr[i].amount == 'INFINITE') {
			attacksArr[i].index = i;
			availableAttacks.push(attacksArr[i]);
			if (attacksArr[i].type == 'SPECIAL') { flags.specialAvailable = true; }
			if (attacksArr[i].effect == 'RESURRECT') { flags.resurrectAvailable = true; }
			if (attacksArr[i].effect == 'SLEEP') { flags.sleepAvailable = true; }
			if (attacksArr[i].effect == 'DISMISS') { flags.dismissAvailable = true; }
			if (attacksArr[i].effect == 'DETONATE') { flags.detonateAvailable = true; }
		}
	}
	return {attacks: availableAttacks, flags: flags};
}

function selectCpuAttack(cpuCard, cpuDeck, playerCard, playerDeck, opponentAsleep, graveyard) {
	// TODO: Could be useful to set a 'bombInDeck' variable, so:
	// - CPU can keep swapping cards in order to draw a bomb card
	// - CPU can use Detonate x

	var availableCpuAttacks = getAvailableAttacks(cpuCard.attacks),
			availablePlayerAttacks = getAvailableAttacks(playerCard.attacks),
			chosenAttack = {},
			nextCpuCardIsBomb = false,
			nextPlayerCardIsBomb = false,
			bombInCpuDeck = false,
			bombInPlayerDeck = false,
			cpuDeckDamaged = false;

			// if (cpuDeck.length > 1) { nextCpuCardIsBomb = cpuDeck[1].code == 'BOMB' ? true : false; }
			// if (playerDeck.length > 1) { nextPlayerCardIsBomb = playerDeck[1].code == 'BOMB' ? true : false; }
			if (cpuDeck.length > 1) {
				nextCpuCardIsBomb = cpuDeck[1].code == 'BOMB' ? true : false;

				for (var i = 1; i < cpuDeck.length; i++) {
					if (cpuDeck[i].code == 'BOMB') {
						bombInCpuDeck = true;
					}
					if (cpuDeck[i].energy < 100) {
						cpuDeckDamaged = true; // Use to help CPU know whether to use TEAMHEAL
					}
				}
			}
			if (playerDeck.length > 1) {
				nextPlayerCardIsBomb = playerDeck[1].code == 'BOMB' ? true : false;

				for (var j = 1; j < playerDeck.length; j++) {
					if (playerDeck[j].code == 'BOMB') {
						bombInPlayerDeck = true;
					}
				}
			}

	var swapBool = cpuDeck.length > 1 && !(playerCard.code == 'BOMB' && availableCpuAttacks.flags.dismissAvailable) &&
								(
									(nextCpuCardIsBomb && cpuCard.code !== 'BOMB' && !availablePlayerAttacks.flags.dismissAvailable) || 
									(availableCpuAttacks.flags.resurrectAvailable && graveyard.length < 1) || 
									(playerCard.code == 'BOMB' && opponentAsleep && playerCard.energy >= 40 && !availableCpuAttacks.flags.dismissAvailable)
								);

	if (swapBool) {
		chosenAttack = 'SWAP';

	} else {
		for (var i = 0; i < availableCpuAttacks.attacks.length; i++) {

			var sleepChoiceOpen = availableCpuAttacks.attacks[i].effect == 'SLEEP' && !opponentAsleep  && playerCard.energy > 15 && 
														!(playerCard.code == 'BOMB' && availableCpuAttacks.flags.dismissAvailable),
					detonateChoiceOpen = availableCpuAttacks.attacks[i].effect == 'DETONATE' && chosenAttack.effect !== 'SLEEP' && bombInPlayerDeck,
					dismissChoiceOpen = availableCpuAttacks.attacks[i].effect == 'DISMISS' && chosenAttack.effect !== 'SLEEP' && chosenAttack.effect !== 'DETONATE' && 
															playerDeck.length > 1 && playerCard.energy > 15 && 
															(
																playerCard.code == 'BOMB' || 
																(nextCpuCardIsBomb && !nextPlayerCardIsBomb && availablePlayerAttacks.flags.dismissAvailable) || 
																(chosenAttack.type !== 'SPECIAL' && !nextPlayerCardIsBomb && !opponentAsleep && playerCard.energy > 15 && availablePlayerAttacks.flags.resurrectAvailable && graveyard.length > 0) || 
																bombInCpuDeck && availablePlayerAttacks.flags.detonateAvailable && (!nextPlayerCardIsBomb || cpuDeck.length > 4)
															),
					teamHealChoiceOpen = availableCpuAttacks.attacks[i].effect == 'TEAMHEAL' && chosenAttack.effect !== 'SLEEP' && chosenAttack.effect !== 'DETONATE' && chosenAttack.effect !== 'DISMISS' && cpuDeckDamaged && !(availableCpuAttacks.attacks[i].effect == 'RESURRECT' && graveyard.length > 0 && 
						cpuDeck.length < 5),
					specialChoiceOpen = availableCpuAttacks.attacks[i].type == 'SPECIAL' && chosenAttack.effect !== 'SLEEP' && chosenAttack.effect !== 'DETONATE' && chosenAttack.effect !== 'DISMISS' && chosenAttack.effect !== 'TEAMHEAL' && (!nextCpuCardIsBomb || !availableCpuAttacks.flags.dismissAvailable),
					specialDamageAllowed = availableCpuAttacks.attacks[i].effect == 'DAMAGE' && playerCard.energy > 15,
					resurrectAllowed = availableCpuAttacks.attacks[i].effect == 'RESURRECT' && graveyard.length > 0,
					bombAllowed = availableCpuAttacks.attacks[i].effect == 'BOMB' /* && !availablePlayerAttacks.flags.detonateAvailable */;

			if (sleepChoiceOpen) {
				chosenAttack = availableCpuAttacks.attacks[i];
			}
			else if (detonateChoiceOpen) {
				chosenAttack = availableCpuAttacks.attacks[i];
			}
			else if (dismissChoiceOpen) {
				chosenAttack = availableCpuAttacks.attacks[i];
			}
			else if (teamHealChoiceOpen) {
				chosenAttack = availableCpuAttacks.attacks[i];
			}
			else if (specialChoiceOpen && (specialDamageAllowed || resurrectAllowed || bombAllowed)) {
				chosenAttack = availableCpuAttacks.attacks[i];
			}
			else {
				// If primary attack is available and a secondary attack hasn't already been chosen
				if (availableCpuAttacks.attacks[i].type == 'PRIMARY' && chosenAttack.type !== 'SECONDARY') {
					// If a primary attack hasn't already been chosen
					if (chosenAttack.type !== 'PRIMARY') {
						// Choose this primary attack (for now)
						chosenAttack = availableCpuAttacks.attacks[i];
					} else {
						// If primary attack is current choice, but this primary attack is more powerful, and the enemy player has more than 15 energy left
						if (chosenAttack.type == 'PRIMARY' && availableCpuAttacks.attacks[i].power > chosenAttack.power && playerCard.energy > 15) {
							// Choose more powerful promary attack instead
							chosenAttack = availableCpuAttacks.attacks[i];
						}
					}
				}
			}
		}

	}
	return chosenAttack;
}

function getRandomArrayItem(arr) {
	var index = Math.floor(Math.random()*arr.length);
	var item = arr[index];
	return {item: item, index: index};
}

function calculateDamage() {
	// return 'MISS' if attack misses (use 'missChance' in combination with Math.random somehow)
	// ...otherwise a num value based on 'power' 'energy' and 'damageFactor'
}