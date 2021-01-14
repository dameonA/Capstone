import React from 'react'

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username:"",
            password:""
        };
    }
    handleInputChange= (name,value)=> { 
        let obj = {};
        obj[name]=value;
        this.setState(obj);
    }
    login = async (event)=>{
        event.preventDefault();
        let loggedin = await fetch(this.props.api+"auth", {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(async loggedin=>{if(!loggedin.ok){throw("Failed to login")};return loggedin.json()})
        .then(user=>{
            this.props.handleLogIn(user)
        }).catch(err=>console.log("cannot fetch: ",err));
    }
    render() {
        return (
            <form onSubmit={this.login}>
                <label htmlFor='username'>Username</label>
                <input id='username' onChange={(evt)=>this.handleInputChange('username',evt.target.value)} value={this.state.username} />
                <label htmlFor='password'>Password</label>
                <input id='password' type='password' onChange={(evt)=>this.handleInputChange('password',evt.target.value)} value={this.state.password} />
                <button type="submit" id='login' >Login</button>
            </form>
            
        )
    }
}
export default LoginForm;