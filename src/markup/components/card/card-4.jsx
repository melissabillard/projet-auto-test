import React from "react";

export default function Card4(props) {

    // Cards Content 
    const content = [
        {
            flaticon: "flaticon-clipboard",
            p: !props.card1 ? "Accès aux seules données essentielles." : props.card1,
        },
        {
            flaticon: "flaticon-computer",
            p: !props.card2 ? "Authentification unique et sécurisée." : props.card2,
        },
        {
            flaticon: "flaticon-networking-1",
            p: !props.card3 ? "Hébergement dédié ou sur-mesure si souhaité." : props.card3,
        },
        {
            flaticon: "flaticon-line-chart",
            p: !props.card4 ? "Filtrage sécurisé d’accès par adresse IP." : props.card4,
        },
        {
            flaticon: "flaticon-employee-2",
            p: !props.card5 ? "Gestion des droits d'utilisateurs avancée et fine." : props.card5,
        },
        {
            flaticon: "flaticon-browser-1",
            p: !props.card6 ? "Supervision permanente des applications." : props.card6,
        },
        {
            flaticon: "flaticon-clock",
            p: !props.card7 ? "Retour en condition opérationnelle en de 2h." : props.card7,
        },
        {
            flaticon: "flaticon-vision",
            p: !props.card8 ? "Sécurisation et contrôle continu de l’architecture." : props.card8,
        }
    ]

    return (
        <>
            <div className="section-area mt-4 mb-5">
                <div className="container-max">
                    <div className="row sp20 " >
                        {content.map((item, index) => (
                            <div className="action-card col-lg-3 col-md-6 col-sm-6 col-12" key={index}>
                                <div className="portfolio-box style-3">
                                    <div className="feature-bx22">
                                        <span className="icon-cell feature-lg text-white m-b20"><i className={item.flaticon}></i></span>
                                        <div className="icon-content">
                                            <p>{item.p}</p><br />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

