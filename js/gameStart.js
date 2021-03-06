App.gameStart = (function() {
    "use strict";

//VARIABLES & EVENTS
    let gameBoard = {};
    const startForm = document.getElementById('game-settings');
    const figuresInGame = { //default numbers
        pawn: 14,
        rook: 4,
    };

    document.addEventListener('DOMContentLoaded', defaultStart);

    startForm.addEventListener('submit',(e)=> {
        e.preventDefault();
        if (window.confirm('Do You want to start a new game? Previous results will be lost!')) {
            setCustomGame();
        }
    });
  
//FUNCTIONS
    function defaultStart() {
        deleteBoard();
        gameBoard = setNewGame({ size: 64, order: 'random' }); 
    }

    function setCustomGame() {     
        //new settings & validation
        const fieldsNo = startForm.querySelector('#fieldsCount').value;
        const pawn = startForm.querySelector('#pawnCount').value;
        const rook = startForm.querySelector('#rookCount').value;
        figuresInGame.pawn = pawn;
        figuresInGame.rook = rook;
        if (!validateForm(fieldsNo)) return;


        //start new game
        deleteBoard();
        gameBoard = setNewGame({ size: fieldsNo, order: 'random' });
        console.log(gameBoard, 'game ready!');

    }

    function deleteBoard() {
        document.getElementById('board').innerHTML = "";
        gameBoard = {};
    }

    function setNewGame(config) {
        gameBoard = new App.board.Board(config.size);
        App.gameRules.setBoard(gameBoard);
        const fieldsArr = gameBoard.fields;
        switch (config.order) {
            case 'random':
                randomPositioning(config.size, fieldsArr, createFiguresArr(figuresInGame));
                break;
            case 'ordered':
                //place for ordered function;        
                break;
        }
        return gameBoard;
    }

    function validateForm(fieldsNo) {
        if (fieldsNo % 8 !== 0) {
            alert('Number of fields must be divided by 8!');
            return false;
        }
        return true;
    }

    function randomPositioning(fieldsSize, fieldsArr, figuresArr) {
        const figuresArrLength = figuresArr.length;
        for (let j = 0; j < figuresArrLength; j++) {
            let randomNo = randomFrom(0, fieldsSize - 1);
            let startPostion = fieldsArr[randomNo];     
            let piece = new App.figures[figuresArr[j]](( j % 2 ? 'black' : 'white' ), j);
            
            if (startPostion.pawn) {
                j--;
                continue;
            }
            
            startPostion.pawn = piece;
            startPostion.td.appendChild(piece.element);
        }
    }

    function createFiguresArr(figuresObj) {
        const figuresArr = [];
        let figureName = '';
        for (let figure in figuresObj) {
            figureName = figure;
            const figureCount = figuresObj[figure];
            for (let i = 0; i < figureCount; i++)
                figuresArr.push(figureName);
        }
        return figuresArr;
    }

//ADDITIONAL FUNCTIONS
    function randomFrom(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function orderedPositioning() { //TODO: unfinished
        //     for (let i = 0; i <= fields; i++) {
        //         let startPostion = fieldsArr[i];
        //         let piece = false;

        //         if (i >= 8 && i <= 15) {
        //             piece = new Pawn('pawn', 'black', i);
        //         }

        //         else if (i >= 48 && i <= 55) {
        //             piece = new Pawn('pawn', 'white', i);
        //         }

        //         else {
        //             continue;
        //         }

        //         if (piece) {
        //             startPostion.pawn = piece;
        //             startPostion.td.appendChild(piece.element);
        //         }
        //     }
    }

    return {
        gameBoard: ()=> {return gameBoard;},
    };

})();
