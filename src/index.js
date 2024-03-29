/**
  * https://reactjs.org/tutorial/tutorial.html
 * 
 * Display the location for each move in the format (col, row) in the move history list.
 * Bold the currently selected item in the move list. 
 * Rewrite Board to use two loops to make the squares instead of hardcoding them.
 * Add a toggle button that lets you sort the moves in either ascending or descending order.
 * When someone wins, highlight the three squares that caused the win.

Pending Items :-

 * When no one wins, display a message about the result being a draw.
 * Code readable
 * Unit test using Jest

  */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Game} from './components/game';

// ========================================
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);