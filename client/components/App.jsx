import React from 'react';
import Login from './Login.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.updateInput = this.updateInput.bind(this);
        this.state = {
            input: ''
        }
    }

    updateInput(value) {
        this.setState({input: value})
    }
    render() { return <div id="app">
            <Login textValue={this.state.input} updateInput={this.updateInput}/>
        </div>; }
}

export default App;