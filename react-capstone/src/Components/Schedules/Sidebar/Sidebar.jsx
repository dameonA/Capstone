import React from 'react'

import { SidebarData } from './SidebarData'
function Sidebar() {
    return (
        <div className="Sidebar">
            <ul className="SidebarList">
            {SidebarData.map((val, key) => {
                return(
                    <li 
                    key={key}
                    className="row" 
                    id={window.pathname == val.link ? "active" : ""}
                    onClick={() => {
                        window.location.pathname = val.link
                        }}
                        >
                        <div id="icon">{val.icon}</div>
                        <div id="title">
                            {val.title}
                        </div>
                    </li>
                );
            })} 
            </ul>      
        </div>
    );
}

export default Sidebar;


// import React, { Component } from 'react'
// import { MenuItems } from './MenuItems'
// import './Navbar.css'


// class Navbar extends Component{
//     state = { clicked: false}
    
//     handleClick = () => {
//         this.setState({ clicked: !this.state.clicked })
//     }
//     render(){
//         return(
//             <nav className="NavbarItems">
//                 <h1 className="navbar-logo">React<i className="fab fa-react"></
//                 i></h1>
//                 <div className="menu-icon" onClick={this.handleClick}>
//                     <i className={this.state.clicked ? 'fas fa-times' : 
//                     'fas fa-bars'}></i>

//                 </div>
//                 <ul className={this.state.clicked ? 'nav-menu active' : 
//             'nav-menu'}>
//                     {MenuItems.map((item, index) => {
//                         return(
//                         <li key={index}>
//                             <a className={item.cName} href={item.url}>
//                                 {item.title}
//                             </a>
//                             </li>
//                         )
//                     })}            
//                 </ul>
//             </nav>
//         )
//     }
// }

// export default Navbar