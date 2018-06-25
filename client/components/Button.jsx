import React from 'react';

function Button(props) { // TODO: Move some of this logic into app.jsx container or Card.jsx, keep button props "dumb" ?
	return (
    <button disabled={props.disabled || props.info.amount == 0} 
    className={'button' + ( props.info.type == 'PRIMARY' ? ' primary': '' ) + ( props.info.type == 'SECONDARY' ? ' secondary' : '' ) 
    + ( props.info.type == 'SPECIAL' ? ' special' : '') + ( props.info.selected ? ' selected': '' ) + ( props.info.amount == 0 ? ' used': '' )} 
    title={props.info.description} onClick={props.onClick}>
    {props.info.label}
    <span className={'attackAmount' + (props.info.amount == 'INFINITE' ? ' infinite' : '')}>
    	{(props.info.amount == 'INFINITE' ? '∞' : 'x' + props.info.amount)}
    </span>
    </button>
	);
}

export default Button;