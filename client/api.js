// TODO: Put all calls to backend api here
// For now, simply export card JSON and any other object data from here

export const cards = [
{
  "number": "001",
  "code": "JEANLUCPICARD",
  "name": "Jean-Luc Picard",
  "attacks": [
    {"type":"PRIMARY","effect":"DAMAGE","name":"JAB","power":15,"missChance":5,"amount":"INFINITE","label":"Jab","description":"A swift jab to the face"},
    {"type":"PRIMARY","effect":"DAMAGE","name":"FLURRY","power":35,"missChance":10,"amount":2,"label":"Flurry","description":"A flurry of punches to the face"},
    {"type":"SECONDARY","effect":"DETONATE","name":"DETONATE","power":0,"missChance":0,"amount":"INFINITE","label":"Detonate","description":"Detonate all bomb cards in your opponent's deck"},
    {"type":"SPECIAL","effect":"BOMB","name":"BOMB","power":0,"missChance":0,"amount":2,"label":"Bomb","description":"Place a BOMB CARD at random into either player's deck. BOMB CARD: 1/8 Chance of exploding each turn, dealing damage to all other cards in the deck."}
  ],
  "energy": 100,
  "damageFactor": 1.2,
  "asleep": false,
  "battlecry": "Make it so",
  "deathcry": "Wesley!!.....",
  "image": "img/picard.jpg"
},
{
  "number": "002",
  "code": "JEFFGOLDBLUM",
  "name": "Jeff Goldblum",
  "attacks": [
    {"type":"PRIMARY","effect":"DAMAGE","name":"JAB","power":15,"missChance":5,"amount":"INFINITE","label":"Jab","description":"A swift jab to the face"},
    {"type":"PRIMARY","effect":"DAMAGE","name":"FLURRY","power":35,"missChance":10,"amount":3,"label":"Flurry","description":"A flurry of punches to the face"},
    {"type":"SECONDARY","effect":"DETONATE","name":"DETONATE","power":0,"missChance":0,"amount":"INFINITE","label":"Detonate","description":"Detonate all bomb cards in your opponent's deck"},
    {"type":"SPECIAL","effect":"BOMB","name":"BOMB","power":0,"missChance":0,"amount":2,"label":"Bomb","description":"Place a BOMB CARD at random into either player's deck. BOMB CARD: 1/8 Chance of exploding each turn, dealing damage to all other cards in the deck."}
  ],
  "energy": 100,
  "damageFactor": 1.1,
  "asleep": false,
  "battlecry": "Life, uh... finds a way...",
  "deathcry": "I'm, uh... dead",
  "image": "img/goldblum.jpg"
},
{
  "number": "003",
  "code": "MORGANFREEMAN",
  "name": "Morgan Freeman",
  "attacks": [
      {"type":"PRIMARY","effect":"DAMAGE","name":"JAB","power":15,"missChance":5,"amount":"INFINITE","label":"Jab","description":"A swift jab to the face"},
      {"type":"PRIMARY","effect":"DAMAGE","name":"FLURRY","power":35,"missChance":10,"amount":3,"label":"Flurry","description":"A flurry of punches to the face"},
      {"type":"SECONDARY","effect":"TEAMHEAL","name":"TEAMHEAL","power":0,"missChance":0,"amount":2,"label":"Heal Team","description":"Give each card in your deck +15 energy"},
      {"type":"SPECIAL","effect":"RESURRECT","name":"RESURRECT","power":0,"missChance":0,"amount":2,"label":"Resurrect","description":"Resurrect a random card from the Graveyard"}
  ],
  "energy": 100,
  "damageFactor": 1.4,
  "asleep": false,
  "battlecry": "I'm the one. The Divine Being. Alpha and Omega.",
  "deathcry": "My time has come",
  "image": "img/freeman.jpg"
},
{
  "number": "004",
  "code": "WILLIAMTRIKER",
  "name": "William T. Riker",
  "attacks": [
      {"type":"PRIMARY","effect":"DAMAGE","name":"JAB","power":15,"missChance":5,"amount":"INFINITE","label":"Jab","description":"A swift jab to the face"},
      {"type":"PRIMARY","effect":"DAMAGE","name":"FLURRY","power":35,"missChance":10,"amount":3,"label":"Flurry","description":"A flurry of punches to the face"},
      {"type":"SECONDARY","effect":"DISMISS","name":"DISMISS","power":0,"missChance":0,"amount":2,"label":"Dismiss","description":"Send your opponent's card back to their deck"},
      {"type":"SPECIAL","effect":"DAMAGE","name":"MEGAPUNCH","power":50,"missChance":0,"amount":2,"label":"Mega Punch","description":"A massive punch to the face and arms"}
  ],
  "energy": 100,
  "damageFactor": 1,
  "asleep": false,
  "battlecry": "My beard is my strength...",
  "deathcry": "You have bested me sir",
  "image": "img/riker.jpg"
},
{
  "number": "005",
  "code": "WILLSMITH",
  "name": "Will Smith",
  "attacks": [
      {"type":"PRIMARY","effect":"DAMAGE","name":"JAB","power":15,"missChance":5,"amount":"INFINITE","label":"Jab","description":"A swift jab to the face"},
      {"type":"PRIMARY","effect":"DAMAGE","name":"FLURRY","power":35,"missChance":10,"amount":5,"label":"Flurry","description":"A flurry of punches to the face"},
      {"type":"SECONDARY","effect":"DISMISS","name":"DISMISS","power":0,"missChance":0,"amount":2,"label":"Dismiss","description":"Send your opponent's card back to their deck"},
      {"type":"SPECIAL","effect":"DAMAGE","name":"MEGAPUNCH","power":50,"missChance":0,"amount":1,"label":"Mega Punch","description":"A massive punch to the face and arms"}
  ],
  "energy": 100,
  "damageFactor": 1,
  "asleep": false,
  "battlecry": "In West Philadelphia, born and raised...",
  "deathcry": "Peace out...",
  "image": "img/willsmith.jpg"
},
{
  "number": "006",
  "code": "SEANBEAN",
  "name": "Sean Bean",
  "attacks": [
      {"type":"PRIMARY","effect":"DAMAGE","name":"JAB","power":15,"missChance":5,"amount":"INFINITE","label":"Jab","description":"A swift jab to the face"},
      {"type":"PRIMARY","effect":"DAMAGE","name":"FLURRY","power":35,"missChance":10,"amount":"INFINITE","label":"Flurry","description":"A flurry of punches to the face"},
      {"type":"SECONDARY","effect":"DETONATE","name":"DETONATE","power":0,"missChance":0,"amount":2,"label":"Detonate","description":"Detonate all bomb cards in your opponent's deck"},
      {"type":"SPECIAL","effect":"DAMAGE","name":"MEGAPUNCH","power":50,"missChance":0,"amount":1,"label":"Mega Punch","description":"A massive punch to the face and arms"}
  ],
  "energy": 100,
  "damageFactor": 1,
  "asleep": false,
  "battlecry": "av that y' bugger...",
  "deathcry": "y' bloody bugger...",
  "image": "img/bean.jpg"
},
{
  "number": "007",
  "code": "PIERCEBROSNAN",
  "name": "Pierce Brosnan",
  "attacks": [
      {"type":"PRIMARY","effect":"DAMAGE","name":"JAB","power":15,"missChance":5,"amount":"INFINITE","label":"Jab","description":"A swift jab to the face"},
      {"type":"PRIMARY","effect":"DAMAGE","name":"FLURRY","power":35,"missChance":10,"amount":4,"label":"Flurry","description":"A flurry of punches to the face"},
      {"type":"SECONDARY","effect":"DETONATE","name":"DETONATE","power":0,"missChance":0,"amount":"INFINITE","label":"Detonate","description":"Detonate all bomb cards in your opponent's deck"},
      {"type":"SPECIAL","effect":"BOMB","name":"BOMB","power":0,"missChance":0,"amount":3,"label":"Bomb","description":"Place a BOMB CARD at random into either player's deck. BOMB CARD: 1/8 Chance of exploding each turn, dealing damage to all other cards in the deck."}
  ],
  "energy": 100,
  "damageFactor": 1,
  "asleep": false,
  "battlecry": "The name's Bond... James Bond",
  "deathcry": "I must be dreaming...",
  "image": "img/brosnan.jpg"
},
{
  "number": "008",
  "code": "ELLENRIPLEY",
  "name": "Ellen Ripley",
  "attacks": [
      {"type":"PRIMARY","effect":"DAMAGE","name":"JAB","power":15,"missChance":5,"amount":"INFINITE","label":"Jab","description":"A swift jab to the face"},
      {"type":"PRIMARY","effect":"DAMAGE","name":"FLURRY","power":35,"missChance":10,"amount":4,"label":"Flurry","description":"A flurry of punches to the face"},
      {"type":"SECONDARY","effect":"DETONATE","name":"DETONATE","power":0,"missChance":0,"amount":"INFINITE","label":"Detonate","description":"Detonate all bomb cards in your opponent's deck"},
      {"type":"SPECIAL","effect":"BOMB","name":"BOMB","power":0,"missChance":0,"amount":3,"label":"Bomb","description":"Place a BOMB CARD at random into either player's deck. BOMB CARD: 1/8 Chance of exploding each turn, dealing damage to all other cards in the deck."}
  ],
  "energy": 100,
  "damageFactor": 1.2,
  "asleep": false,
  "battlecry": "Get away from her you bitch!",
  "deathcry": "Game over man...",
  "image": "img/ripley.jpg"
},
{
  "number": "009",
  "code": "YODA",
  "name": "Yoda",
  "attacks": [
      {"type":"PRIMARY","effect":"DAMAGE","name":"JAB","power":15,"missChance":5,"amount":"INFINITE","label":"Jab","description":"A swift jab to the face"},
      {"type":"SECONDARY","effect":"DISMISS","name":"DISMISS","power":0,"missChance":0,"amount":"INFINITE","label":"Dismiss","description":"Send your opponent's card back to their deck"},
      {"type":"SECONDARY","effect":"SLEEP","name":"HYPNOTIZE","power":0,"missChance":5,"amount":1,"label":"Hypnotize","description":"Put your opponenent to sleep"},
      {"type":"SPECIAL","effect":"RESURRECT","name":"RESURRECT","power":0,"missChance":0,"amount":"INFINITE","label":"Resurrect","description":"Resurrect a random card from the Graveyard"}
  ],
  "energy": 100,
  "damageFactor": 1.5,
  "asleep": false,
  "battlecry": "Do or do not, there is no try...",
  "deathcry": "Death is a natural part of life...",
  "image": "img/yoda.jpg"
},
{
  "number": "010",
  "code": "DARTHVADER",
  "name": "Darth Vader",
  "attacks": [
      {"type":"PRIMARY","effect":"DAMAGE","name":"JAB","power":15,"missChance":5,"amount":"INFINITE","label":"Jab","description":"A swift jab to the face"},
      {"type":"SECONDARY","effect":"DISMISS","name":"DISMISS","power":0,"missChance":0,"amount":"INFINITE","label":"Dismiss","description":"Send your opponent's card back to their deck"},
      {"type":"SECONDARY","effect":"SLEEP","name":"HYPNOTIZE","power":0,"missChance":5,"amount":1,"label":"Hypnotize","description":"Put your opponenent to sleep"},
      {"type":"SPECIAL","effect":"DAMAGE","name":"MEGAPUNCH","power":50,"missChance":0,"amount":"INFINITE","label":"Mega Punch","description":"A massive punch to the face and arms"}
  ],
  "energy": 100,
  "damageFactor": 1,
  "asleep": false,
  "battlecry": "I find your lack of faith disturbing...",
  "deathcry": "Impressive...",
  "image": "img/vader.jpg"
},
{
  "number": "011",
  "code": "DAENERYSTARGARYEN",
  "name": "Daenerys Targaryen",
  "attacks": [
      {"type":"PRIMARY","effect":"DAMAGE","name":"JAB","power":15,"missChance":5,"amount":"INFINITE","label":"Jab","description":"A swift jab to the face"},
      {"type":"SECONDARY","effect":"SLEEP","name":"HYPNOTIZE","power":0,"missChance":5,"amount":3,"label":"Hypnotize","description":"Put your opponenent to sleep"},
      {"type":"SECONDARY","effect":"TEAMHEAL","name":"TEAMHEAL","power":0,"missChance":0,"amount":2,"label":"Heal Team","description":"Give each card in your deck +15 energy"},
      {"type":"SPECIAL","effect":"RESURRECT","name":"RESURRECT","power":0,"missChance":0,"amount":2,"label":"Resurrect","description":"Resurrect a random card from the Graveyard"}
  ],
  "energy": 100,
  "damageFactor": 1.2,
  "asleep": false,
  "battlecry": "I will take what is mine with fire and blood...",
  "deathcry": "No one will take my dragons...",
  "image": "img/daenerys.png"
},
{
  "number": "012",
  "code": "LYRIONLANNISTER",
  "name": "Tyrion Lannister",
  "attacks": [
      {"type":"PRIMARY","effect":"DAMAGE","name":"JAB","power":15,"missChance":5,"amount":"INFINITE","label":"Jab","description":"A swift jab to the face"},
      {"type":"PRIMARY","effect":"DAMAGE","name":"FLURRY","power":35,"missChance":10,"amount":1,"label":"Flurry","description":"A flurry of punches to the face"},
      {"type":"SECONDARY","effect":"DETONATE","name":"DETONATE","power":0,"missChance":0,"amount":"INFINITE","label":"Detonate","description":"Detonate all bomb cards in your opponent's deck"},
      {"type":"SPECIAL","effect":"BOMB","name":"BOMB","power":0,"missChance":0,"amount":"INFINITE","label":"Bomb","description":"Place a BOMB CARD at random into either player's deck. BOMB CARD: 1/8 Chance of exploding each turn, dealing damage to all other cards in the deck."}
  ],
  "energy": 100,
  "damageFactor": 1.5,
  "asleep": false,
  "battlecry": "It’s not easy being drunk all the time. If it were easy, everyone would do it....",
  "deathcry": "Every time we deal with an enemy, we create two more...",
  "image": "img/tyrion.jpg"
}];