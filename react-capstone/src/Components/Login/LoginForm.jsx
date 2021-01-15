import React from 'react'
import logo from '../Assets/logo.png'

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
            <div 
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <img src={logo} alt="logo" />
                {this.props.user
                ? <h1>Welcome {this.props.user.first_name} {this.props.user.last_name} </h1>
                :""
                }

           
                <form onSubmit={this.login}>
                    <label htmlFor='username'>Username</label>
                    <input id='username' onChange={(evt)=>this.handleInputChange('username',evt.target.value)} value={this.state.username} />
                    <label htmlFor='password'>Password</label>
                    <input id='password' type='password' onChange={(evt)=>this.handleInputChange('password',evt.target.value)} value={this.state.password} />
                    <button type="submit" id='login' >Login</button>
                </form>
             </div>
        )
    }
}
export default LoginForm;