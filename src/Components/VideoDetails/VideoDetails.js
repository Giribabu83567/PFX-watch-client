import { useNavigate, useParams } from 'react-router-dom';
import './VideoDetails.css';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import axios from 'axios'

import ReactPlayer from 'react-player';

import { AiFillLike } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import { AiFillDislike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";

const VideoDetails = () => {

    let navigate = useNavigate()
    let token = Cookies.get('jwtToken')

    useEffect(() => {
        if (token === undefined) {
            navigate('/auth')
        }
    });

    let videoId = useParams();
    const [videoDetails, setVideoDetails] = useState({})
    const getVideoDetails = async () => {
        try {

            let token = Cookies.get('jwtToken')
            const url = `http://localhost:4003/api/videos/${videoId.videoId}`
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await fetch(url, options)

            if (response.ok === true) {
                const data = await response.json()
                setVideoDetails(data.VideoDetails)
                setIsSaved((data.VideoDetails.saved))
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    const [isLiked, setIsLiked] = useState()
    const [isDislike, setIsDislike] = useState()
    const onClickLike =  () => {
        if (isLiked === 'true') 
        {
            setIsLiked('false')
            setIsDislike('false')
        } 
        else 
        {
            setIsLiked('true')
            setIsDislike('false')
        }
    };
    const onClickDislike = () => {
        if(isDislike === 'true')
        {
            setIsDislike('false')
            setIsLiked('false')
        }
        else{
            setIsDislike('true')
            setIsLiked('false')
        }
    };

    const [isSaved, setIsSaved] = useState()
    const onClickSave = async () => {

        if (isSaved === "true") 
        {
            setIsSaved("false");
            updateUnsaved(videoId);
        }
        else {
            setIsSaved("true")
            updateSaved(videoId)
        }
    };
    
    const updateUnsaved = async (videoId) => {
        try {

            const response = await axios.put(
                `http://localhost:4003/api/saved/${videoId.videoId}`,
                { saved: "false" }, // Data payload
                {
                    headers: {
                        Authorization: `Bearer ${token}` // Authorization header with token
                    }
                }
            );
            alert('Video Unsaved Successfully!')

        } catch (error) {
            console.error('Error updating unsaved status:', error);
            alert('Failed to Unsave Video')
        }
    };
    
    const updateSaved = async (videoId) => {
        try {

            const response = await axios.put(
                `http://localhost:4003/api/saved/${videoId.videoId}`,
                { saved: "true" }, // Data payload
                {
                    headers: {
                        Authorization: `Bearer ${token}` // Authorization header with token
                    }
                }
            );     
            
            if (response.status === 200) {
                alert('Video saved successfully');
            } else {
                throw new Error('Failed to update saved status');
            }
        } 
        catch (error) {
            console.error('Error updating saved status:', error);
            alert('Failed to save video');
        }
    };

    useEffect(() => {
        getVideoDetails();
    }, []);
    


    return (
        <div>
            <Header />
            <div className='row'>
                <div className='col-lg-3 col-md-4 col-sm-12'>
                    <Sidebar />
                </div>
                <div className='col-lg-9 col-md-8 col-sm-12'>
                    <div className='m-3'>
                        <ReactPlayer url={videoDetails.video_url}
                            controls={true}
                            width='100%'
                            className='video-player'
                        />
                        <h5 className='vide-title'>
                            {videoDetails.video_title}
                        </h5>
                        <div className='views-date-btn-container'>
                            <div>{videoDetails.views_count}</div>
                            <div>{videoDetails.published_date}</div>
                            <div className='like-dislike-container'>
                                <div className='d-flex align-items-center'>
                                    <button onClick={onClickLike} className='like-btn-container'>
                                        {isLiked === 'true' ? <AiFillLike className='like-btn' /> : <BiLike />}
                                    </button>
                                    <div>Like</div>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <button onClick={onClickDislike} className='like-btn-container'>
                                        {isDislike === 'true' ? <AiFillDislike className='like-btn' /> : <AiOutlineDislike />}
                                    </button>
                                    <div>Dislike</div>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <button onClick={onClickSave} className='like-btn-container'>
                                        {isSaved === "true" ? <FaBookmark /> : <FaRegBookmark />}
                                    </button>
                                    <div>Save</div>
                                </div>
                            </div>
                        </div>

                        <hr className='line-hr'></hr>

                        <div className='channel-container'>
                            <div className='video-channel-logo-container'>
                                <img src={videoDetails.channel_logo} className='video-channel-logo'></img>
                            </div>
                            <div className='channel-description'>
                                <div>{videoDetails.channel_name}</div>
                                <div>{videoDetails.subscribers}</div>
                                <div>{videoDetails.description}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default VideoDetails;