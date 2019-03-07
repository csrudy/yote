import React from 'react';
import SignUp from './SignUp.jsx';
import Portfolio from "./Portfolio.jsx"
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
class App extends React.Component {
    constructor(props) {
        super(props);
        const userId = window.location.pathname.replace("/", "");
        this.state = {
            signedUp: userId !== "",
            userId,
        }
    }

    updateInput(value) {
        this.setState({ input: value })
    }
    render() {
        const { signedUp, userId } = this.state;

        if (signedUp) {
            return <Portfolio userId={userId}></Portfolio>
        } else {
            return (
                <div id="app">
                    <SignUp />
                </div>
            )
        }
    }


}

export default App;