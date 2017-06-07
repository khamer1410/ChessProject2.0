var App = App || {};

App.board = (function() {
    "use strict";

    let rowNumber = null;

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

    function Field(id) {
        this.no = id;
        this.td = document.createElement('td');
        this.td.setAttribute('data-id', id);
    }

    return {
        Board,
        Field,
        rowNumber,
    }

})();