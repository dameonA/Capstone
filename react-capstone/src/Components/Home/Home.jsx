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

            </div>

        )
    }
}