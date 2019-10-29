import React from 'react';
import { Square } from './square';

export class Board extends React.Component {

    renderSquare(row, col) {
        const value = this.props.squares[row][col] ? this.props.squares[row][col].value : '';
        const isWinner = this.props.squares[row][col] ? this.props.squares[row][col].isWinner : false;

        return (
            <Square key={row + '' + col}
                isWinner={isWinner}
                value={value}
                onClick={() => this.props.onClick(row, col)}
            />
        );
    }

    render() {
        let board = [];
        for (let row = 0; row < 3; row++) {
            let boardRow = [];
            for (let col = 0; col < 3; col++) {
                boardRow.push(this.renderSquare(row, col));
            }
            board.push(<div key={row} className="board-row">{boardRow}</div>);
        }

        return <div>{board}</div>;
    }
}