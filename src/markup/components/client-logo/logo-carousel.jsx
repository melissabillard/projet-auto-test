import React from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";

// Picture
import WinDevLogo from '../../../images/partner/logo1.webp';
import WinDevMobileLogo from '../../../images/partner/logo2.webp';
import WebDevLogo from '../../../images/partner/logo3.webp';
import PcSoftLogo from '../../../images/partner/logo-pcsoft.webp';
import ReactLogo from '../../../images/partner/react-logo.webp';
import GatsbyLogo from '../../../images/partner/gatsby-logo.webp';
import NodeLogo from '../../../images/partner/nodejs-logo.webp';

const content = [
	{
		src: WinDevLogo,
	},
	{
		src: WinDevMobileLogo,
	},
	{
		src: WebDevLogo,
	},
	{
		src: PcSoftLogo,
	},
	{
		src: ReactLogo,
	},
	{
		src: GatsbyLogo,
	},
	{
		src: NodeLogo,
	}
]

export default function LogoCarousel(props) {
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 2,
		autoplay: true,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 5,
				}
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4,
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 360,
				settings: {
					slidesToShow: 2,
				}
			}
		]
	};

	// CONST 
	const section = {
		title: !props.sec4.Titre ? "Nos Savoir-Faire" : props.sec4.Titre,
		p: !props.sec4.Corps ? "Notre palette d'outils nous permet de développer une solution qui convient pour votre métier et vos usages." : props.sec4.Corps
	}

	return (
		<>
			<div className="section-area section-sp2 bg-white mt-5 mb-5">
				<div className="container">
					<div className="heading-bx text-center">
						<h2 className="title-head m-b0">{section.title}</h2>
						<p className="m-b0">{section.p}</p>
					</div>
					<Slider {...settings} className="slider-sp10 arrow-none">
						{content.map((item, index) => (
							<div className="slider-item" key={index}>
								<div className="client-logo">
									<Link to={"#"}>
										<img
											src={item.src}
											style={{
												width: "auto !important"
											}}
											alt="Yogan Développement - logo partenaire"
										/>
									</Link>
								</div>
							</div>
						))}
					</Slider >
				</div>
			</div>
		</>
	);
}
