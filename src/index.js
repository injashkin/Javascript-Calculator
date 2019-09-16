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
    //const [stateOperator, setOperator] = React.useState({ operator: '' })

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
                    allVal:
                        stateAll.allVal === '0'
                            ? symbol : stateAll.allVal + symbol
                })
                setValue({
                    curVal:
                        stateValue.curVal === '0' || (/[x/+-]/).test(stateValue.curVal)
                            ? symbol : stateValue.curVal + symbol
                })
                break
            case operator:
                setAll({
                    allVal:
                        (/[x/+-]$/).test(stateAll.allVal)
                            ? stateAll.allVal.slice(0, -1) + symbol
                            : stateAll.allVal + symbol
                })
                setValue({ curVal: symbol })
                break
            case '.':
                setAll({
                    allVal: stateAll.allVal + symbol
                })
                setValue({
                    curVal:
                        stateValue.curVal.includes('.')  //indexOf('.') !== -1 - Другой вариант поиска данного символа в строке
                        ? stateValue.curVal : stateValue.curVal + symbol
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