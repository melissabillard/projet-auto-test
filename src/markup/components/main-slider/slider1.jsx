import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import config from "../../../config.json";

// Element 
import Slider from "react-slick";
import Typewriter from 'typewriter-effect';
import ContactSidebar from '../../elements/contact-sidebar';

// Picture
import img1 from "../../../images/slider/slider1.webp"
//import sliderImg2 from "../../../images/slider/slide2.webp"

export default function Slider1(props) {

	const hideCursor = (state) => {
		state.elements.cursor.style.display = "none";
	};

	const settings = {
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autostart: true,
		// loop:true,
		// delay:75,
		// autoplay : true, 

	};

	// SETTER 
	const [data, setData] = useState('')

	// Picture 
	//const [img1, setImg1] = useState("https://rest2.yogan.pro/GETPhoto/WDA_ca862867-ca8a-49e2-8478-beca03885492_Photo1")

	useEffect(() => {
		axios.get(`${config.urlServer}api/accueil`)
			.then(function (res) {
				setData(res.data.Composents[1])
			})
			.catch(err => { })
	}, []);

	// CONST 
	const content = {
		title: !data.Titre ? "La Fabrique Du Logiciel Utile" : data.Titre,
		p: `Votre outil métier <br/> vos méthodes`,
		BTNLib: !data.BTNLib ? "Contactez-nous" : data.BTNLib,
		BTNUrl: !data.BTNUrl ? "/contact" : data.BTNUrl
	}

	return (
		<>
			<Slider {...settings} className="tt-slider slider-one owl-btn-1 slider-sp0">
				<div className="slider-item">
					<div className="slider-thumb ovbl-middle">
						<img src={img1} style={{
							height: "100vh",
							width: "100%"
						}}
							alt="Yogan Développement - la fabrique du logiciel utile"
						/>
					</div>
					<div className="slider-content text-white">
						<div className="container p-5">
							<div className="content-inner" >
								<h6 className="sub-title">{content.title}</h6>
								<h1><Typewriter
									onInit={(typewriter) => {
										typewriter.typeString(`${content.p}`)
											.callFunction(hideCursor)
											// .callFunction(()=>{
											// 	//typewriter.current(typewriter);
											// })
											.start();
									}}
								/></h1>
								<div className='p-2'>
									<Link className="btn button-md radius-xl" to={content.BTNUrl}>{content.BTNLib}</Link>
								</div>
							</div>
						</div>
					</div>

				</div>
				{/* <div className="slider-item">
						<div className="slider-thumb ovbl-middle">
							<img src={sliderImg2} alt=""/>
						</div>
						<div className="slider-content text-white">
							<div className="container">
								<div className="content-inner">
									<h6 className="sub-title">Création De Site Internet</h6>
									<h1><Typewriter 
											onInit={(typewriter)=> {
												typewriter.typeString("Renforcez votre présence<br/>sur les moteurs de<br/>recherche")
												.callFunction(hideCursor)
												.start();
											}}
										/></h1>
									<Link className="btn button-md radius-xl" to={"/contact"}>Contactez-nous</Link>
								</div>
							</div>
						</div>
					</div>*/}
			</Slider>
			<ContactSidebar />
		</>
	);
}