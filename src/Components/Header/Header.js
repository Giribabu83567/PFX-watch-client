import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './Header.css';

import { IoMoonOutline } from "react-icons/io5";
import { FiSun } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

import axios from "axios";

import { useTheme } from '../../ThemeContext';
const Header = () => {
    
    const { theme, toggleTheme } = useTheme()

    let navigate = useNavigate()
    // const [theme, setTheme] = useState();

    const [profile, setProfile] = useState({})
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        getProfileDetails()
    }, []);

    const getProfileDetails = async () => {
        try {
            let token = Cookies.get('jwtToken')
            const url = 'http://localhost:4003/auth/profile'
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const response = await axios.get(url, { headers })
            
            if (response.status === 200) {
                
                setProfile(response.data.userProfile)
            }
            else {
                throw new Error(`Failed to fetch profile: ${response.status} ${response.statusText}`)
            }
        }
        catch (error) {
            setError(error.message)
        }
        finally {
            setLoading(false)
        }
    };
    if (loading) {
        return <div>Loading...</div>; // Display a loading indicator while fetching data
    }
    if (error) {
        return <div>Error: {error}</div>; // Display an error message if fetching fails
    }

    const confirmLogout = () => {
        Cookies.remove('jwtToken');
        navigate('/auth');
    };

    // const changeTheme = () => {

    //     if (theme === 'true') {
    //         document.getElementById('themeChange').style.backgroundColor = 'white'
    //         document.getElementById('sidebar-home').style.color = 'black'
    //         document.getElementById('sidebar-trending').style.color = 'black'
    //         document.getElementById('sidebar-game').style.color = 'black'
    //         document.getElementById('sidebar-save').style.color = 'black'
    //         setTheme('false')
    //     }
    //     else {
    //         document.getElementById('themeChange').style.backgroundColor = 'black'
    //         document.getElementById('sidebar-home').style.color = 'white'
    //         document.getElementById('sidebar-trending').style.color = 'white'
    //         document.getElementById('sidebar-game').style.color = 'white'
    //         document.getElementById('sidebar-save').style.color = 'white'
    //         setTheme('true')
    //     }
    // };


    return (
        <nav className={`navbar navbar-expand-sm ${theme === 'dark'? 'dark-theme' : 'light-theme'}`}>
            <div class="container-fluid">
                <div class="navbar-brand">
                    <h1 className={`${theme === 'dark'? 'moon-icon ' : 'pfxWatch-logo'}`}><span className='pfx-logo'>PFX</span> WATCH</h1>
                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="collapsibleNavbar">
                    <div class="navbar-nav ms-auto">

                        <div class="nav-item navItems">
                            <div className="nav-link">
                                <button onClick={toggleTheme} className='theme-btn'>
                                    {/* {theme === "true" ? <IoMoonOutline className='moon-icon' /> : <FiSun />} */}
                                    {theme === 'light' ? <FiSun /> : <IoMoonOutline className='moon-icon' />}
                                </button>
                            </div>
                        </div>

                        <div class="nav-item navItems">
                            <div className='nav-link'>
                                <button class='user-icon' type="button">
                                    {profile.name ? profile.name.charAt(0) : ''}
                                </button>
                            </div>
                        </div>

                        <div class="nav-item navItems">
                            <div className='nav-link'>
                                <button class="logout-btn" type='button' data-bs-toggle="modal" data-bs-target="#myModal">
                                    Logout
                                </button>
                                <div className='modal' id='myModal'>
                                    <div className='modal-dialog'>
                                        <div className='modal-content'>
                                            <div className='modal-header'>
                                                <h4 className="modal-title">Confirm Logout</h4>
                                                <button type='button' className='btn-close' data-bs-dismiss="modal"></button>
                                            </div>
                                            <div className='modal-body'>
                                                <p className='modal-question'>Are you sure you want to logout?</p>
                                                <button onClick={confirmLogout} className='btn btn-success yes-btn'>Yes</button>
                                                <button data-bs-dismiss="modal" className='btn btn-danger'>No</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </nav>
    )
};

export default Header;