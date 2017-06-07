App.gameStart = (function() {
    "use strict";

//VARIABLES
    let gameBoard = {};
    const startForm = document.getElementById('game-settings');
    const figuresInGame = { //default numbers
        pawn: 14,
        rook: 4,
    };

    startForm.addEventListener('submit',(e)=> {
        e.preventDefault();
        setCustomGame();
    });

    //Default Start
    gameBoard = setNewGame({ size: 64, order: 'random' });
  
//FUNCTIONS
    function setCustomGame() {     

        //new settings & validation
        const fieldsNo = startForm.querySelector('#fieldsCount').value;
        const pawn = startForm.querySelector('#pawnCount').value;
        const rook = startForm.querySelector('#rookCount').value;
        figuresInGame.pawn = pawn;
        figuresInGame.rook = rook;
        if (!validateForm(fieldsNo)) return;

        //delete previous game
        document.getElementById('board').innerHTML = ""; //można board - gdzie jest zdefiniowane?
        gameBoard = {};
        console.log(gameBoard);

        //start new game
        gameBoard = setNewGame({ size: fieldsNo, order: 'random' });
        console.log(gameBoard, 'game ready!');

    }

    function setNewGame(config) {
        gameBoard = new App.board.Board(config.size);
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
            let piece = new App.figures.Figure(figuresArr[j], ( j % 2 ? 'black' : 'white' ), j);
//Tutaj kreowanie figur różnych klas w zależności od nazwy z figuresArr.
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
        gameBoard,
    };

})();