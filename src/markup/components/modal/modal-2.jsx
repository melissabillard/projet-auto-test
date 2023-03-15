import React from "react";

export default function modalForm2({ setOpenModal, VideoId }) {

    const modalVideo = {
        backgroundColor: "rgba(0,0,0,.9)",
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '1000000',
        cursor: "pointer",
        opacity: "1"
    };

    const modalVideoBody = {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        maxWidth: "960px",
        margin: "0 auto",
        padding: "0 10px",
        boxSizing: "border-box"
    }

    const modalVideoInner = {
        padding: "10px 60px",
        boxSizing: "border-box",
        alignItems: "center",
        height: "100%",
        display: "flex",
        justifyContent: "center"
    }

    const modalVideoMovieWrap = {
        paddingBottom: "55.25%",
        width: "100%",
        height: "0",
        position: "relative",
        backgroundColor: "#333",
        animationDuration: ".3s"
    }

    return (
        <>
            <div style={modalVideo} tabindex="-1" role="dialog" aria-label="You just opened the modal video">
                <div style={modalVideoBody}>
                    <div style={modalVideoInner}>
                        <div style={modalVideoInner}>
                            <div style={modalVideoMovieWrap}>
                                <button className="modalVideoClosebtn" aria-label="Close the modal by clicking here" onClick={() => { setOpenModal(false); }}></button>
                                <iframe
                                    width="800"
                                    height="450"
                                    src={"https://www.youtube.com/embed/" + VideoId}
                                    frameborder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    tabIndex="-1"
                                    className="modalVideoResponsive"
                                >
                                </iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

