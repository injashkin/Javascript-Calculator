const btnData = [
    {
        id: 'clear',
        symbolKeys: 'AC'
    },
    {
        id: 'equals',
        symbolKeys: '='
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
        id: 'subtract',
        symbolKeys: '-'
    },
    {
        id: 'multiply',
        symbolKeys: 'x'
    },
    {
        id: 'divide',
        symbolKeys: '/'
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
]

const buttons = btnData.map((item) => {
    let double = ''
    if (item.symbolKeys === 'AC' | item.symbolKeys === '0') {
        double = ' doubleW'
    }
    if (item.symbolKeys === '+') {
        double = ' doubleH'
    }
    return (
        <button
            key={item.id}
            className={'buttons' + double}
            id={item.id}
        >
            {item.symbolKeys}
        </button>
    )
})

function App() {
    return (
        <div className='calc'>
            <div id='display'>This is display</div>
            <div className='padButtons'>
                {buttons}
            </div>
        </div>
    )
}
ReactDOM.render(<App />, document.getElementById('root'))