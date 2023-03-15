import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SimpleReactLightbox, {SRLWrapper} from 'simple-react-lightbox';

// Images
import GalleryPic1 from "../../../images/gallery/pic1.jpg"
import GalleryPic2 from "../../../images/gallery/pic2.jpg"
import GalleryPic3 from "../../../images/gallery/pic3.jpg"
import GalleryPic4 from "../../../images/gallery/pic4.jpg"
import GalleryPic5 from "../../../images/gallery/pic5.jpg"
import GalleryPic6 from "../../../images/gallery/pic6.jpg"
import RecentBlogPic1 from "../../../images/blog/recent-blog/pic1.jpg"
import RecentBlogPic2 from "../../../images/blog/recent-blog/pic2.jpg"
import RecentBlogPic3 from "../../../images/blog/recent-blog/pic3.jpg"

const content = [
	{
		thumb: GalleryPic1,
	},
	{
		thumb: GalleryPic2,
	},
	{
		thumb: GalleryPic3,
	},
	{
		thumb: GalleryPic4,
	},
	{
		thumb: GalleryPic5,
	},
	{
		thumb: GalleryPic6,
	}
]

const options = {
	settings: {
		overlayColor: "rgba(0,0,0,0.9)",
		backgroundColor: "#FDC716",
		slideAnimationType: 'slide',
	},
	buttons: {
		backgroundColor: "#232eff",
		iconColor: "rgba(255, 255, 255, 1)",
	},
	caption: {
		captionColor: "#232eff",
		captionFontFamily: "Raleway, sans-serif",
		captionFontWeight: "300",
		captionTextTransform: "uppercase",
	}
};

// function GalleryImg(){
// 	return(
// 		<>
// 			<SimpleReactLightbox>
// 				<SRLWrapper options={options}>
// 					<ul className="magnific-image">
// 						{content.map((item) => (
// 							<li><img src={item.thumb} alt=""/></li>
// 						))}
// 					</ul>
// 				</SRLWrapper>
// 			</SimpleReactLightbox>	
// 		</>
// 	);
// }

class BlogSidebar extends Component{
	render(){
		return(
			<>
				<aside className="side-bar sticky-top aside-bx">
					<div className="widget">
						<div className="search-bx style-1">
							<form role="search" method="post">
								<div className="input-group">
									<input name="text" className="form-control" placeholder="Entrez vos mots clés..." type="text"/>
									<span className="input-group-btn">
										<button type="submit" className="fa fa-search"></button>
									</span> 
								</div>
							</form>
						</div>
					</div>
					<div className="widget recent-posts-entry">
						<h6 className="widget-title">À lire également</h6>
						<div className="widget-post-bx">
							<div className="widget-post clearfix">
								<div className="ttr-post-media"> <img src={RecentBlogPic1} width="200" height="143" alt=""/> </div>
								<div className="ttr-post-info">
									<div className="ttr-post-header">
										<h6 className="post-title"><Link to={"blog-details-sidebar"}>Precious Tips To Help You Get Better.</Link></h6>
									</div>
									<ul className="media-post">
										<li><Link to={"#"}>Oct 23 2020</Link></li>
									</ul>
								</div>
							</div>
							<div className="widget-post clearfix">
								<div className="ttr-post-media"> <img src={RecentBlogPic2} width="200" height="160" alt=""/> </div>
								<div className="ttr-post-info">
									<div className="ttr-post-header">
										<h6 className="post-title"><Link to={"blog-details-sidebar"}>Ten Doubts You Should Clarify About.</Link></h6>
									</div>
									<ul className="media-post">
										<li><Link to={"#"}>May 14 2020</Link></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					{/* <div className="widget widget_gallery gallery-grid-3">
						<h6 className="widget-title">Our Gallery</h6>
						<GalleryImg />
					</div> */}
					<div className="widget widget_tag_cloud">
						<h6 className="widget-title">Tags</h6>
						<div className="tagcloud"> 
							<Link to="#">Design</Link> 
							<Link to="#">User interface</Link> 
							<Link to="#">SEO</Link> 
							<Link to="#">WordPress</Link> 
							<Link to="#">Development</Link> 
							<Link to="#">Joomla</Link> 
							<Link to="#">Design</Link> 
							<Link to="#">User interface</Link> 
							<Link to="#">SEO</Link> 
							<Link to="#">WordPress</Link> 
							<Link to="#">Development</Link> 
						</div>
					</div>
				</aside>
			</>
		);
	}
}

export default BlogSidebar;