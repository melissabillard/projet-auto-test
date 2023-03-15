import React from 'react';

export default function Video1(props) {
    // gestion photo et modal à voir
    return (
        <>
            <div className="row section-sp4 content-center">
                <div className="col-lg-8 wow fadeInUp m-md-b30" data-wow-delay="0.4s">
                    <div className="video-media-bx border-retouch">
                        <img src={aboutPic3} alt="Yogan Développement - Yogshow - gestion des intermittents du spectacle" />
                        <a className="popup-youtube video-zoom" onClick={() => setOpenModal(true)}><i className="fa fa-play"></i></a>
                    </div>
                </div>
            </div>
        </>
    )
}