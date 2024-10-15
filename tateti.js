const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

// Condiciones de victoria
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Maneja el clic en una celda
function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    // Verificar si la celda ya está ocupada o si el juego ha terminado
    if (board[index] !== '' || !isGameActive) {
        return;
    }

    board[index] = currentPlayer; // Marcar la celda con el jugador actual
    cell.textContent = currentPlayer; // Actualizar el contenido de la celda

    // Verificar si hay un ganador o un empate
    checkResult();
}

// Verifica si hay un ganador o un empate
function checkResult() {
    const roundWon = winningConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });

    if (roundWon) {
        alert(`¡Jugador ${currentPlayer} ha ganado!`);
        isGameActive = false;
        return;
    }

    if (!board.includes('')) {
        alert('¡Es un empate!');
        isGameActive = false;
        return;
    }

    // Cambiar de jugador
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Reinicia el juego
function restartGame() {
    isGameActive = true;
    currentPlayer = 'X';
    board.fill(''); // Limpia el tablero
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

// Añadir eventos a las celdas y al botón de reinicio
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);
