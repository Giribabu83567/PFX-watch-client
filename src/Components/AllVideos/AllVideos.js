import { Link } from 'react-router-dom';
import './AllVideos.css';

const AllVideos = (props) => {

    const {VideosDetails} = props;
    const {channel_logo, channel_name, publishedDate, thumbnail_url, title, views_count, category, _id} = VideosDetails;

    return (
        <div className='col-lg-4 col-md-6 col-sm-12 mb-5' >
            <Link to={`/videos/${_id}`} className='link-items'>
                <div>
                    <img src={thumbnail_url} className='image-url responsive rounded'></img>
                    <h6 className='thumbnail-title'>{title}</h6>
                    <div className='d-flex align-items-center'>
                        <div className='channel-logo-container'>
                            <img src={channel_logo} className='channel-logo rounded-circle'></img>
                        </div>
                        <div className='channel-logo-desc'>
                            <div>{channel_name}</div>
                            <div>{views_count}</div>
                            <div>{publishedDate}</div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )

};

export default AllVideos;