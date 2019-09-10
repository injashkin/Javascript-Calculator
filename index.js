function App() {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'div',
            { id: 'display' },
            'This is display'
        ),
        React.createElement(
            'button',
            { id: 'equals' },
            '='
        ),
        React.createElement(
            'button',
            { id: 'zero' },
            '0'
        ),
        React.createElement(
            'button',
            { id: 'one' },
            '1'
        ),
        React.createElement(
            'button',
            { id: 'two' },
            '2'
        ),
        React.createElement(
            'button',
            { id: 'three' },
            '3'
        ),
        React.createElement(
            'button',
            { id: 'four' },
            '4'
        ),
        React.createElement(
            'button',
            { id: 'five' },
            '5'
        ),
        React.createElement(
            'button',
            { id: 'six' },
            '6'
        ),
        React.createElement(
            'button',
            { id: 'seven' },
            '7'
        ),
        React.createElement(
            'button',
            { id: 'eight' },
            '8'
        ),
        React.createElement(
            'button',
            { id: 'nine' },
            '9'
        ),
        React.createElement(
            'button',
            { id: 'add' },
            '+'
        ),
        React.createElement(
            'button',
            { id: 'subtract' },
            '-'
        ),
        React.createElement(
            'button',
            { id: 'multiply' },
            'x'
        ),
        React.createElement(
            'button',
            { id: 'divide' },
            '/'
        ),
        React.createElement(
            'button',
            { id: 'decimal' },
            '.'
        ),
        React.createElement(
            'button',
            { id: 'clear' },
            'AC'
        )
    );
}
ReactDOM.render(React.createElement(App, null), document.getElementById('root'));