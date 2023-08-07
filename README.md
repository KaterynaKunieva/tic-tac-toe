# ABOUT tic-tac-toe

React components: 
  1. Square (button that accepts value and type of sign)
  2. Board (number of squares and status, that calcs winner and handle clicks)
    - handleClick - if it free and no winner set right sign, else - ignore 
    - onPlay - saving history 
  3. Game (controls values on squares and save history)
    - handlePlay - create history 
    - jumpTo - go to step in history

  History - array of arrays like [null, ..., null], [null, X, ..., null]
  index in History - number of move 
  currentMove equal 2 - X

  currentSquare - current history 
