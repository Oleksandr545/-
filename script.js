document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const width = 8;
    const colors = ['red', 'yellow', 'green', 'blue', 'orange'];
    let squares = [];

    // Create the game board
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div');
            let randomColor = Math.floor(Math.random() * colors.length);
            square.classList.add('candy', colors[randomColor]);
            square.setAttribute('draggable', true);
            square.setAttribute('id', i);
            gameBoard.appendChild(square);
            squares.push(square);
        }
    }
    createBoard();

    let colorBeingDragged;
    let colorBeingReplaced;
    let squareIdBeingDragged;
    let squareIdBeingReplaced;

    // Drag the candies
    squares.forEach(square => square.addEventListener('dragstart', dragStart));
    squares.forEach(square => square.addEventListener('dragend', dragEnd));
    squares.forEach(square => square.addEventListener('dragover', dragOver));
    squares.forEach(square => square.addEventListener('dragenter', dragEnter));
    squares.forEach(square => square.addEventListener('dragleave', dragLeave));
    squares.forEach(square => square.addEventListener('drop', dragDrop));

    function dragStart() {
        colorBeingDragged = this.className;
        squareIdBeingDragged = parseInt(this.id);
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
    }

    function dragLeave() {
    }

    function dragDrop() {
        colorBeingReplaced = this.className;
        squareIdBeingReplaced = parseInt(this.id);
        squares[squareIdBeingDragged].className = colorBeingReplaced;
        this.className = colorBeingDragged;
    }

    function dragEnd() {
        let validMoves = [
            squareIdBeingDragged - 1,
            squareIdBeingDragged - width,
            squareIdBeingDragged + 1,
            squareIdBeingDragged + width
        ];
        let validMove = validMoves.includes(squareIdBeingReplaced);

        if (squareIdBeingReplaced && validMove) {
            squareIdBeingReplaced = null;
        } else if (squareIdBeingReplaced && !validMove) {
            squares[squareIdBeingDragged].className = colorBeingDragged;
            squares[squareIdBeingReplaced].className = colorBeingReplaced;
        } else {
            squares[squareIdBeingDragged].className = colorBeingDragged;
        }
    }

    // Check for matches
    function checkRowForThree() {
        for (let i = 0; i < 61; i++) {
            let rowOfThree = [i, i + 1, i + 2];
            let decidedColor = squares[i].className;
            const isBlank = squares[i].className === '';

            if (rowOfThree.every(index => squares[index].className === decidedColor && !isBlank)) {
                rowOfThree.forEach(index => {
                    squares[index].className = '';
                });
            }
        }
    }

    function checkColumnForThree() {
        for (let i = 0; i < 47; i++) {
            let columnOfThree = [i, i + width, i + width * 2];
            let decidedColor = squares[i].className;
            const isBlank = squares[i].className === '';

            if (columnOfThree.every(index => squares[index].className === decidedColor && !isBlank)) {
                columnOfThree.forEach(index => {
                    squares[index].className = '';
                });
            }
        }
    }

    window.setInterval(function() {
        checkRowForThree();
        checkColumnForThree();
    }, 100);
});
