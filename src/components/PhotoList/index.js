import React from 'react'
import './PhotoList.css';
import { UserIcon } from '../Elements';
import { Link } from 'react-router-dom';

const PhotoListItem = (props) => { 
    return(
        <Link className="photo-list-item" to={"/"+props.data.id}>
                <div className="thumb">
                    <img src={props.data.urls.small} alt="" />
                </div>
                <div className ="user-avtar">
                    <div className="icon">
                        <UserIcon icon={props.data.user.profile_image.medium} />
                    </div>
                    <div className="user-desc">
                        <span>Image by</span><span className="drkcolor">{props.data.user.first_name +" "+props.data.user.last_name }</span>
                    </div>
                    
                </div>
        </Link>
    )
}
const MemoItem = React.memo(PhotoListItem,(lastProps,nextProps)=>lastProps.data.id === nextProps.data.id);

const PhotoList = (props) => {
    return(
        <div className="photo-list">
            {props.data.map(item=><MemoItem data={item} key={item.id}/>)}
        </div>
    );
}

export default PhotoList;
