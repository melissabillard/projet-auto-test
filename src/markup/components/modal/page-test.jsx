import React, { useState } from "react";

// Element 
import Modal from "./modal-2";

export default function PageTest(props) {

    const [openModal, setOpenModal] = useState(false)

    const url = {
        id: 'https://www.youtube.com/embed/LnNdhh-_4ds',
    }

    return (
        <>
            <br />
            {/* change value onclick */}
            <center><button className="openModalBtn" onClick={() => { setOpenModal(true); }}>open</button></center>

            <br />

            {/* if openModal == true then we runing Modal component */}
            {openModal && <Modal setOpenModal={setOpenModal} url={url} />}

        </>
    )
}