import React, { useState, useEffect, Fragment } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { getPhotoById } from '../services/ImageService';
import './PopImage.css';
import { CloseBtn, UserIcon } from '../components/Elements';
import Axios from 'axios';


const PopupImage = (props) => {
    const { photoid } = useParams();
    let history = useHistory();

    //check if we already have data for this photoid // if have why to fetch from server
    let dataFromStore = props.getPhotoFromStoreById(photoid);
    const [state, setstate] = useState(dataFromStore);

    useEffect(() => {
        let axiosSource = Axios.CancelToken.source();
        //no info about photoid, lets fetch it from server
        if (state === null) {
            const result = getPhotoById(photoid, axiosSource.token);
            result.then(res => {
                setstate(res.data);
            }).catch(error => {
                if (Axios.isCancel(error)) {
                    //request cancelled 
                } else {
                    //show error
                    alert("Opps Error occured");
                }
            })
        }
        return () => {
            axiosSource.cancel();
        }
    }, [photoid, state])

    return (
        <div className="popup-wrapper">
            <div className="popup">
                <div className="popup__close">
                    <CloseBtn onClick={() => history.push("/")} />
                </div>
                {state !== null ?
                    <Fragment>
                        <div className="userinfo">
                            <div className="userinfo__icon">
                                <UserIcon icon={state.user.profile_image.medium} />
                            </div>
                            <div className="userinfo__social">
                                <div className="social__name">{state.user.first_name}</div>
                                <div className="social__userid">@{state.user.username}</div>
                            </div>
                        </div>
                        <div className="preview">
                            <img className="preview__img" src={state.urls.regular} alt={state.alt_description} />
                        </div>
                        <div className="download-btn">
                            <div className="btn" onClick={()=>props.onDownloadClick(state.urls.regular)}>Download</div>
                        </div>
                    </Fragment>
                    :
                    <Fragment>
                        <div className="loading-bar">Loading .... </div>
                    </Fragment>
                }
            </div>
        </div>
    )
}

export default PopupImage;
