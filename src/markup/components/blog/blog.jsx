import React from 'react';
import { Link } from 'react-router-dom';

// Picture
import blogDefaultPic1 from "../../../images/blog/masonry/pic6.jpg"

export default function AllBlog(props) {
    const { data } = props

    return (
        <>
            <div className="content-block" id="content-area">
                <div className="section-area section-sp2 bg-gray">
                    <div className="container">
                        <div className='row'>
                            {data &&
                                data.map((item) =>
                                    <div className="action-card col-lg-4 col-md-6 col-sm-12" key={item.IDSitePoste}>
                                        <div className="recent-news style-2">
                                            <div className="action-box">
                                                {/* prb format photo reçu de l'api rest, en stand by */}
                                                <img src={blogDefaultPic1} alt="" />
                                            </div>
                                            <div className="info-bx">
                                                <ul className="media-post">
                                                    {/* <li className="date"><Link to={item.url}>{item.postDate}</Link></li> */}
                                                    {/* <li className="admin"><Link to={item.url}><img src={item.authorImg} alt=""/>By {item.authorName}</Link></li> */}
                                                    {/* <li className="comment"><Link to={item.url}><i className="ti ti-comment-alt"></i><span>{item.comment}</span></Link></li> */}
                                                </ul>
                                                <h2 className="post-title h5 fw-bold"><Link to={`/blog/${item.URL}`}>{item.Titre}</Link></h2>
                                                <p>You will see in the guide all my years of valuable experience together with.</p>
                                                <div className="post-extra">
                                                    <Link to={`/blog/${item.URL}`} className="btn button-md radius-xl btn-dark">LIRE PLUS</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}