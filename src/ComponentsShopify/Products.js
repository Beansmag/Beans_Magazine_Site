import React from "react";

import Product from "./Product";
import Navbar from '../Components/Navbar'

// import BGVideo from '../Assets/BackgroundVideo.mp4';

import '../Styles/Home.css'

export default (props) => {
	return (
		<div className="Products-wrapper" style={{ overflow: "hidden" }}>
			<Product history={props.history} />
			{/* <video loop autoPlay muted className="home-bg-vid">
            	<source src={BGVideo} type="video/mp4" />
         	</video> */}
		</div>
	)
}