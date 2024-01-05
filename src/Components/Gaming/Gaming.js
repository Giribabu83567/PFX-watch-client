import Cookies from 'js-cookie';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import './Gaming.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SiYoutubegaming } from "react-icons/si";

const Gaming = () => {

    let navigate = useNavigate()
    useEffect(() => {
        let token = Cookies.get('jwtToken')
        if (token === undefined) {
            navigate('/auth')
        }
    });

    useEffect(() => {
        getGamingVideos()
    }, []);
    const [gamingVideos, setGamingVideos] = useState([])
    const getGamingVideos = async () => {
        try {
            let token = Cookies.get('jwtToken')
            const url = `http://localhost:4003/api/gaming`
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await fetch(url, options)
            if (response.ok === true) {
                const data = await response.json()
                setGamingVideos(data.Gaming)
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    // console.log(gamingVideos);

    return (
        <div>
            <Header />
            <div className='container-fluid mt-3'>
                <div className='row'>
                    <div className='col-lg-2 col-md-3 col-sm-6'>
                        <Sidebar />
                    </div>
                    <div className='col-lg-10 col-md-9 col-sm-6'>
                        <div className='d-flex align-items-center my-2'>
                            <div className='game-icon-container'>
                                <SiYoutubegaming className='game-icon'/>
                            </div>
                            <div className='gaming-heading'>Gaming</div>
                        </div>
                        <div className='row gaming-container'>
                            {
                                gamingVideos.map((eachGaming) => (
                                    <div className='col-lg-4 col-md-6 col-sm-12 mb-3'>
                                        <Link to={`/videos/${eachGaming._id}`} className='gaming-links'>
                                            <div>
                                                <img src={eachGaming.thumbnail_url} className='gaming-url rounded' alt='gaming image'></img>
                                            </div>
                                            <div className='gaming-title'>{eachGaming.title}</div>
                                            <div>{eachGaming.views_count}</div>

                                            <hr className='hr-line'></hr>
                                        </Link>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Gaming;