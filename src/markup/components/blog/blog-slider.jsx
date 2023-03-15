import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick"; 

// Images
import blogGridPic2 from "../../../images/blog/grid/pic2.jpg"
import blogGridPic3 from "../../../images/blog/grid/pic3.jpg"
import blogGridPic4 from "../../../images/blog/grid/pic4.jpg"

const content = [
	{
		thumb: blogGridPic2,
		title: "Things You Should Do In Agency.",
		date: "12 August 2020",
    },
	{
		thumb: blogGridPic3,
		title: "Ten Reasons Why People Love.",
		date: "18 july 2020",
    },
	{
		thumb: blogGridPic4,
		title: "How To Have A Fantastic Agency.",
		date: "05 May 2020",
    },
	{
		thumb: blogGridPic2,
		title: "Things You Should Do In Agency.",
		date: "12 August 2020",
    },
]

class Testimonial2 extends Component{
	render(){
		
		const settings = {
			infinite: true,
			speed: 500,
			slidesToShow: 3,
			slidesToScroll: 1,
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3,
					}
				},
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 2,
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 1,
					}
				}
			]
		};
		
		return(
			<>
				<Slider {...settings} className="recent-news-carousel owl-btn-1 owl-btn-primary">
					{content.map((item, id) => (
						<div className="slider-item">
							<div className="blog-post blog-md sm-large">
								<div className="ttr-post-media"> 
									<Link to={"blog-details-sidebar"}><img src={item.thumb} alt=""/></Link> 
								</div>
								<div className="ttr-post-info">
									<h3 className="post-title"><Link to={"blog-details-sidebar"}>{item.title}</Link></h3>
									<ul className="media-post">
										<li><Link to={"blog-details-sidebar"}>{item.date}</Link></li>
									</ul>
									<div className="post-extra">
										<Link to={"blog-details-sidebar"} className="btn radius-xl outline outline-2">Read More</Link>
									</div>
								</div>
							</div>
						</div>
					))}
				</Slider>
			</>
		);
	}
}

export default Testimonial2;