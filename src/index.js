const btnData = [
    {
        id: 'clear',
        symbolKeys: 'AC'
    },
    {
        id: 'backspace',
        symbolKeys: '<='
    },
    {
        id: 'divide',
        symbolKeys: '/'
    },
    {
        id: 'seven',
        symbolKeys: '7'
    },
    {
        id: 'eight',
        symbolKeys: '8'
    },
    {
        id: 'nine',
        symbolKeys: '9'
    },
    {
        id: 'multiply',
        symbolKeys: 'x'
    },
    {
        id: 'four',
        symbolKeys: '4'
    },
    {
        id: 'five',
        symbolKeys: '5'
    },
    {
        id: 'six',
        symbolKeys: '6'
    },
    {
        id: 'subtract',
        symbolKeys: '-'
    },
    {
        id: 'one',
        symbolKeys: '1'
    },
    {
        id: 'two',
        symbolKeys: '2'
    },
    {
        id: 'three',
        symbolKeys: '3'
    },
    {
        id: 'add',
        symbolKeys: '+'
    },
    {
        id: 'zero',
        symbolKeys: '0'
    },
    {
        id: 'decimal',
        symbolKeys: '.'
    },
    {
        id: 'equals',
        symbolKeys: '='
    }
]

function App() {

    const [stateAll, setAll] = React.useState({ allVal: '0' })
    const [stateValue, setValue] = React.useState({ curVal: '0' })

    const handleKey = (symbol) => {
        const isDigit = (/[0-9]/).test(symbol)
        const isOperator = (/[x/+-]/).test(symbol)
        var digit, operator
        if (isDigit) {
            digit = symbol
        }

        if (isOperator) {
            operator = symbol
        }

        switch (symbol) {
            case 'AC':
                setAll({ allVal: '0' })
                setValue({ curVal: '0' })
                break
            case digit:
                if (stateValue.curVal.length <= 18) {
                    setAll({
                        allVal: stateAll.allVal === '0' || /=/g.test(stateAll.allVal) //если выражение равно нулю или содержит знак равно
                            ? symbol //то выражение заменяем на введенный с клавиатуры символ
                            : stateAll.allVal + symbol //иначе, введенный символ добавляем к выражению
                    })
                    setValue({
                        curVal: stateValue.curVal === '0' || (/[x/+-]/).test(stateValue.curVal) || /=/g.test(stateAll.allVal)
                            ? symbol : stateValue.curVal + symbol
                    })
                } else {
                    const prevVal = stateValue.curVal
                    setValue({ curVal: 'Digit Limit Met' })
                    setTimeout(() => setValue({ curVal: prevVal }), 1000)
                }
                break
            case operator:
                setAll({
                    allVal: /=/g.test(stateAll.allVal) //если в выражении есть знак "равно"
                        ? stateAll.allVal.match(/[\-0-9\.]+$/) + symbol //то выделяем после "равно" минус(если есть) и число и добавляем к числу введенный оператор
                        : (/\.$/).test(stateAll.allVal) //иначе, если есть точка в конце выражения
                            ? stateAll.allVal.slice(0, -1) + symbol //то удаляем точку и добавляем в конец выражения введенный оператор
                            : (/[x/+]$/).test(stateAll.allVal) && symbol === '-' //иначе, если конце выражения есть "x", "/" или "+" и введенный оператор равен "-"
                                ? stateAll.allVal + '-' //то в конец выражения добавляем оператор "-"
                                : (/[-]$/).test(stateAll.allVal) && symbol === '-' //иначе, если в конце выражения "-" и введенный оператор равен "-"
                                    ? stateAll.allVal //то ничего не меняем
                                    : (/[x/+][-]$/).test(stateAll.allVal) && symbol !== '-' //иначе, если в конце выражения есть любой из операторов "x", "/", "+" или "-" и введенный оператор не равен "-"
                                        ? stateAll.allVal.slice(0, -2) + symbol//то в конце выражения удаляем два оператора и добавляем введенный оператор
                                        : (/[x/+-]$/).test(stateAll.allVal) && symbol !== '-' //иначе, если в конце "x", "/", "+" или "-" и введенный оператор "-"
                                            ? stateAll.allVal.slice(0, -1) + symbol //то удаляем "x", "/", "+" или "-" и добавляем в конец выражения введеннный оператор
                                            : stateAll.allVal + symbol //иначе, добаляем введенный оператор
                })
                setValue({ curVal: symbol })
                break
            case '.':
                setAll({
                    allVal: /=/g.test(stateAll.allVal) //если в выражении есть знак "равно"
                        ? '0.' //то выражение заменяем на ноль с точкой
                        : /[x/+-]$/.test(stateAll.allVal) //иначе, если в конце выражения есть любой из операторов "x", "/", "+" или "-"
                            ? stateAll.allVal + '0.' //то к выражению добавляем ноль с точкой
                            : /\./g.test(stateAll.allVal.match(/[0-9]*\.?[0-9]*$/)[0])
                                ? stateAll.allVal
                                : stateAll.allVal + '.'
                })
                setValue({
                    curVal: /=/g.test(stateAll.allVal) //если в выражении есть знак "равно"
                        ? '0.' //то значение заменяем на ноль с точкой
                        : /[x/+-]/.test(stateValue.curVal) //иначе, если в текущем значении есть любой из операторов "x", "/", "+" или "-"
                            ? '0.' : /\./g.test(stateValue.curVal) //то на место оператора ставится ноль с точкой, иначе, проверяется наличие точки
                                ? stateValue.curVal : stateValue.curVal + '.' //если точка есть, то значение не меняется, если же точки нет, то к значению добавляется точка
                })
                break
            case '=':
                setAll({
                    allVal: /[=]/g.test(stateAll.allVal) || /[x/+-]$/.test(stateAll.allVal) //если в выражении есть "=" или в конце выржения присутствует любой из операторов "x", "/", "+" или "-"
                        ? stateAll.allVal //то выражение не меняется
                        : /[x/+-]/g.test(stateAll.allVal) //иначе, если в выражении присутствует любой из операторов "x", "/", "+" или "-"
                            ? stateAll.allVal + '=' + eval(stateAll.allVal.replace(/x/g, '*')) //то к выражению добавляем знак "равно" и результат вычислений
                            : stateAll.allVal //иначе выражение не меняется
                })
                setValue({
                    curVal: /[=]/g.test(stateAll.allVal) //если в выражении есть "="
                        ? stateValue.curVal //то значение не меняется
                        : /[x/+-]/.test(stateValue.curVal) || stateValue.curVal === '0.' //иначе, если в текущем значении есть любой из операторов "x", "/", "+", "-" или текущее значение равно нулю с точкой
                            ? stateValue.curVal //то значение остается прежним
                            : '' + eval(stateAll.allVal.replace(/x/g, '*')) //иначе, показываем результат вычислений (пустые кавычки приводят результат вычислений к строчному типу)
                })
                break
            case '<=':
                setAll({ allVal: backspace(stateAll.allVal) })
                setValue({ curVal: backspace(stateAll.allVal, stateValue.curVal) })
        }


        function backspace(arg1, arg2 = arg1) {
            return (
                /[=]/g.test(arg1) //если в выражении есть "="
                    ? '0' //то обнуляем выражение
                    : arg2.length === 1 //иначе, если длина строки выражения равна одному символу
                        ? '0' //то обнуляем выражение
                        : arg2.slice(0, -1) //иначе, удаляем последний символ
            )
        }
    }

    return (
        <div className='calc'>
            <Display
                allVal={stateAll.allVal}
                curVal={stateValue.curVal}
            />

            <div className='padButtons'>
                {btnData.map((item) => {
                    let double = ''
                    if (item.symbolKeys === 'AC') {
                        double = ' doubleW'
                    }
                    if (item.symbolKeys === '+') {
                        double = ' doubleH'
                    }
                    return (
                        <Button
                            key={item.id}
                            double={double}
                            id={item.id}
                            symbolKeys={item.symbolKeys}
                            handleKey={handleKey}
                        />
                    )
                })}
            </div>
        </div>
    )
}

function Display(props) {
    return (
        <div>
            <div className='expression'>{props.allVal}</div>
            <div id='display' className='display'>{props.curVal}</div>
        </div>
    )
}

function Button(props) {

    function handleKey() {
        props.handleKey(props.symbolKeys)
    }

    return (
        <button
            className={'buttons' + props.double}
            id={props.id}
            onClick={handleKey}
        >
            {props.symbolKeys}
        </button>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))