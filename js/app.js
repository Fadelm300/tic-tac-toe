class TicTacToe {
    constructor() {
      this.board = Array.from({ length: 3 }, () => Array(3).fill(' '));  // Initialize board
      this.playerPieces = [];  // Player's positions (X)
      this.computerPieces = []; // Computer's positions (O)
      this.boardElement = document.getElementById('board');
      this.messageElement = document.getElementById('message');
      this.resetButton = document.getElementById('resetButton');
      this.gameOver = false; // Track if the game is over
      this.turn = 'player'; // Track whose turn it is
      this.pieceMoveInProgress = false; // Flag for movement phase
      this.resetButton.addEventListener('click', () => this.resetGame());
    }
  
    // Displays the board
    displayBoard() {
      this.boardElement.innerHTML = '';  // Clear the board
  
      // Loop through each row and column of the board
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          
          // Display the symbol (X or O) in the cell
          if (this.board[row][col] !== ' ') {
            cell.textContent = this.board[row][col];
            cell.classList.add('taken');
          }
  
          // Allow players to move their pieces after their initial moves
          if (!this.gameOver && this.pieceMoveInProgress) {
            cell.addEventListener('click', () => this.movePiece(row, col)); // Movement phase
          } else {
            // Regular turn move (click only works once for placement)
            cell.addEventListener('click', () => this.playerMove(row, col), { once: true });
          }
          
          this.boardElement.appendChild(cell);
        }
      }
    }
  
    // Check if there is a winner
    isWinner(pieces) {
      const winConditions = [
        [[0, 0], [0, 1], [0, 2]], // Rows
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]], // Columns
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]], // Diagonals
        [[0, 2], [1, 1], [2, 0]],
      ];
  
      return winConditions.some(condition =>
        condition.every(([x, y]) =>
          pieces.some(([px, py]) => px === x && py === y)
        )
      );
    }
  
    // Get all empty positions
    getEmptyPositions() {
      const emptyPositions = [];
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (this.board[row][col] === ' ') emptyPositions.push([row, col]);
        }
      }
      return emptyPositions;
    }
  
    // Makes a move (place X or O)
    makeMove(player, position) {
      const symbol = player === 'player' ? 'X' : 'O';
      if (player === 'player') {
        this.playerPieces.push(position);
      } else {
        this.computerPieces.push(position);
      }
      this.board[position[0]][position[1]] = symbol;
    }
  
    // Removes the oldest piece from a player
    removeOldestPiece(player) {
      let position;
      if (player === 'player') {
        position = this.playerPieces.shift(); // Remove the first piece
      } else {
        position = this.computerPieces.shift(); // Remove the first piece
      }
      this.board[position[0]][position[1]] = ' '; // Clear the position
    }
  
    // Handles player's move
    playerMove(row, col) {
      if (this.gameOver || this.board[row][col] !== ' ') return; // Prevent move if game is over or cell is taken
      this.makeMove('player', [row, col]);
      this.displayBoard();
  
      // Check if player wins
      if (this.isWinner(this.playerPieces)) {
        this.messageElement.textContent = "Congratulations, you win!";
        this.gameOver = true;
        return;
      }
  
      // After both players have placed 3 pieces, automatically remove the oldest piece
      if (this.playerPieces.length > 3) {
        this.removeOldestPiece('player');
      }
  
      // Switch to computer's turn after player move
      this.turn = 'computer';
      this.messageElement.textContent = "Computer's turn";
      this.computerTurn();
    }
  
    // Handles computer's move
    computerMove() {
      // Check for winning move
      for (const position of this.getEmptyPositions()) {
        this.computerPieces.push(position);
        if (this.isWinner(this.computerPieces)) {
          this.computerPieces.pop();
          return position;
        }
        this.computerPieces.pop();
      }
  
      // Check for blocking move
      for (const position of this.getEmptyPositions()) {
        this.playerPieces.push(position);
        if (this.isWinner(this.playerPieces)) {
          this.playerPieces.pop();
          return position;
        }
        this.playerPieces.pop();
      }
  
      // Otherwise, choose a random move
      const emptyPositions = this.getEmptyPositions();
      return emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
    }
  
    // Computer's turn
    computerTurn() {
      if (this.gameOver) return;
  
      setTimeout(() => {
        const [row, col] = this.computerMove();
        this.makeMove('computer', [row, col]);
        this.displayBoard();
  
        // Check if computer wins
        if (this.isWinner(this.computerPieces)) {
          this.messageElement.textContent = "Computer wins! Better luck next time.";
          this.gameOver = true;
          return;
        }
  
        // After computer places 3 pieces, remove its oldest piece if necessary
        if (this.computerPieces.length > 3) {
          this.removeOldestPiece('computer');
        }
  
        // Switch turn to player
        this.turn = 'player';
        this.messageElement.textContent = "Your turn!";
      }, 500); // Delay for computer's turn
    }
  
    // Reset the game
    resetGame() {
      this.board = Array.from({ length: 3 }, () => Array(3).fill(' ')); // Reset the board
      this.playerPieces = []; // Reset player pieces
      this.computerPieces = []; // Reset computer pieces
      this.gameOver = false; // Reset game over flag
      this.turn = 'player'; // Reset the turn
      this.pieceMoveInProgress = false; // Reset the piece move flag
      this.messageElement.textContent = "Your turn!";
      this.displayBoard();
    }
  
    // Start the game
    play() {
      this.messageElement.textContent = "Your turn!";
      this.displayBoard();
    }
  }
  
  // Start the game
  const game = new TicTacToe();
  game.play();
  