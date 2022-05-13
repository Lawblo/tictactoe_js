
'use strict'

const Player = (name, symbol) =>  {
  return {name, symbol}
}

const Board = (() => {
  let gameBoard;

  const newBoard = () => {
    gameBoard = Array(9);
  }



  return {
    newBoard
  }
})();

const webElements = (() => {

  const _createButton = (buttonText) => {
    const buttonSquare = document.getElementById('square7');
    const button = document.createElement('button');
    button.classList.add('button');
    button.textContent = buttonText;
    buttonSquare.appendChild(button);
    return button;
  }

  const newGameElements = () => {
    const button = _createButton('new game');
    button.classList.add('newgame')
    button.addEventListener('click', _removeNew);
    button.addEventListener('click', _addUserInput);
  }

  const _removeNew = () => {
    const gameTitle = document.querySelectorAll('.menu-text');
    const button = document.querySelector('.button');

    for (let h1 of gameTitle) {
      h1.remove();
    }

    button.remove();
  }

  const removeInput = () => {
    const button = document.querySelector('.button');
    button.remove();

    const input = document.querySelector('.get-name')
    input.remove()
  }

  const _addUserInput = () => {
    const gameBoard = document.querySelector('.gameBoard')

    const userInput = document.createElement('input')
    userInput.classList.add('get-name');
    userInput.setAttribute('placeholder', 'enter playername')
    gameBoard.appendChild(userInput);

    const button = _createButton('confirm name');
    button.classList.add('confirm');

    button.addEventListener('click', removeInput)
  }


  return {
    newGameElements
  }
})();

const Game = (() => {
  webElements.newGameElements();
  Board.newBoard();

  let players = []
  players.push(Player('p1', 'X'), Player('p2', 'O'));






  return {
    players
  }
})();