// var figures = (function() {

    function Figure(type, color, id) {
        let self = this;
        this.element = createElement(type, color, id);
        this.type = type;
        this.id = id;
        this.color = color;

        function createElement(type, color, id) {
            let element = document.createElement('img');
            element.src = figureTypes[type].shape[color];
            element.classList.add(color);
            element.id = `${id}`;
            element.type = `${type}`;

            element.addEventListener('click', (e)=> {
                console.log(self);
            });
            return element;
        }
    }

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

//     return {
//         Figure: Figure(),
//     };
// })();