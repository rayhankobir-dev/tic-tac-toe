    var currentPlayer = '';
    var gameOver = false;
    var startTime = null;
    var xwin = 0;
    var xlose = 0;
    var owin = 0;
    var olose = 0;
    var tie = 0;

    function makeMove(cell, type) {
        if(getOpponentType() === null) {
            alert('Plase select game type!');
        }else {
            if (startTime === null) {
                startTime = new Date();
                updateElapsedTime();
            }
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
        const cells = document.querySelectorAll('#board td');

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
                calculateScore(cells[a].textContent);
                return;
            }
        }
        if ([...cells].every(cell => cell.textContent)) {
            gameOver = true;
            cells.forEach(cell => cell.classList.add('red-bg'));
            document.getElementById('message').textContent = "It's a tie!";
            document.getElementById('playAgain').disabled = false;
            updateTie();
        }
    }

    function startRestart() {
        startTime = null;
        const cells = document.querySelectorAll('#board td');
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
        const emptyCells = [...document.querySelectorAll('#board td')].filter(cell => !cell.textContent);
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

    function updateElapsedTime() {
        const currentTime = new Date();
        const timeDifference = currentTime - startTime;
        const secondsElapsed = Math.floor(timeDifference / 1000);
    
        const timeElapsedElement = document.getElementById('timeElapsed');
        timeElapsedElement.textContent = `Time elapsed: ${secondsElapsed} seconds`;
    
        if (!gameOver) {
            requestAnimationFrame(updateElapsedTime); 
        }
    }

    function calculateScore(player) {
        if(player == 'X') {
            xwin++;
            olose++;
        }else {
            owin++;
            xlose++;
        }
        updateScore();
    }
    function updateTie() {
        tie++;
        updateScore();
    }

    function updateScore() {
        document.getElementById('xwin').innerText = xwin.toString();
        document.getElementById('xlose').innerText = xlose.toString();
        document.getElementById('owin').innerText = owin.toString();
        document.getElementById('olose').innerText = olose.toString();
        document.getElementById('tie').innerText = tie.toString();
        document.getElementById('total').innerText = xwin + owin + tie;
    }