import React from 'react';

export function Square(props) {
    let className = 'square';

    if (props.isWinner)
        className += ' green';

    return (
        <button className={className}
            onClick={props.onClick}
            disabled={props.value}>
            {props.value}
        </button>
    );
}