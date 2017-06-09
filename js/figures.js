App.figures = (function() {
    "use strict";

//Alternative class
    // class Figure2 {
    //     constructor(type, color, id) {
    //         this.element = createElement(type, color, id);
    //         this.type = type;
    //         this.id = id;
    //         this.color = color;
    //     }
    // }
    //   //class Pawn extends Figure {};

//CLASS
    function Figure(color, id) {
        this.element = ()=> { throw "figure type not defined"; };
        this.id = id;
        this.color = color;
    }

    function rook(color, id) {
        Figure.call(this, color, id);
        this.type = 'rook';
        const shape = {
            white: 'elements/rookW2.png',
            black: 'elements/rookB.png',
        };
        this.element = createElement(this.type, color, id, shape[color]);
    }

    function pawn(color, id) {
        Figure.call(this, color, id);
        this.type = 'pawn';
        const shape = {
            white: 'elements/pawnW.svg',
            black: 'elements/pawnB.svg',
        };
        this.element = createElement(this.type, color, id, shape[color]);
    }

//PROTOTYPES
    Figure.prototype = {
        getMoves: ()=> {throw "Figure moves not defined";}, //turned on after building a Figures prototypes
        setActive: function () { this.element.classList.add('active'); return this; },
    };

    rook.prototype = Object.create(Figure.prototype);
    rook.prototype.constructor = rook;
    rook.prototype.getMoves = function (fieldNo) {
        App.gameRules.getMoves(fieldNo, this);
    };

    pawn.prototype = Object.create(Figure.prototype);
    pawn.prototype.constructor = pawn;
    pawn.prototype.getMoves = function (fieldNo) {
        App.gameRules.getMoves(fieldNo, this);
    };
 
//OTHER
    function createElement(type, color, id, shape) {
        let element = document.createElement('img');
        element.src = shape;
        element.classList.add(color);
        element.id = `${id}`;
        element.type = `${type}`;
        // element.addEventListener('click', function(e) {
        //     this.classList.add('active');
        // });
        return element;
    }

    return {
        Figure,
        rook,
        pawn,
    };
})();
