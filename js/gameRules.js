App.gameRules = (function() {
    "use strict";

 //VARIABLES & EVENTS   
    let gameBoard = new App.board.Board(64); //App.gameStart.gameBoard; nie działa bo gameStart jest ładowane po gameRules
    let activeFieldWithFigure = null;

    board.addEventListener('click', (e)=> {
        moveFigure(e.target);
        pickFigure(e.target);
    });

//FUNCTIONS
    function pickFigure(figure) {
        if (figure.tagName !== 'IMG') return;
        if (figure.parentNode === null) return;     
        App.gameStart.gameBoard().clearFieldsSelection();
        
        //Game operations
        const figureFieldNo = figure.parentNode.getAttribute('data-id');
        activeFieldWithFigure = gameBoard.fields[figureFieldNo];
        const figureOnField = gameBoard.fields[figureFieldNo].pawn;
        figureOnField.setActive()
                    .getMoves(figureFieldNo);
    }

    function moveFigure(clickedField) {
        if (!activeFieldWithFigure) return;
        let fieldNo = null;
        (clickedField.tagName === 'IMG') ? fieldNo = clickedField.parentNode.getAttribute('data-id') : fieldNo = clickedField.getAttribute('data-id');
        const clickedFieldData = gameBoard.fields[fieldNo];

        if (!isMoveLegal(clickedFieldData)) return;    

        if (clickedFieldData.pawn) {
            (activeFieldWithFigure.pawn.color !== clickedFieldData.pawn.color) ? 
            attackFigure(activeFieldWithFigure, clickedFieldData) : pickFigure(clickedFieldData.td);

        } else {
            //Change View
            const elementToMove = activeFieldWithFigure.pawn.element;
            clickedFieldData.td.appendChild(elementToMove);
            //Change Model
            clickedFieldData.pawn = activeFieldWithFigure.pawn;
            delete activeFieldWithFigure.pawn;
            //clear board state
            activeFieldWithFigure = null;
            App.gameStart.gameBoard().clearFieldsSelection();
        }
    }

    function attackFigure(activeFigure, clickedFigure) {
        
        //ChangeView
        clickedFigure.removePawn();
        clickedFigure.addPawn(activeFigure.pawn.element);
        //Change Model
        clickedFigure.pawn = activeFigure.pawn;
        delete activeFigure.pawn;
        //clear board state
        activeFieldWithFigure = null;
        App.gameStart.gameBoard().clearFieldsSelection();
    }

//ADDITIONAL FUNCTIONS
    function isMoveLegal(checkingField) {
       return (checkingField.td.classList.contains('checkField-avaliable') || checkingField.td.classList.contains('checkField-enemy'));
    }

    //Numbers are count from 0!
    function getFieldNo(row, col) {
        const fieldNo = row * 8 + col;
        return fieldNo;
    }

    function getPosition(index) {
        return {
            row: Math.floor(index / 8),
            col: index % 8,
        };
    }

//MOVES
    function getMoves(fieldNo, activeFigure) {
        const position = getPosition(fieldNo);
        const fieldIndex = getFieldNo(position.row, position.col);

        let movesOptions = "";
        switch (activeFigure.type) {
            case 'pawn':
                switch (activeFigure.color) {
                    case 'white':
                        movesOptions = {
                            up: (position.row === 0) ? 0 : 1,
                            right: (position.col === 7) ? 0 : 1,
                            down: 0,
                            left: (position.col === 0) ? 0 : 1,
                        }; 
                        break;
                    case 'black':
                        movesOptions = {
                            up: 0,
                            right: (position.col === 7) ? 0 : 1,
                            down: (position.row === App.board.getRowNumber()) ? 0 : 1,
                            left: (position.col === 0) ? 0 : 1,
                        };
                        break;
                }
                break;
            case 'rook':
                movesOptions = {
                    up: position.row,
                    right: 7 - position.col /*Magic number - chessBoard always has 8 col */,
                    down: App.board.getRowNumber() - position.row,
                    left: position.col
                };
                break;
        }

        getMovesDown(position, movesOptions, activeFigure);
        getMovesUp(position, movesOptions, activeFigure);
        getMovesLeft(position, movesOptions, activeFigure);
        getMovesRight(position, movesOptions, activeFigure);
    }

    function getMovesDown(position, moves, figure) {
        for (let i = 1; i <= moves.down; i++) {
            let checkingRow = position.row + i;
            let checkingFieldNo = getFieldNo(checkingRow, position.col);
            let checkingField = gameBoard.fields[checkingFieldNo];
            let isAvaliable = isFieldAvaliable(checkingField, figure);
            if (isAvaliable === false) break; 
        } 
    }

    function getMovesUp(position, moves, figure) {
        for (let i = 1; i <= moves.up; i++) {
            let checkingRow = position.row - i;
            let checkingFieldNo = getFieldNo(checkingRow, position.col);
            let checkingField = gameBoard.fields[checkingFieldNo];
            let isAvaliable = isFieldAvaliable(checkingField, figure);
            if (isAvaliable === false) break;
        }
    }

    function getMovesLeft(position, moves, figure) {
        for (let i = 1; i <= moves.left; i++) {
            let checkingCol = position.col - i;
            let checkingFieldNo = getFieldNo(position.row, checkingCol);
            let checkingField = gameBoard.fields[checkingFieldNo];
            let isAvaliable = isFieldAvaliable(checkingField, figure);
            if (isAvaliable === false) break;
        }
    }

    function getMovesRight(position, moves, figure) {
        for (let i = 1; i <= moves.right; i++) {
            let checkingCol = position.col + i;
            let checkingFieldNo = getFieldNo(position.row, checkingCol);
            let checkingField = gameBoard.fields[checkingFieldNo];
            let isAvaliable = isFieldAvaliable(checkingField, figure);
            if (isAvaliable === false) break;
        }
    }

    function isFieldAvaliable(checkingField, figure) {
        checkingField.addClass('checkField-avaliable');
        let isAvaliable = true;
        if (checkingField.pawn) {
            checkingField.pawn.color === figure.color ? checkingField.addClass('checkField-friendly') : checkingField.addClass('checkField-enemy');
            isAvaliable = false;
        }
        return isAvaliable;
    }
    
    return {
        getPosition,
        getFieldNo,
        getMoves,
        getBoard: ()=> {return gameBoard;},
        setBoard : (newBoard)=> {
            gameBoard = newBoard;
        },
    };

})();
