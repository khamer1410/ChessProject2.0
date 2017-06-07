// (function() {
    let gameBoard = {};
    const startForm = document.getElementById('game-settings');

    startForm.addEventListener('submit',(e)=> {
        e.preventDefault();
        setCustomGame();
    });

    // function init() {
    //     console.log('game ready!');
    //     gameBoard = setNewGame({ size: 64, order: 'random' }); //Wzorzec konfiguracji: Patent na dużo argumentów - obiekt konfugurujący z argumentami.
    //     return gameBoard;
    // }
    
//VARIABLES
    const figuresInGame = {
        pawn: 14,
        rook: 4,
    };

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
        document.getElementById('board').innerHTML = "";
        gameBoard = {};
        console.log(gameBoard);
        //start new game
        gameBoard = setNewGame({ size: fieldsNo, order: 'random' });
        console.log(gameBoard);
    }

    function setNewGame(config) {
        gameBoard = board.Board(config.size);
        const fieldsArr = gameBoard.fields;
        switch (config.order) {
            case 'random':
                randomPositioning(config.size, fieldsArr, figuresArr(figuresInGame));
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
        for (let j = 0; j < (figuresArr.length); j++) {
            let randomNo = randomFrom(0, fieldsSize - 1);
            let startPostion = fieldsArr[randomNo];     
            let piece = figures.Figure(figuresArr[j], ( j % 2 ? 'black' : 'white' ), j);

            if (startPostion.pawn) {
                j--;
                continue;
            }
            startPostion.pawn = piece;
            startPostion.td.appendChild(piece.element);
        }
    }

    let figuresArr = function createFiguresArr(figuresObj) {
        const figuresArr = [];
        let figureName = '';
        for (let figure in figuresObj) {
            figureName = figure;
            const figureCount = figuresObj[figure];
            for (i = 0; i < figureCount; i++)
                figuresArr.push(figureName);
        }
        return figuresArr;
    }

//ADDITIONAL FUNCTIONS

    function randomFrom(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

 //INITIALIZE 
   // init();

    //4 TEST
    gameBoard = setNewGame({ size: 64, order: 'random' });


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

// })();