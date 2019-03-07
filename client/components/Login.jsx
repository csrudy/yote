import React from 'react';
const Login = (props) => {

    function signUp() {
        const obj = { username: props.textValue }
        console.log(props.textValue)
        fetch('http://localhost:3000/', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => {console.log('success', JSON.stringify(response))})
            .catch(err => console.log(err))
    }
    return (
        <div className='login'>
            <input id='username' value={props.textValue} onChange={(e)=>props.updateInput(e.target.value)} type='text'></input>
            <button onClick={signUp}>Sign Up</button>
        </div>
    )
} 

export default Login;

