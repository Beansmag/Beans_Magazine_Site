import { useState, useEffect } from "react";

import Product from "./Product";
// import sanityClient from '../client';

import '../Styles/Home.css'

export default (props) => {
	const [videoData, setVideoData] = useState()

	// useEffect(() => {
    //     sanityClient.fetch(`*[_type == "backgroundVideo"]{
	// 		title,
	// 		backgroundGif{
    //             asset->{
    //               _id,
    //               url
    //             },
    //             alt
    //           },
    //     }`)
    //     .then((data) => setVideoData(data))
    //     .catch(console.error)
    //   },[])

	return (
		<div className="Products-wrapper" style={{ overflow: "hidden" }}>
			<Product history={props.history}/>
			{/* <div 
				src={videoData && videoData[0].backgroundGif.asset.url} 
				alt="background Video" 
				className="home-bg-vid"
				style={{ backgroundImage: `url(${videoData && videoData[0].backgroundGif.asset.url})` }}
			>
			</div> */}
		</div>
	)
}