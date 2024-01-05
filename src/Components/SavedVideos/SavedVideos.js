import Cookies from 'js-cookie';
import './SavedVideos.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { FaBookmark } from "react-icons/fa";

const SavedVideos = () => {

    let navigate = useNavigate()
    useEffect(() => {
        let token = Cookies.get('jwtToken')
        if (token === undefined) {
            navigate('/auth')
        }
    });

    useEffect(() => {
        getSavedVideos()
    }, []);

    const [bookmark, setBookmark] = useState([])
    const getSavedVideos = async () => {
        try {
            let token = Cookies.get('jwtToken')
            const url = `http://localhost:4003/api/savedVideos`
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await fetch(url, options)
            if (response.ok === true) {
                const data = await response.json()
                setBookmark(data.savedVideos)
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    // console.log(bookmark);

    return (
        <div>
            <Header />
            <div className='container-fluid mt-3'>
                <div className='row'>
                    <div className='col-lg-3 col-md-4 col-sm-6'>
                        <Sidebar />
                    </div>
                    <div className='col-lg-9 col-md-8 col-sm-6'>
                        <div className='d-flex align-items-center my-2'>
                            <div className='save-icon-container'>
                                <FaBookmark className='save-icon'/>
                            </div>
                            <div className='saved-heading'>Saved Videos</div>
                        </div>
                        <div className='row saved-videos-container'>
                            {
                                bookmark.map((saved) => (
                                    <div className='col-lg-4 col-md-6 col-sm-12'>
                                        <Link to={`/videos/${saved._id}`} className='saved-links'>
                                            <div>
                                                <img src={saved.thumbnail_url} className='saved-img-url rounded'></img>
                                            </div>
                                            <div className='saved-title'>{saved.video_title}</div>
                                            <div className='d-flex align-items-center'>
                                                <div>
                                                    <img src={saved.channel_logo} className='saved-channel-logo rounded-circle'></img>
                                                </div>
                                                <div className='saved-channel-desc'>
                                                    <div>{saved.channel_name}</div>
                                                    <div>{saved.views_count}</div>
                                                    <div>{saved.published_date}</div>
                                                </div>
                                            </div>
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

export default SavedVideos;