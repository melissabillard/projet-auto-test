import React from "react";
import { Link } from 'react-router-dom';

export default function Card2(props) {

    // CONST 
    const content = [
        {
            icons: "flaticon-chat-bubble",
            title: !props.card1.Titre ? "Une Demande en ligne" : props.card1.Titre,
            p: !props.card1.Corps ? "Faites une demande de support en ligne via l'un de nos formulaires et bénéficiez d'une assistance sur mesure." : props.card1.Corps
        },
        {
            icons: "flaticon-employee-2",
            title: !props.card2.Titre ? "Un Expert Yogan Vous Recontacte" : props.card2.Titre,
            p: !props.card2.Corps ? "Une Fois la demande envoyée un expert vous recontacte dans les plus brefs délais." : props.card2.Corps
        },
        {
            icons: "flaticon-employee-1",
            title: !props.card3.Titre ? "Service Technique & Développement" : props.card3.Titre,
            p: !props.card3.Corps ? "Notre équipe est composée de développeurs hautement qualifiés à même de répondre à toutes vos demandes." : props.card3.Corps
        },
        {
            icons: "flaticon-computer",
            title: !props.card4.Titre ? "Une Assistance Sur Tous Vos Projets" : props.card4.Titre,
            p: !props.card4.Corps ? "Bénéficiez d'un service support personnalisé conçu pour répondre à tous vos besoins." : props.card4.Corps
        },
    ]

    return (
        <>
            <div className="row">
                {content.map((item, index) => (
                    <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.2s" key={index}>
                        <div className="feature-container left feature-bx1">
                            <div className="feature-lg text-white m-b20">
                                <Link to={"#"} className="icon-cell"><i className={item.icons}></i></Link>
                            </div>
                            <div className="icon-content">
                                <h5 className="ttr-tilte">{item.title}</h5>
                                <p>{item.p}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}