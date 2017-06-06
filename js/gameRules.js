    let activeFieldWithFigure = null;

    board.addEventListener('click', (e)=> {
        moveFigure(e.target);
        pickFigure(e.target);
    });

    function pickFigure(figure) {
        if (figure.tagName !== 'IMG') return;
        if (figure.parentNode === null) return;     
        clearFieldsSelection();
        //Game operations
        const figureFieldNo = figure.parentNode.getAttribute('data-id');
        activeFieldWithFigure = gameBoard.fields[figureFieldNo];
        const figureOnField = gameBoard.fields[figureFieldNo].pawn;
        figureOnField
            .setActive()
            .getMoves(figureFieldNo);
    }

    function moveFigure(clickedField) {
        if (!activeFieldWithFigure) return;
        let fieldNo = null;
        clickedField.tagName === 'IMG' ? fieldNo = clickedField.parentNode.getAttribute('data-id') : fieldNo = clickedField.getAttribute('data-id');
        const clickedFieldData = gameBoard.fields[fieldNo];

        if (!isMoveLegal(clickedFieldData)) return;    

        if (clickedFieldData.pawn) {
            (activeFieldWithFigure.pawn.color !== clickedFieldData.pawn.color) ? attackFigure(activeFieldWithFigure, clickedFieldData) : pickFigure(clickedFieldData.td);

        } else {
            //Change View
            const elementToMove = activeFieldWithFigure.pawn.element;
            clickedFieldData.td.appendChild(elementToMove);
            //Change Model
            clickedFieldData.pawn = activeFieldWithFigure.pawn;
            delete activeFieldWithFigure.pawn;
            //clear board state
            activeFieldWithFigure = null;
            clearFieldsSelection();
        }
    }

    function attackFigure(activeFigure, clickedFigure) {
        //ChangeView
        clickedFigure.pawn.element.remove();
        clickedFigure.td.appendChild(activeFigure.pawn.element);
        //Change Model
        clickedFigure.pawn = activeFigure.pawn;
        delete activeFigure.pawn;
        //clear board state
        activeFieldWithFigure = null;
        clearFieldsSelection();
    }

//ADDITIONAL FUNCTIONS
    function isMoveLegal(checkingField) {
       return (checkingField.td.classList.contains('checkField-avaliable') || checkingField.td.classList.contains('checkField-enemy'));
    }

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

//PROTOTYPES
    Figure.prototype = {
        getMoves: getMoves,
        setActive: function() { this.element.classList.add('active'); return this;},
    };

    function getMoves(fieldNo) {
        const position = getPosition(fieldNo);
        const fieldIndex = getFieldNo(position.row, position.col);
        const activeFigure = gameBoard.fields[fieldIndex].pawn;

        getMovesDown(position, activeFigure);
        getMovesUp(position, activeFigure);
        getMovesLeft(position, activeFigure);
        getMovesRight(position, activeFigure);
    }

    function getMovesDown(position, figure) {
        for (let i = 1; i <= rowNumber - position.row; i++) {
            let checkingRow = position.row + i;
            let checkingFieldNo = getFieldNo(checkingRow, position.col);
            let checkingField = gameBoard.fields[checkingFieldNo];
            let isAvaliable = isFieldAvaliable(checkingField, figure);
            if (isAvaliable === false) break; 
        } 
    }

    function getMovesUp(position, figure) {
        for (let i = 1; i <= position.row; i++) {
            let checkingRow = position.row - i;
            let checkingFieldNo = getFieldNo(checkingRow, position.col);
            let checkingField = gameBoard.fields[checkingFieldNo];
            let isAvaliable = isFieldAvaliable(checkingField, figure);
            if (isAvaliable === false) break;
        }
    }

    function getMovesLeft(position, figure) {
        for (let i = 1; i <= position.col; i++) {
            let checkingCol = position.col - i;
            let checkingFieldNo = getFieldNo(position.row, checkingCol);
            let checkingField = gameBoard.fields[checkingFieldNo];
            let isAvaliable = isFieldAvaliable(checkingField, figure);
            if (isAvaliable === false) break;
        }
    }

    function getMovesRight(position, figure) {
        for (let i = 1; i <= 7 - position.col; i++) {
            let checkingCol = position.col + i;
            let checkingFieldNo = getFieldNo(position.row, checkingCol);
            let checkingField = gameBoard.fields[checkingFieldNo];
            let isAvaliable = isFieldAvaliable(checkingField, figure);
            if (isAvaliable === false) break;
        }
    }

    function isFieldAvaliable(checkingField, figure) {
        checkingField.td.classList.add('checkField-avaliable');
        let isAvaliable = true;
        if (checkingField.pawn) {
            checkingField.pawn.color === figure.color ? checkingField.td.classList.add('checkField-friendly') : checkingField.td.classList.add('checkField-enemy');
            isAvaliable = false;
        }
        return isAvaliable;
    }
        
    // Figure.pawn.prototype = {
    //     sayHi : ()=> alert('hi'),
    // }
    

//prototyp figure.pawn, figur.rook
