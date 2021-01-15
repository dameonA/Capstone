import React from 'react'
import logo from '../Assets/logo.png'




export default class Home extends React.Component{
    constructor(props) {
        super(props)
    }
    render(){
        return(
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

            </div>

        )
    }
}