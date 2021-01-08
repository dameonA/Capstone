import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { ScheduleHomePage } from './ScheduleHomePage/ScheduleHomePage';
import './Navapp.css';
import { IconContext } from 'react-icons';

function Navbar() {
  const [homepage, setHomePage] = useState(false);

  const showHomePage = () => setHomePage(!homepage);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff'}}>
        <div className='navbar'>
          <Link to="#" className='menu-bars'>
          <FaIcons.FaBars onClick={showHomepage}/>
          </Link>
        </div>
        <nav className={homepage ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items'>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose/>
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
        </IconContext.Provider>
    </>
  );
}

export default Navbar;