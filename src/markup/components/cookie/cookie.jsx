import React from "react";
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";

export default function LeCookie() {
    const cookieConsent = getCookieConsentValue();

    return (
        <>
            <div className="cookie-popup">
                {!cookieConsent && <CookieConsent
                    debug={true}
                    // disableStyles
                    location="top"
                    style={{ fontSize: "15px", zIndex: 3 }}
                    buttonStyle={{ color: "#fff", background: "#ff5622", borderRadius: "2px", fontWeight: "550", borderColor: "#ff5622" }}
                    buttonText="Accepter"
                    enableDeclineButton flipButtons
                    declineButtonText="Refuser"
                    declineButtonStyle={{ borderRadius: "2px", background: "#fff", color: "#000", fontWeight: "550", borderColor: "#fff" }}
                    expire={180}
                    sameSite="Strict"
                >
                    <div className="cookie-content">
                        <div className="cookie-paragraphe">
                            <p>En poursuivant votre navigation sur ce site, vous acceptez l'utilisation de cookies pour vous proposer des offres adaptées à vos centres d'intérêt,
                                recueillir des données de statistiques et permettre le partage de pages sur les réseaux sociaux.
                                <a href="/politique-de-confidentialite"> En savoir plus.</a>
                            </p>
                        </div>
                    </div>
                </CookieConsent>
                }
            </div>
        </>
    )
}