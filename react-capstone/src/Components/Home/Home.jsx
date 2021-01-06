import React from 'react'
import logo from '../Assets/logo.png'

export default class Home extends React.Component{
    render(){
        return(
            <div>
                <img src={logo} alt="logo" align="center"/>
            </div>
        )
    }
}