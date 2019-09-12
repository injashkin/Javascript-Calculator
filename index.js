var btnData = [{
    id: 'clear',
    symbolKeys: 'AC'
}, {
    id: 'backspace',
    symbolKeys: '=>'
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

var buttons = btnData.map(function (item) {
    var double = '';
    if (item.symbolKeys === 'AC') {
        double = ' doubleW';
    }
    if (item.symbolKeys === '+') {
        double = ' doubleH';
    }
    return React.createElement(
        'button',
        {
            key: item.id,
            className: 'buttons' + double,
            id: item.id
        },
        item.symbolKeys
    );
});

function App() {
    return React.createElement(
        'div',
        { className: 'calc' },
        React.createElement(
            'div',
            { id: 'display' },
            'This is display'
        ),
        React.createElement(
            'div',
            { className: 'padButtons' },
            buttons
        )
    );
}
ReactDOM.render(React.createElement(App, null), document.getElementById('root'));