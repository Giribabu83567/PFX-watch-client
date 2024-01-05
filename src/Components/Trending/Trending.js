import Cookies from 'js-cookie';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import './Trending.css'
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFireFlameCurved } from "react-icons/fa6";

const Trending = () => {

    const [trendingVideos, setTrendingVideos] = useState([])

    let navigate = useNavigate();
    useEffect(() => {
        let token = Cookies.get('jwtToken')
        if (token === undefined) {
            navigate('/auth')
        }
    }, []);

    useEffect(() => {
        getTrendingVideos();
    }, []);

    const getTrendingVideos = async () => {
        try {
            let token = Cookies.get('jwtToken')
            const url = `http://localhost:4003/api/trending`;
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await fetch(url, options)
            if (response.ok === true) {
                const data = await response.json()
                setTrendingVideos(data.Trending)
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    // console.log(trendingVideos);

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
                            <div className='trend-icon-container'>
                                <FaFireFlameCurved className='trend-icon'/>
                            </div>
                            <div className='trending-heading'>Trending</div>
                        </div>
                        <div className='row trending-container'>
                            {trendingVideos.map((eachTrending) => (
                                <div className='col-lg-4 col-md-6 col-sm-12 mb-3'>
                                    <Link to={`/videos/${eachTrending._id}`} className='trending-links'>
                                        <div className='trending-videos-container'>
                                            <div>
                                                <img src={eachTrending.thumbnail_url} className='trending-thumnail-url responsive img-fluid' alt='trending'></img>
                                            </div>
                                            <div className='trending-title'>
                                                {eachTrending.title}
                                            </div>
                                            <div className='d-flex align-items-center'>
                                                <div>
                                                    <img src={eachTrending.channel_logo} alt='trending channel'
                                                        className='trending-channel-logo responsive img-fluid rounded-circle'>

                                                    </img>
                                                </div>
                                                <div className='trending-channel-text'>
                                                    <div>{eachTrending.channel_name}</div>
                                                    <div>{eachTrending.views_count}</div>
                                                    <div>{eachTrending.publishedDate}</div>
                                                </div>
                                            </div>
                                            <hr className='hr-line'></hr>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Trending;