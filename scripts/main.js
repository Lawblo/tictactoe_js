
'use strict'

const Player = (name, symbol) =>  {
  return {name, symbol}
}

const Board = (() => {
  let gameBoard;

  const newBoard = () => {
    // Board.gameBoard = Array(9);
    Board.gameBoard = [null, null, null, null, null, null, null, null, null];
  }

  const changeBoard = (icon, loc) => {
    // cons
    if (Board.gameBoard[loc]) return false;

    Board.gameBoard[loc] = icon;
    return true;
    // console.log(Board.gameBoard);
  }


  return {
    newBoard,
    changeBoard,
    gameBoard

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
    const title = ['Tic', 'Tac', 'Toe'];
    for (let i = 0; i < 3; i++) {
      const gameTitle = document.createElement('h1');
      gameTitle.classList.add('menu-text')
      gameTitle.textContent = title[i];
      const square = document.getElementById(`square${i+3}`);
      square.classList.remove('symbol');
      square.appendChild(gameTitle);
    }


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
    _clickPlacement();
  }

  const updateBoard = () => {
    for (let index = 0; index < Board.gameBoard.length; index++) {
      let gameSquare = document.getElementById(`square${index}`);
      const symbol = Board.gameBoard[index];
      gameSquare.classList.add('symbol');
      gameSquare.textContent = symbol;
    }
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

  const _playerDisplay = (player, idName) => {
    const gameBoard = document.querySelector('.gameBoard');
    const playerContainer = document.createElement('div');
    playerContainer.classList.add('player-display');
    playerContainer.setAttribute('id', idName);

    const playerName = document.createElement('p');
    playerName.textContent = `Player: ${player.name}`;

    const playerIcon = document.createElement('p');
    playerIcon.textContent = `Symbol: ${player.symbol}`

    gameBoard.appendChild(playerContainer);
    playerContainer.appendChild(playerName);
    playerContainer.appendChild(playerIcon);
  }

  const _displayPlayers = () => {
    _playerDisplay(Game.playerCurrent(), 'playerOneDisplay');
    _playerDisplay(Game.playerNext(), 'playerTwoDisplay');
  }

  const _clickPlacement = () => {
    const gameSquares = document.querySelectorAll('.boardSquare');
    for (let gameSquare of gameSquares){
      gameSquare.addEventListener('click', Game.placeSymbol);
      // gameSquare.addEventListener('click', _updateBoard);
    }
  }

  const _removeClickPlacement = () => {
    const gameSquares = document.querySelectorAll('.boardSquare');
    for (let gameSquare of gameSquares) {
      gameSquare.removeEventListener('click', Game.placeSymbol);
    }
  }


  const gameWon = (winCoords) => {
    _removeClickPlacement();
    for (let coord of winCoords) {
      document.getElementById(`square${coord}`).classList.add('win');
    }

    const gameBoard = document.querySelector('.gameBoard');
    const button = document.createElement('button');
    button.classList.add('reset-btn', 'button');
    button.textContent = 'restart game'
    gameBoard.appendChild(button);
    button.addEventListener('click', () => button.remove());
    button.addEventListener('click', newGameElements)
    button.addEventListener('click', () => {
      Board.newBoard();
      updateBoard();
      const boardSquares = document.querySelectorAll('.boardSquare');
      for (let boardSquare of boardSquares) {
        boardSquare.classList.remove('win');
      }
      newGameElements();
    })
  }



  return {
    newGameElements,
    updateBoard,
    gameWon
  }
})();

const Game = (() => {
  webElements.newGameElements();
  Board.newBoard();

  let players = []

  const playerCurrent = () => {
    return Game.players[0];
  }

  const playerNext = () => {
    return Game.players[1];
  }

  const addPlayers = (playerOne, playerTwo) => {
    Game.players = [Player(playerOne, 'X'), Player(playerTwo, 'O')]
  }

  const alternatePlayers = () => {
    Game.players.unshift(Game.players.pop());
  }

  const placeSymbol = event => {
    if (event.target.type === 'submit') return;

    const symbol = Game.playerCurrent().symbol
    const loc = event.target.id[6];
    if (Board.changeBoard(symbol, loc)) {
      webElements.updateBoard();
      if (Game.checkVictory()) return;
      Game.alternatePlayers();
    };
  }

  const checkLine = (index, mod) => {
    if (!Board.gameBoard[index]) return;

    const x = index;
    const y = index + mod;
    const z = index + mod * 2

    const a = Board.gameBoard[x];
    const b = Board.gameBoard[y];
    const c = Board.gameBoard[z];

    if (a === b && a === c) {
      webElements.gameWon([x, y, z]);
    }
  }

  const checkVictory = () => {
    const gameState = Board.gameBoard;
    for (let index = 0; index < 7; index++) {
      if (index % 3 === 0 && Game.checkLine(index, 1)) return true;
      if (index < 3 && Game.checkLine(index, 3)) return true;
      if (index === 0 && Game.checkLine(index, 4)) return true;
      if (index === 2 && Game.checkLine(index, 2)) return true;
    }
  }

  return {
    playerCurrent,
    playerNext,
    addPlayers,
    alternatePlayers,
    placeSymbol,
    checkVictory,
    checkLine,
    players
  }
})();