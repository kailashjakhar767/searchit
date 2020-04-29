import React from 'react'
import './PhotoList.css';
import { UserIcon } from '../Elements';
import { Link } from 'react-router-dom';

const PhotoListItem = (props) => {
    return (
        <Link className="photo__item" to={"/" + props.data.id}>
            <div className="__thumb">
                <img src={props.data.urls.small} alt="" />
            </div>
            <div className="user">
                <div className="user__icon">
                    <UserIcon icon={props.data.user.profile_image.medium} />
                </div>
                <div className="user__desc">
                    <span>Image by</span><span className="user__desc--drkcolor">{props.data.user.first_name + " " + props.data.user.last_name}</span>
                </div>
            </div>
        </Link>
    )
}
const MemoItem = React.memo(PhotoListItem, (lastProps, nextProps) => lastProps.data.id === nextProps.data.id);

const PhotoList = (props) => {
    return (
        <div className="photo-list">
            {props.data.map(item => <MemoItem data={item} key={item.id} />)}
        </div>
    );
}

export default PhotoList;
