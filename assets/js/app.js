    var currentPlayer = '';
    var gameOver = false;
    
    function makeMove(cell, type) {
        if(getOpponentType() === null) {
            alert('Plase select game type!');
        }else {
            if (!cell.textContent && !gameOver) {
                cell.textContent = currentPlayer;
                checkWin();
                if(type === 'computer') {
                    if (currentPlayer === 'X' && !gameOver) {
                        currentPlayer = 'O';
                        document.getElementById('message').textContent = "It is Computer's turn";
                        setTimeout(computerMove, 500);
                    } else if (currentPlayer === 'O' && !gameOver) {
                        currentPlayer = 'X';
                        document.getElementById('message').textContent = `It is ${currentPlayer}'s turn`;
                    }
                }else {
                    if (currentPlayer === 'X' && !gameOver) {
                        currentPlayer = 'O';
                        document.getElementById('message').textContent = `It is ${currentPlayer} turn`;
                    } else if (currentPlayer === 'O' && !gameOver) {
                        currentPlayer = 'X';
                        document.getElementById('message').textContent = `It is ${currentPlayer}'s turn`;
                    }
                }
            }
        }
    }

    function checkWin() {
        const cells = document.querySelectorAll('td');

        const winningCombos = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];

        for(const combo of winningCombos) {
            const [a, b, c] = combo;
            if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                gameOver = true;
                cells[a].classList.add('green-bg');
                cells[b].classList.add('green-bg');
                cells[c].classList.add('green-bg');
                document.getElementById('message').textContent = `${cells[a].textContent} wins!`;
                document.getElementById('playAgain').disabled = false;
                
                return;
            }
        }
        if ([...cells].every(cell => cell.textContent)) {
            gameOver = true;
            cells.forEach(cell => cell.classList.add('red-bg'));
            document.getElementById('message').textContent = "It's a tie!";
            document.getElementById('playAgain').disabled = false;
        }
    }

    function startRestart() {
        const cells = document.querySelectorAll('td');
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('green-bg', 'red-bg');
        });
        
        if(getOpponentType() !== null) {
            const opponentType = getOpponentType();
            if (opponentType === 'computer') {
                currentPlayer = Math.random() < 0.5 ? 'X' : 'O';
                document.getElementById('message').textContent = currentPlayer === 'X' ? `It is ${currentPlayer}'s turn` : "It is Computer's turn";
                if (currentPlayer === 'O') {
                    setTimeout(computerMove, 500);
                }
            } else {
                currentPlayer = Math.random() < 0.5 ? 'X' : 'O';
                document.getElementById('message').textContent = `It is ${currentPlayer}'s turn`;
            }
            
            gameOver = false;
            document.getElementById('playAgain').disabled = true;
        }else {
            alert('Plase select game type!');
        }
    }
    

    function playAgain() {
        startRestart();
    }

    function computerMove() {
        const emptyCells = [...document.querySelectorAll('td')].filter(cell => !cell.textContent);
        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const chosenCell = emptyCells[randomIndex];
            makeMove(chosenCell, 'computer');
        }
    }

    function getOpponentType() {
        return document.querySelector('input[name="opponent"]:checked')?.value ?? null;
    }

    function opponentTypeChanged() {
        startRestart();
    }