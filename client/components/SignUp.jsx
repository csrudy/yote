import React from 'react';
export default class SignUp extends React.Component {
    constructor(props) {
        
        super(props);
        this.updateInput = this.updateInput.bind(this);
        this.signUp = this.signUp.bind(this);
        this.state = {
            textValue: "",
            signupSuccessful: false,
            userId: "",
        }
    }

    signUp() {
        const { textValue } = this.state
        const obj = { username: textValue }
        console.log(textValue)
        fetch('http://localhost:3000/api/v1/users', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(({ id, username }) => this.setState({
            signupSuccessful: true,
            userId: id,
        }))
        .catch(err => console.log(err)) 
    }

    updateInput(value) {
        this.setState({ textValue: value })
    }

    render() {
        const { textValue, signupSuccessful, userId } = this.state;
        if (signupSuccessful) {
            return (
                <div>
                    <p>SAVE THIS SUPER SECRET ID: {userId}</p>
                    <button><a href={`/${userId}`}>Go to porfolio</a></button>
                </div>
            )
        } else {
            return (
                <div className='login'>
                    <p>Sign up for Yote</p>
                    <input id='username' value={textValue} onChange={(e)=>this.updateInput(e.target.value)} type='text'></input>
                    <button onClick={this.signUp}>Sign Up</button>
                </div>
            )
        }
    }
} 