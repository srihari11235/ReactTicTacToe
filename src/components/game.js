import React from 'react';
import { Board } from './board';

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(3).fill(null).map(() => new Array(3).fill(null)),
                action: {},
            }],
            isHistoryOrderedDesc: 0,
            stepNumber: 0,
            isXNext: true,
        };
    }

    calculateWinner(squares) {
        const winnerPattern = [
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]],
        ];
        for (let i = 0; i < winnerPattern.length; i++) {
            const [a, b, c] = winnerPattern[i];

            const valA = squares[a[0]][a[1]] ? squares[a[0]][a[1]].value : null;
            const valB = squares[b[0]][b[1]] ? squares[b[0]][b[1]].value : null;
            const valC = squares[c[0]][c[1]] ? squares[c[0]][c[1]].value : null;

            if (valA
                && valA === valB
                && valA === valC) {

                squares[a[0]][a[1]].isWinner = true;
                squares[b[0]][b[1]].isWinner = true;
                squares[c[0]][c[1]].isWinner = true;

                return valA;
            }
        }
        return null;
    }

    toggleOrder() {
        this.setState({
            isHistoryOrderedDesc: !this.state.isHistoryOrderedDesc
        });
    }

    handleClick(row, col) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];
        const squares = JSON.parse(JSON.stringify(current.squares));
        const winner = this.calculateWinner(squares);

        if (winner || squares[row][col.value]) {
            return;
        }

        squares[row][col] = {
            value: this.state.isXNext ? 'X' : 'O'
        };

        this.setState({
            history: history.concat([{
                squares: squares,
                action: {
                    input: squares[row][col].value,
                    clicked: [row, col],
                },
            }]),
            stepNumber: history.length,
            isXNext: !this.state.isXNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            isXNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current.squares);

        const moves = history.map((move, index) => {
            let desc = index ?
                'Go to move #' + index + " - " + history[index].action.input
                + " was placed at " + history[index].action.clicked[0] + ',' + history[index].action.clicked[1] :
                'Go to game start';

            let className = 'link-button';
            if (index === this.state.stepNumber) className += ' bold';

            return (<li key={index} >
                <button type="button" className={className} onClick={() => this.jumpTo(index)} >{desc}</button>
            </li>);
        });

        if (this.state.isHistoryOrderedDesc) {
            moves.sort(function (a, b) {
                return b.key - a.key;
            });
        }

        let status = 'Next player: ' + (this.state.isXNext ? 'X' : 'O');
        if (winner) {
            status = 'Winner: ' + winner;
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(row, col) => this.handleClick(row, col)}
                    />
                </div>
                <div className="game-info">
                    <h3>{status}</h3>
                    <h4>Moves</h4>
                    <button type='button' className='link-button red' onClick={() => this.toggleOrder()}>Sort Moves in {this.state.isHistoryOrderedDesc ? 'ascending' : 'descending'} order</button>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}
