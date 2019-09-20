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
                    allVal: stateAll.allVal === '0' || /=/g.test(stateAll.allVal) //если выражение равно нулю или содержит знак равно
                    ? symbol //то выражение заменяем на введенный с клавиатуры символ
                    : stateAll.allVal + symbol //иначе, введенный символ добавляем к выражению
                });
                setValue({
                    curVal: stateValue.curVal === '0' || /[x/+-]/.test(stateValue.curVal) || /=/g.test(stateAll.allVal) ? symbol : stateValue.curVal + symbol
                });
                break;
            case operator:
                setAll({
                    allVal: /=/g.test(stateAll.allVal) //если в выражении есть знак "равно"
                    ? stateAll.allVal.match(/[0-9\.]+$/) + symbol //то выделяем число после "равно" и добавляем к числу введенный оператор
                    : /\.$/.test(stateAll.allVal) //иначе, проверяем наличие точки в конце выражения
                    ? stateAll.allVal.slice(0, -1) + symbol //если точка есть, то удаляем ее и добавляем в конец выражения введенный оператор
                    : /[x/+]$/.test(stateAll.allVal) && symbol === '-' //если точки нет, то проверяем, чтобы в конце выражения был любой из операторов "x", "/" или "+" и введенный оператор был "-"
                    ? stateAll.allVal + '-' //если это так, то в конец выражения добавляем оператор "-"
                    : /[-]$/.test(stateAll.allVal) && symbol === '-' //если же нет, то проверяем, чтобы в конце был "-" и введенный оператор был "-"
                    ? stateAll.allVal //если это так, то ничего не меняем
                    : /[x/+][-]$/.test(stateAll.allVal) && symbol !== '-' //если же нет, то проверяем, чтобы в конце был любой из операторов "x", "/", "+" или "-" и введенный оператор не был "-"
                    ? stateAll.allVal.slice(0, -2) + symbol //если это так, то в конце удаляем два оператора и добавляем введенный оператор
                    : /[x/+-]$/.test(stateAll.allVal) && symbol !== '-' //если же нет, то проверяем, чтобы в конце был "x", "/", "+" или "-" и введенный оператор не был "-"
                    ? stateAll.allVal.slice(0, -1) + symbol //если это так, то удаляем его и добавляем в конец выражения вновь введеннный оператор
                    : stateAll.allVal + symbol //если же нет, то просто добаляем введенный оператор
                });
                setValue({ curVal: symbol });
                break;
            case '.':
                setAll({
                    allVal: /=/g.test(stateAll.allVal) //если в выражении есть знак "равно"
                    ? '0.' //то выражение заменяем на ноль с точкой
                    : /[x/+-]$/.test(stateAll.allVal) //иначе, если в конце выражения есть любой из операторов "x", "/", "+" или "-"
                    ? stateAll.allVal + '0.' //то к выражению добавляем ноль с точкой
                    : /\./g.test(stateAll.allVal.match(/[0-9]*\.?[0-9]*$/)[0]) ? stateAll.allVal : stateAll.allVal + '.'
                });
                setValue({
                    curVal: /=/g.test(stateAll.allVal) //если в выражении есть знак "равно"
                    ? '0.' //то значение заменяем на ноль с точкой
                    : /[x/+-]/.test(stateValue.curVal) //иначе, если в текущем значении есть любой из операторов "x", "/", "+" или "-"
                    ? '0.' : /\./g.test(stateValue.curVal) //то на место оператора ставится ноль с точкой, иначе, проверяется наличие точки
                    ? stateValue.curVal : stateValue.curVal + '.' //если точка есть, то значение не меняется, если же точки нет, то к значению добавляется точка
                });
                break;
            case '=':
                setAll({
                    allVal: /[=]/g.test(stateAll.allVal) || /[x/+-]$/.test(stateAll.allVal) //если в выражении есть "=" или в конце выржения присутствует любой из операторов "x", "/", "+" или "-"
                    ? stateAll.allVal //то выражение не меняется
                    : /[x/+-]/g.test(stateAll.allVal) //иначе, если в выражении присутствует любой из операторов "x", "/", "+" или "-"
                    ? stateAll.allVal + '=' + eval(stateAll.allVal.replace(/x/g, '*')) //то к выражению добавляем знак "равно" и результат вычислений
                    : stateAll.allVal //иначе выражение не меняется
                });
                setValue({
                    curVal: /[=]/g.test(stateAll.allVal) //если в выражении есть "="
                    ? stateValue.curVal //то значение не меняется
                    : /[x/+-]/.test(stateValue.curVal) || stateValue.curVal === '0.' //иначе, если в текущем значении есть любой из операторов "x", "/", "+", "-" или текущее значение равно нулю с точкой
                    ? stateValue.curVal //то значение остается прежним
                    : '' + eval(stateAll.allVal.replace(/x/g, '*')) //иначе, показываем результат вычислений (пустые кавычки приводят результат вычислений к строчному типу)
                });
                break;
            case '<=':
                setAll({ allVal: backspace(stateAll.allVal) });
                setValue({ curVal: backspace(stateAll.allVal, stateValue.curVal) });
        }

        function backspace(arg1) {
            var arg2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : arg1;

            return (/[=]/g.test(arg1) //если в выражении есть "="
                ? '0' //то обнуляем выражение
                : arg2.length === 1 //иначе, если длина строки выражения равна одному символу
                ? '0' //то обнуляем выражение
                : arg2.slice(0, -1) //иначе, удаляем последний символ

            );
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