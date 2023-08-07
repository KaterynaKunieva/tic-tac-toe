import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


function Square({ value, onSquareClick }) {
  // const [value, setValue] = useState(null)
  // function handleClick() {
  //   setValue("X")
  // }
  return <button
        className='square'
        onClick={onSquareClick}>
            {value}
        </button> 
}

function Board({ currentMove, squares, onPlay }) { 
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]; 
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      // squares[i] -- поточна ячейка 
      return;
    }
    const nextSquares = squares.slice()
    if (currentMove % 2 === 0) {
      nextSquares[i] = "X"  
    } else {
      nextSquares[i] = "O" 
    }
    onPlay(nextSquares) 
  }
  
  const winner = calculateWinner(squares)
  let status 
  
  if (winner) {
    status = 'Winner: ' + winner
  } else {
    status = 'Next player: ' + (currentMove % 2 === 0 ? 'X': 'O')
  }

  return (
    <>
      <div className='status'> { status } </div>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div> 
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
  )
}


function Game() { 
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)  
  const currentSquares = history[currentMove]
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory) 
    setCurrentMove(nextHistory.length - 1) 
  }
  function jumpTo(nextMove) {
    setCurrentMove(nextMove) 
  }
  const moves = history.map((squares, move) => {
    // current value - squares
    // index - move
    let description; 
    if (move > 0) {
      // move не 0 
      description = 'Go to move # ' + move
    } else {
      description = 'Go to game start'
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{ description }</button>
      </li>
    )
  })
  return (
    <div className='game'>
      <div className='game-board'>
        <Board currentMove={currentMove} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className='game-info'>
        <ol>
          { moves }
        </ol>
      </div>
    </div>
  )
}

export default Game; // This tells your index.js file to use the Game component as the top-level component 