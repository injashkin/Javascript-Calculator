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
        id: 'multiply',
        symbolKeys: 'x'
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
        id: 'divide',
        symbolKeys: '/'
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
    const [stateEquvals, setEquvals] = React.useState({ equvals: false })

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
                setAll({
                    allVal: stateAll.allVal === '0' || stateAll.allVal.includes('=')
                        ? symbol
                        : stateAll.allVal + symbol //, console.log(symbol))
                })
                setValue({
                    curVal: stateValue.curVal === '0' || (/[x/+-]/).test(stateValue.curVal)
                        ? symbol : stateValue.curVal + symbol
                })
                break
            case operator:
                setAll({
                    allVal: /=/g.test(stateAll.allVal)
                        ? stateAll.allVal.match(/[0-9\.]+$/) + symbol
                        : (/\.$/).test(stateAll.allVal) //проверяем наличие точки в конце общего выражения
                            ? stateAll.allVal.slice(0, -1) + symbol //если точка есть, то удаляем ее и добавляем в конец выражения введенный оператор
                            : (/[x/+]$/).test(stateAll.allVal) && symbol === '-' //если точки нет, то проверяем, чтобы в конце выражения был любой из операторов "x", "/" или "+" и введенный оператор был "-"
                                ? stateAll.allVal + '-' //если это так, то в конец выражения добавляем оператор "-"
                                : (/[-]$/).test(stateAll.allVal) && symbol === '-' //если же нет, то проверяем, чтобы в конце был "-" и введенный оператор был "-"
                                    ? stateAll.allVal //если это так, то ничего не меняем
                                    : (/[x/+][-]$/).test(stateAll.allVal) && symbol !== '-' //если же нет, то проверяем, чтобы в конце был любой из операторов "x", "/", "+" или "-" и введенный оператор не был "-"
                                        ? stateAll.allVal.slice(0, -2) + symbol//если это так, то в конце удаляем два оператора и добавляем введенный оператор
                                        : (/[x/+-]$/).test(stateAll.allVal) && symbol !== '-' //если же нет, то проверяем, чтобы в конце был "x", "/", "+" или "-" и введенный оператор не был "-"
                                            ? stateAll.allVal.slice(0, -1) + symbol //если это так, то удаляем его и добавляем в конец выражения вновь введеннный оператор
                                            : stateAll.allVal + symbol //если же нет, то просто добаляем введенный оператор
                })
                setValue({ curVal: symbol })
                break
            case '.':
                setAll({
                    allVal: /[x/+-]$/.test(stateAll.allVal)
                        ? stateAll.allVal + '0.'
                        : stateAll.allVal.match(/[0-9]*\.?[0-9]*$/)[0].includes('.')  //indexOf('.') !== -1 - Другой вариант поиска данного символа в строке
                            ? stateAll.allVal
                            : stateAll.allVal + '.'
                })
                setValue({
                    curVal: /[x/+-]/.test(stateValue.curVal) //проверка наличия оператора в текущем выражении
                        ? '0.' : stateValue.curVal.includes('.') //если есть оператор, то на место оператора ставится '0.' (ноль с точкой), а если же нет оператора, то проверяется наличие точки
                            ? stateValue.curVal : stateValue.curVal + '.' //если точка есть, то выражение не меняется, если же точки нет, то к выражению добавляется точка
                })
                break
            case '=':
                //console.log(stateAll.allVal)                             
                setAll({
                    allVal: /[=]/g.test(stateAll.allVal) || /[x/+-]$/.test(stateAll.allVal) //если в выражении есть "=" или в конце присутствует любой из операторов "x", "/", "+" или "-"
                        ? stateAll.allVal //то выражение не меняется
                        : /[x/+-]/g.test(stateAll.allVal)
                            ? stateAll.allVal + '=' + eval(stateAll.allVal.replace(/x/g, '*'))
                            : stateAll.allVal
                })
                break
            default:
                //setDisplay({ display: symbol })
                break
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
            <div id='display'>{props.allVal}</div>
            <div id='display'>{props.curVal}</div>
        </div>
    )
}

//function Equals(props) {
//    console.log('equvals в Equals равен ' + props.equvals)
//    return (null)
//}

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