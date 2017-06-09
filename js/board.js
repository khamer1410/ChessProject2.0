var App = App || {};

App.board = (function() {
    "use strict";

//VARIABLES
    let gameBoard = {};
    let rowNumber = null;

//CLASS & PROTOTYPES
    function Board(fieldsNo) {
        this.fields = [];
        let board = document.querySelector('#board');
        let tr;
        rowNumber = -1; // first row = 0
        for (let i = 0; i < fieldsNo; i++) {
            if (i % 8 === 0) {
                tr = document.createElement('tr');
                board.appendChild(tr);
                rowNumber++;
            }
            let field = this.fields[i] = new Field(i);
            let td = field.td;
            if (rowNumber % 2) {
                i % 2 ? (td.className = 'field-black') : (td.className = 'field-white');
            } else {
                i % 2 ? (td.className = 'field-white') : (td.className = 'field-black');
            }
            tr.appendChild(td);
        }
    }

    Board.prototype = {
        clearFieldsSelection,
    };

    function Field(id) {
        this.no = id;
        this.td = document.createElement('td');
        this.td.setAttribute('data-id', id);
    }

    Field.prototype = {
        removePawn: function() {this.pawn.element.remove();},
        addPawn: function(pawnElement) {this.td.appendChild(pawnElement);},
        addClass: function(className) {this.td.classList.add(className);},      
    };

//FUNCTIONS
    function clearFieldsSelection() {
        const activeFigure = document.querySelector('.active');
        if (activeFigure) { activeFigure.classList.remove('active'); }

        document.querySelectorAll("[class*=checkField]").forEach((field) => {
            field.classList.remove('checkField-avaliable');
            field.classList.remove('checkField-friendly');
            field.classList.remove('checkField-enemy');
            //    document.querySelectorAll("[class*=checkField]").forEach((field) => { field.classList.remove(/^.checkField\w*/);}); //trying to validete section above using RegExp...
        });
    }

    return {
        Board,
        Field,
        getRowNumber: ()=> {return rowNumber;},

    }



})();
