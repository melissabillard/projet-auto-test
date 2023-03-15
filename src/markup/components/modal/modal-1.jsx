import React from "react";
import Picture from '../../../images/logo/logo2.webp'

export default function modalForm({ setOpenModal, design, text }) {

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
        width: design.withModal,
        height: design.heightModal,
        borderRadius: '12px',
        backgroundColor: 'white',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        display: 'flex',
        flexDirection: 'column',
        padding: '25px'
    };

    const titleCloseBtn = {
        display: 'flex',
        justifyContent: 'flex-end'
    };

    const titleCloseBtnButton = {
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: '18px',
        cursor: 'pointer',
        color: '#000'

    };

    const sizeButton = {
        width: design.sizeButton
    };

    const modalLogo = {
        width: design.sizeLogo
    }

    return (
        <>
            <div style={modalBackground}>
                <div style={modalBody}>
                    <div className="text-center" style={modalContainer}>
                        <div style={titleCloseBtn}>
                            <button style={titleCloseBtnButton} onClick={() => { setOpenModal(false); }}>{design.crossToClose}</button>
                        </div>
                        <div className="text-center mt-3 mb-2">
                            <img style={modalLogo} src={Picture}></img>
                        </div>
                        <div className="title mt-4">
                            <p className="fw-bold mb-4">{text.p}</p>
                            <button className="btn button-md radius-xl" onClick={() => { setOpenModal(false); }} style={sizeButton}>{text.textButton}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

