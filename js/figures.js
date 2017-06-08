App.figures = (function() {
    "use strict";

    function Figure(type, color, id) {
        this.element = createElement(type, color, id);
        this.type = type;
        this.id = id;
        this.color = color;
    }

    Figure.prototype = {
        //getMoves: getMoves,
        //getMoves: throw "Figure moves not defined", //turn on after building a Figures prototypes
        setActive: function () { this.element.classList.add('active'); return this; },
    };

    // function getMoves(fieldNo) {
    //     const position = getPosition(fieldNo);
    //     const fieldIndex = getFieldNo(position.row, position.col);
    //     const activeFigure = App.gameStart.gameBoard.fields[fieldIndex].pawn;

    //     getMovesDown(position, activeFigure);
    //     getMovesUp(position, activeFigure);
    //     getMovesLeft(position, activeFigure);
    //     getMovesRight(position, activeFigure);
    // }

    function Rook(type, color, id) {
        Figure.call(this, type, color, id);
        this.element = createElement(type, color, id);
        this.type = type;
        this.id = id;
        this.color = color;
    }

    function createElement(type, color, id) {
        let element = document.createElement('img');
        element.src = figureTypes[type].shape[color];
        element.classList.add(color);
        element.id = `${id}`;
        element.type = `${type}`;
        // element.addEventListener('click', function(e) {
        //     this.classList.add('active');
        // });
        return element;
    }

   //class Pawn extends Figure {};

    const elementsPath = 'elements/';
    const figureTypes = {
        pawn: {
            shape: {
                white: elementsPath + 'pawnW.svg',
                black: elementsPath + 'pawnB.svg',
            }
        },
        rook: {
            shape: {
                white: elementsPath + 'rookW2.png',
                black: elementsPath + 'rookB.png',
            }
        }
    };

    return {
        Figure,
    };
})();
