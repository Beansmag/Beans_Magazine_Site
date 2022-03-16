import { useState, useEffect } from "react";

import Product from "./Product";
import sanityClient from '../client';

import '../Styles/Home.css'

export default (props) => {
	const [videoData, setVideoData] = useState()

	useEffect(() => {
        sanityClient.fetch(`*[_type == "backgroundVideo"]{
			title,
			backgroundGif{
                asset->{
                  _id,
                  url
                },
                alt
              },
        }`)
        .then((data) => setVideoData(data))
        .catch(console.error)
      },[])

	//   console.log(videoData && videoData[0].backgroundGif)

	return (
		<div className="Products-wrapper" style={{ overflow: "hidden" }}>
			<Product history={props.history}/>
			{/* <video loop autoPlay muted className="home-bg-vid">
            	<source src={BGVideo} type="video/mp4" />
         	</video> */}
			{/* <img 
				src={videoData && videoData[0].backgroundGif.asset.url} 
				alt="background Video" 
				className="home-bg-vid"
			/> */}
		</div>
	)
}