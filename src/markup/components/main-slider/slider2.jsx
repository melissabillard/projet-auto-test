import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";

// Images
import sliderImg3 from "../../../images/slider/slide3.png"

class Slider2 extends Component{
	
	render(){
		
		const settings = {
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
		};
		
		return(
			<>
				
				<Slider {...settings} className="tt-slider slider-one slider-two owl-btn-1 slider-sp0">
					<div className="slider-item">
						<div className="slider-thumb">
							<img src={sliderImg3} alt=""/>
						</div>
						<div className="slider-content">
							<div className="container">
								<div className="content-inner">
									<h6 className="sub-title">Welcome To Tora Agency</h6>
									<h2 className="title">Digital Agency <br/>with Excellence<br/>with Services.</h2>
									<Link className="btn button-md radius-xl" to={"#"}>View Project</Link>
								</div>
							</div>
						</div>
					</div>			
					<div className="slider-item">
						<div className="slider-thumb">
							<img src={sliderImg3} alt=""/>
						</div>
						<div className="slider-content">
							<div className="container">
								<div className="content-inner">
									<h6 className="sub-title">Welcome To Tora Agency</h6>
									<h2 className="title">Digital Agency <br/>with Excellence<br/>with Services.</h2>
									<Link className="btn button-md radius-xl" to={"/portfolio-grid-3"}>View Project</Link>
								</div>
							</div>
						</div>
					</div>					
				</Slider>
				
			</>
		);
	}
}

export default Slider2;