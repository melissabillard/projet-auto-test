import React from "react";
import {Link as ScrollTo} from 'react-scroll'
import {Link } from 'react-router-dom';

// Picture
import bannerPic1 from '../../../images/banner/banner1.webp';

export default function Banner2 (props){
    
    const {title, entitled, navTitle, navLink} = props

    return(
            <>
                <div className="page-banner ovpr-dark overlay-dotted ovdt2 parallax" style={{backgroundImage: "url("+bannerPic1+")"}}>
                        <div className="container">
                            <div className="page-banner-entry">
                                <h1 className="text-white text-capitalize">{props.title}</h1>
                                <div className="breadcrumb-row">
                                    <ul className="list-inline">
                                        <li><Link to={props.navLink}><i className="fa fa-home"></i>{props.navTitle}</Link></li>
                                        <li>{props.entitled}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <ScrollTo smooth={true} to="content-area" className="banner-bottom scroll-page"><i className="ti-arrow-down"></i></ScrollTo>
                </div>
            </>
    )
}
