import React, { useState } from 'react';
import { Link } from "react-router-dom";

// Picture
import ImageVideo from '../../../images/video/image1.webp';

// Modal
import Modal from '../modal/modal-2';

export default function TextVideo1(props) {

    // modal Video
    const [openModal, setOpenModal] = useState(false)

    // CONST 
    const content = {
        title: !props.sec1.Titre ? "Logiciels Métiers" : props.sec1.Titre,
        p: !props.sec1.Corps ? "Un logiciel métier est un outil informatique développé spécifiquement selon vos besoins et votre activité. Il permet d'informatiser et d'automatiser les processus de gestion spécifiques à votre société. Chaque structure est unique et trouver la bonne solution ERP peut se révéler complexe. C’est pour cela que nous concevons avec vous et développons votre logiciel métier afin de répondre au mieux à vos besoins." : props.sec1.Corps,
        BTNLib: !props.sec1.BTNLib ? "en savoir plus" : props.sec1.BTNLib,
        BTNUrl: !props.sec1.BTNUrl ? "/logiciels" : props.sec1.BTNUrl,
        videoId: !props.videoId ? "LnNdhh-_4ds" : props.videoId,
        // videoPicture: videoPicture 
    }

    return (
        <>
            {/* if openModal == true then we runing Modal component  */}
            {openModal && <Modal setOpenModal={setOpenModal} VideoId={content.videoId} />}

            <div className="section-area bg-gray section-sp1 our-story mt-5">
                <div className="container">
                    <div className="row align-items-center d-flex">
                        <div className="col-lg-5 col-md-12 heading-bx text-black wow fadeInUp" data-wow-delay="0.4s">
                            <h2 className="title-head text-capitalize">{content.title}</h2>
                            <p>{content.p}</p>
                            <Link to={content.BTNUrl} className="btn button-md radius-xl">{content.BTNLib}</Link>
                        </div>
                        <div className="col-lg-7 col-md-12 heading-bx p-lr">
                            <div className="video-media-bx">
                                <div className="video-bx">
                                    <img className="img-radius-video" style={{ width: "97%" }} src={ImageVideo} alt="Yogan Développement - la fabrique du logiciel utile" />
                                    <a className="popup-youtube video-zoom" onClick={() => setOpenModal(true)}><i className="fa fa-play"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}