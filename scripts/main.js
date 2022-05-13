
'use strict'

const Player = (name, symbol) =>  {
  return {name, symbol}
}

const Board = (() => {
  const emptyBoard = new Array(9);

  return {
    emptyBoard
  }
})();

const Game = (() => {
  let players = []
  players.push(Player('p1', 'X'), Player('p2', 'O'));


  const removeElements = () => {
    const gameTitle = document.querySelectorAll('.menu-text');
    const button = document.querySelector('.newgame');

    // gameTitle.remove();
    for (let h1 of gameTitle) {
      h1.remove();
    }
    button.remove();
  }

  const addUserInput = () => {
    const gameBoard = document.querySelector('.gameBoard')
    const userInput = document.createElement('input')
    userInput.classList.add('get-name');
    gameBoard.appendChild(userInput);
  }

  const button = document.querySelector('.newgame');
  button.addEventListener('click', removeElements);
  button.addEventListener('click', addUserInput);


  return {
    players
  }
})();
