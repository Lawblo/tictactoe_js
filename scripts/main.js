
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

  const _removeInput = () => {
    const button = document.querySelector('.button');
    button.remove();

    const inputs = document.querySelectorAll('.get-name')
    for (let input of inputs) {
      input.remove();
    }
  }

  const _storePlayers = () => {
    const playerOneName = document.getElementById('playerOne').value
    const playerTwoName = document.getElementById('playerTwo').value
    Game.addPlayers(playerOneName, playerTwoName);
    _displayPlayers();
  }

  const _addUserInput = () => {
    const gameBoard = document.querySelector('.gameBoard')

    const playerOne = document.createElement('input')
    playerOne.classList.add('get-name');
    playerOne.setAttribute('placeholder', 'player one')
    playerOne.setAttribute('id', 'playerOne')
    gameBoard.appendChild(playerOne);

    const playerTwo = document.createElement('input');
    playerTwo.classList.add('get-name');
    playerTwo.setAttribute('placeholder', 'player two');
    playerTwo.setAttribute('id', 'playerTwo')
    gameBoard.appendChild(playerTwo);

    const button = _createButton('confirm names');
    button.classList.add('confirm');


    button.addEventListener('click', _storePlayers)
    button.addEventListener('click', _removeInput)
  }

  const _playerDisplay = (playerName, idName) => {
    const gameBoard = document.querySelector('.gameBoard');
    const player = document.createElement('div');
    player.classList.add('player-display');
    player.setAttribute('id', idName);
    player.textContent = playerName.name;
    gameBoard.appendChild(player);
  }

  const _displayPlayers = () => {
    _playerDisplay(Game.players[0], 'playerOneDisplay');
    _playerDisplay(Game.players[1], 'playerTwoDisplay');
  }


  return {
    newGameElements
  }
})();

const Game = (() => {
  webElements.newGameElements();
  Board.newBoard();

  let players = []

  const addPlayers = (playerOne, playerTwo) => {
    Game.players = [Player(playerOne, 'X'), Player(playerTwo, 'O')]
  }

  return {
    players,
    addPlayers
  }
})();