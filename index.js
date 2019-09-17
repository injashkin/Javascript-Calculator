var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var btnData = [{
    id: 'clear',
    symbolKeys: 'AC'
}, {
    id: 'backspace',
    symbolKeys: '<='
}, {
    id: 'multiply',
    symbolKeys: 'x'
}, {
    id: 'seven',
    symbolKeys: '7'
}, {
    id: 'eight',
    symbolKeys: '8'
}, {
    id: 'nine',
    symbolKeys: '9'
}, {
    id: 'divide',
    symbolKeys: '/'
}, {
    id: 'four',
    symbolKeys: '4'
}, {
    id: 'five',
    symbolKeys: '5'
}, {
    id: 'six',
    symbolKeys: '6'
}, {
    id: 'subtract',
    symbolKeys: '-'
}, {
    id: 'one',
    symbolKeys: '1'
}, {
    id: 'two',
    symbolKeys: '2'
}, {
    id: 'three',
    symbolKeys: '3'
}, {
    id: 'add',
    symbolKeys: '+'
}, {
    id: 'zero',
    symbolKeys: '0'
}, {
    id: 'decimal',
    symbolKeys: '.'
}, {
    id: 'equals',
    symbolKeys: '='
}];

function App() {
    var _React$useState = React.useState({ allVal: '0' }),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        stateAll = _React$useState2[0],
        setAll = _React$useState2[1];

    var _React$useState3 = React.useState({ curVal: '0' }),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        stateValue = _React$useState4[0],
        setValue = _React$useState4[1];
    //const [stateOperator, setOperator] = React.useState({ operator: '' })

    var handleKey = function handleKey(symbol) {
        var isDigit = /[0-9]/.test(symbol);
        var isOperator = /[x/+-]/.test(symbol);
        var digit, operator;
        if (isDigit) {
            digit = symbol;
        }
        if (isOperator) {
            operator = symbol;
        }
        switch (symbol) {
            case 'AC':
                setAll({ allVal: '0' });
                setValue({ curVal: '0' });
                break;
            case digit:
                setAll({
                    allVal: stateAll.allVal === '0' ? symbol : stateAll.allVal + symbol
                });
                setValue({
                    curVal: stateValue.curVal === '0' || /[x/+-]/.test(stateValue.curVal) ? symbol : stateValue.curVal + symbol
                });
                break;
            case operator:
                setAll({
                    allVal: /\.$/.test(stateAll.allVal) //проверяем наличие точки в конце общего выражения
                    ? stateAll.allVal.slice(0, -1) + symbol //если точка есть, то удаляем ее и добавляем в конец выражения введенный оператор
                    : /[x/+-]$/.test(stateAll.allVal) //если же точки нет, то проверяем наличие в конце выражения любого из операторов
                    ? stateAll.allVal.slice(0, -1) + symbol //если какой-нибудь оператор присутствует, то удаляем его и добавляем в конец выражения вновь введеннный оператор
                    : stateAll.allVal + symbol //если же в конце выражения никакого оператора нет, то просто добаляем введенный оператор
                });
                setValue({ curVal: symbol });
                break;
            case '.':
                setAll({
                    allVal: /[x/+-]$/.test(stateAll.allVal) ? stateAll.allVal + '0.' : stateAll.allVal.match(/[0-9]*\.?[0-9]*$/)[0].includes('.') //indexOf('.') !== -1 - Другой вариант поиска данного символа в строке
                    ? stateAll.allVal : stateAll.allVal + '.'
                });
                setValue({
                    curVal: /[x/+-]/.test(stateValue.curVal) //проверка наличия оператора в текущем выражении
                    ? '0.' : stateValue.curVal.includes('.') //если есть оператор, то на место оператора ставится '0.' (ноль с точкой), а если же нет оператора, то проверяется наличие точки
                    ? stateValue.curVal : stateValue.curVal + '.' //если точка есть, то выражение не меняется, если же точки нет, то к выражению добавляется точка
                });
                break;
            default:
                //setDisplay({ display: symbol })
                break;
        }
    };

    return React.createElement(
        'div',
        { className: 'calc' },
        React.createElement(Display, {
            allVal: stateAll.allVal,
            curVal: stateValue.curVal
        }),
        React.createElement(
            'div',
            { className: 'padButtons' },
            btnData.map(function (item) {
                var double = '';
                if (item.symbolKeys === 'AC') {
                    double = ' doubleW';
                }
                if (item.symbolKeys === '+') {
                    double = ' doubleH';
                }
                return React.createElement(Button, {
                    key: item.id,
                    double: double,
                    id: item.id,
                    symbolKeys: item.symbolKeys,
                    handleKey: handleKey
                });
            })
        )
    );
}

function Display(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'div',
            { id: 'display' },
            props.allVal
        ),
        React.createElement(
            'div',
            { id: 'display' },
            props.curVal
        )
    );
}

function Button(props) {

    function handleKey() {
        props.handleKey(props.symbolKeys);
    }

    return React.createElement(
        'button',
        {
            className: 'buttons' + props.double,
            id: props.id,
            onClick: handleKey
        },
        props.symbolKeys
    );
}

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));