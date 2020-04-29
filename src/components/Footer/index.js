import React from 'react'
import './Footer.css';
import { Logo, Tag} from '../Elements';

export const Footer = (props) => {
    let newClass = props.className ? props.className : "";
    return (
        <footer className={"footer-wrapper " + newClass} style={{ ...props.style }}>
            <div className="footer-content">
                <section className="logo-wrp">
                    <Logo />
                </section>
                <section>
                    <div className="head-text">Popular Searches </div>
                    <div className="popular-search">
                        {["Dog", "Office", "Digital", "Cat", "Coffee", "Meeting", "Space", "World", "Cars", "Nature", "Wildlife", "Games", "Business", "Beach trip", "Holiday"].map((item, index) =>
                            <Tag className="popular-item" key={item+index} content={item}/>
                        )}
                    </div>

                </section>
            </div>
        </footer>
    );
}
