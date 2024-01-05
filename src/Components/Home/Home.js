import Cookies from 'js-cookie';
import './Home.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

import { FaSearch } from "react-icons/fa";
import AllVideos from '../AllVideos/AllVideos';

import { useTheme } from '../../ThemeContext';
const Home = () => {
    const {theme, toggleTheme} = useTheme()

    let navigate = useNavigate();
    useEffect(() => {
        let token = Cookies.get('jwtToken')
        if (token === undefined) {
            navigate('/auth')
        }
    }, []);

    useEffect(()=> {
        getAllVideos();
    },[]);

    const [searchValue, setSearchValue] = useState('')
    const [videos, setVideos] = useState([])
    const getAllVideos = async () => {
        try {
            const token = Cookies.get('jwtToken');
            const url = `http://localhost:4003/api/home?search=${searchValue}`;
            const options = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await fetch(url, options);
            if(response.ok === true)
            {
                const data = await response.json()
                setVideos(data.message)
            }
        } 
        catch (error) {
            console.error(error);
        }
    };
    // console.log(videos);

    const onChangeFilterVideos = (event)=> {
        setSearchValue(event.target.value)
        getAllVideos()
    };

    const getFilterVideos = ()=> {
        getAllVideos()
    };


    return (
        <div id='themeChange' className={`${theme==='dark'? 'dark-theme' : 'light-theme'}`}>
            <Header />
            <div className='container-fluid mt-3'>
            <div className='row'>
                <div className='col-lg-2 col-md-3 col-sm-6'>
                    <Sidebar/>
                </div>
                <div className='col-lg-10 col-md-9 col-sm-6'>
                    <div className='home-container'>
                        <div className='home-heading'>
                           <h1><span className='pfx'>PFX</span> WATCH</h1>
                        </div>
                    </div>

                    <div className='search-container'>
                        <div className='d-flex justify-content-center align-items-center'>
                            <input type='search' className='search-box' 
                                placeholder='Search' onChange={onChangeFilterVideos}>

                            </input>
                            <div className='search-icon-container' onClick={getFilterVideos}>
                                <FaSearch className='text-light' />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        {
                            videos.map((eachVideo)=> (
                                <AllVideos VideosDetails={eachVideo} />)
                        )}
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
};

export default Home;