import React from 'react'
import './Elements.css';
import { Link } from 'react-router-dom';

export const Logo = () => {
    return(
        <div className="logo">
            <span>Search</span><span className="dark-txt">it</span>
        </div>
    );
}

export const Banner = (props) => {
        return(
            <div className="banner-wrapper">
                <div className="banner">
                <img src={props.source} alt="" title="banner" width="100%" />
                </div>
            </div>
        );
}

export const Tag = (props) => {
    let newClass = props.className ? props.className : "";
    return (
    <Link to={"#"+props.content} className={"tag "+newClass} style={{ ...props.style }}>{props.content}</Link>
    )
}

export const Button = (props) => {
    let newClass = props.className ? props.className : "";
    return (
    <button className={"button "+newClass} style={{ ...props.style }} onClick={props.onClick}>{props.content}</button>
    )
}

export const CloseBtn = (props) => {
    return (
        <div className="closebtn" onClick={props.onClick}></div>
    )
}

export const UserIcon = (props) => {
    return(
        <div className="user-icon">
            <img src= {props.icon} alt="user" title={props.title?props.title:""}/>
        </div>
    )
}


