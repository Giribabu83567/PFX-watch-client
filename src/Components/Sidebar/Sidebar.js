import './Sidebar.css';
import React from 'react';

import { FaHome } from "react-icons/fa";
import { FaFire } from "react-icons/fa";
import { SiYoutubegaming } from "react-icons/si";
import { FaBookmark } from "react-icons/fa";

import { Link } from 'react-router-dom';

const Sidebar = () => {
    
    return(
       <div className="sidebar-container" id="collapsibleNavbar">
            <Link to={'/'} className='sidebar-link-items'>
                <div className='sidebar-content' id='sidebar-home'>
                    <FaHome className='sidebar-icons'/>
                    <div className='sidebar-page'>Home</div>
                </div>
            </Link>
           
            <Link to={'/trending'} className='sidebar-link-items'>
                <div className='sidebar-content' id='sidebar-trending'>
                    <FaFire className='sidebar-icons'/>
                    <div className='sidebar-page'>Trending</div>
                </div>
            </Link>

            <Link to={'/gaming'} className='sidebar-link-items'>
                <div className='sidebar-content' id='sidebar-game'>
                    <SiYoutubegaming className='sidebar-icons'/>
                    <div className='sidebar-page'>Gamming</div>
                </div>
            </Link>

            <Link to={'/saved'} className='sidebar-link-items'>
                <div className='sidebar-content' id='sidebar-save'>
                    <FaBookmark className='sidebar-icons'/>
                    <div className='sidebar-page'>Saved</div>
                </div>
            </Link>
       </div>
    )
};

export default Sidebar;