import React from 'react';

function SwapButton(props) { // TODO: Move some of this logic into app.jsx container or Card.jsx, keep button props "dumb" ?
	return (
    <button className='swapButton' onClick={props.onClick} disabled={props.disabled} title='Swap for next card in deck: Costs 1 turn'>
        <span className='arrow'></span>
        <span className='text'>Swap</span>
    </button>
	);
}

export default SwapButton;