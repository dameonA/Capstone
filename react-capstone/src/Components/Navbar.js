import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ScheduleHomePage } from './ScheduleHomePage';
import '../App.css';

function Navbar() {
  const [homepage, setHomePage] = useState(false);

  const showHomePage = () => setHomePage(!homepage);

  return (
    <>
        <div className='navbar'>
          <Link to='#' className='menu-bars' onClick={showHomePage} >
          </Link>
        </div>
        <nav className={homepage ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showHomePage}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
              </Link>
            </li>
            {ScheduleHomePage.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
    </>
  );
}

export default Navbar;