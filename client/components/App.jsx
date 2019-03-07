import React from 'react';
import Login from './Login.jsx';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.updateInput = this.updateInput.bind(this);
        this.state = {
            input: '',
            isLoggedin: false
        }
    }

    updateInput(value) {
        this.setState({ input: value })
    }
    render() {
        return (
            <div id="app">
                <Login textValue={this.state.input} updateInput={this.updateInput} />
            </div>
    )

    }


}

export default App;