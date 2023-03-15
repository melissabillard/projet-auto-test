import React from "react";

export default function Card3(props) {
    return (
        <>
            <div className="row">
                {props.cards.map((item, index) => (
                    <div className="col-lg-4 col-md-6" key={index}>
                        <div className="feature-container feature-bx2">
                            <div className="feature-lg text-white m-b20">
                                <span className="icon-cell"><i className={item.icons}></i></span>
                            </div>
                            <div className="icon-content">
                                <h5 className="ttr-tilte">{item.title}</h5>
                                <p className='mb-5'>{item.p}</p><br /><br />
                                {/* <a href="/contact" className="feature-btn" target="_blank">En savoir plus</a> */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* <div className='text-center mt-5'>
					<Link to={"/contact"} id="responsive-two-button-side2" className="btn button-md radius-xl space" target="_blank">Nous contacter</Link>
				</div> */}
        </>
    )
}