import React from 'react'
import './Footer.css';
import { Logo} from '../Elements';

export const Footer = (props) => {
    let newClass = props.className ? props.className : "";
    return (
        <footer className={"footer-wrapper " + newClass} style={{ ...props.style }}>
            <div className="footer-content">
                <div className="logo-wrp">
                    <Logo />
                </div>
                <div>
                    <div className="head-text"> Popular Searches </div>
                    <div className="popular-search">
                        {["Dog", "Office", "Digital", "Cat", "Coffee", "Meeting", "Space", "World", "Cars", "Nature", "Wildlife", "Games", "Business", "Beach trip", "Holiday"].map((item, index) =>
                            <div className="popular-item" key={index}>{item}</div>
                        )}
                    </div>

                </div>
            </div>
        </footer>
    );
}
