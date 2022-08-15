import React, { useEffect, useState } from 'react';
import sanityClient from '../client';

import '../Styles/Home.css'

const LoadingPage = () => {
    const [ videoData ,setVideoData] = useState()

    useEffect(() => {
        sanityClient.fetch(`*[_type == "checkoutAnimation"]{
			LoadingAnimation{
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

    return (
        <div style={{ 
                height: "100vh", 
                width: "100vw", 
                position: "fixed",
                backgroundColor: "white",
                zIndex: "20",
                overflow: 'none',
            }}
        >
            <img src={videoData && videoData[0].LoadingAnimation.asset.url}
                style={{ 
                    width: "auto",
                    minWidth: "600px",
                    height: "100%",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    border: "none",
                }}
            />
        </div>
    )
}

export default LoadingPage