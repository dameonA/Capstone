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
    login = async ()=>{
        let loggedin = await fetch(this.props.api+"/auth", {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch(err=>console.log("cannot fetch: ",err));
        if (loggedin.ok) {
            loggedin = (await loggedin.json()).user;
            this.props.handleLogIn(loggedin)
        }
    }
    render() {
        return (
            <form>
                <label htmlFor='username'>Username</label>
                <input id='username' onChange={(evt)=>this.handleInputChange('username',evt.target.value)} value={this.state.username} />
                <label htmlFor='password'>Password</label>
                <input id='password' type='password' onChange={(evt)=>this.handleInputChange('password',evt.target.value)} value={this.state.password} />
                <button type="button" id='login' onClick={()=>this.login()} >Login</button>
            </form>
            
        )
    }
}
export default LoginForm;