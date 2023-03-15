import React from "react";
import Picture from '../../../images/modal/pic1.webp'

// Style 
const modalBackground = {
    backgroundColor: "hsla(0,0%,100%,.8)",
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: '1000000',
    cursor: "pointer",
    zIndex: '3'
};

const modalBody = {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto"
}

const modalContainer = {
    width: "20%",
    height: "65%",
    borderRadius: '9px',
    backgroundColor: 'white',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    display: 'flex',
    flexDirection: 'column',
    position: "relative"
};

const CloseBtnButton = {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '40px',
    cursor: 'pointer',
    position: "absolute",
    zIndex: "3",
    top: "-10px",
    right: '0',
    padding: "0px 6px",
    lineHeight: "unset !important"
};

const modalPicture = {
    width: "100%",
    height: "100%",
    borderRadius: '3% 3% 0% 0%',
}

const modalButtunOrange = {
    backgroundColor: "var(--primary)",
    color: "#fff",
    borderWidth: "2px",
}

const modalButtunWhite = {
    backgroundColor: "#fff",
    color: "var(--primary)",
    borderWidth: "2px",
    borderColor: "var(--primary)",
}

const styleP = {
    fontSize: "75%"
}

const spanStyle = {
    textDecoration: "underline"
}

export default function ModalForm3({ setOpenModal2 }) {
    return (
        <>
            <div className="modalBackground" style={modalBackground}>
                <div className="modalBody" style={modalBody}>
                    <div className="modalContainer text-center" style={modalContainer}>
                        <div className="text-center mb-2">
                            <button className="CloseButton text-white" style={CloseBtnButton} onClick={() => { setOpenModal2(false); }}>x</button>
                            <img style={modalPicture} src={Picture} alt="Yogan Développement la fabrique de logiciel utile"></img>
                        </div>
                        <div className="title mt-2">
                            <p className="fw-bold mb-3 text-uppercase" style={styleP}>Prise de contact rapide</p>
                            <span className="fw-bold text-capitalize text-black h5">Contactez-nous pour</span>
                            <p className="text-black fw-bold mb-3 h5">....</p>
                            <a href="mailto:yannick@yogan.fr?subject=Développer%20notre%20outil%20spécifique%20&body=Bonjour,%0D%0A%0D%0Asuite%20à%20la%20visite%20de%20votre%20site%20internet,%20%20Pourriez%20vous%20me%20contacter%20pour%20le%20développement%20de%20notre%20outil%20spécifique%20%0D%0A%0D%0AMerci%20par%20avance,%20%20%0D%0A%0D%0AVoici%20mes%20coordonnées%20:%0D%0A%0D%0A%0D%0A" className="btn button-md w-75 mb-2 p-3" style={modalButtunOrange}>un outil spécifique</a>
                            <a href="mailto:yannick@yogan.fr?subject=Accompagner%20l’%20évolution%20de%20nos%20outils%20existants%20&body=Bonjour,%0D%0A%0D%0ASuite%20à%20la%20visite%20de%20votre%20site%20internet,%20%20Pourriez%20vous%20me%20contacter%20pour%20nous%20accompagner%20dans%20l’%20évolution%20de%20nos%20outils%20existants%20%0D%0A%0D%0AMerci%20par%20avance,%20%20%0D%0A%0D%0AVoici%20mes%20coordonnées%20:%0D%0A%0D%0A%0D%0A" className="btn button-md w-75 mb-2 p-3" style={modalButtunWhite}>un outil existant</a>
                            <a href="mailto:yannick@yogan.fr?subject=Développer%20nos%20outils%20Métiers%20&body=Bonjour,%0D%0A%0D%0ASuite%20à%20la%20visite%20de%20votre%20site%20internet,%20%20Pourriez%20vous%20me%20contacter%20pour%20nous%20aider%20dans%20le%20développement%20de%20nos%20outils%20métiers%20%0D%0A%0D%0AMerci%20par%20avance,%20%20%0D%0A%0D%0AVoici%20mes%20coordonnées%20:%0D%0A%0D%0A%0D%0A" className="btn button-md w-75 p-3" style={modalButtunWhite}>un outil métier</a>
                            <p className="text-black fw-bold mt-3 small" style={spanStyle} onClick={() => { setOpenModal2(false); }}>Je ne suis pas intéréssé</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}