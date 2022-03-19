import React from 'react'

import BGVideo from '../Assets/Backprint_1.webm'

import '../Styles/Home.css'

const LoadingPage = () => {

    return (
        <div style={{ 
                height: "100vh", 
                width: "100vw", 
                position: "relative",
                backgroundColor: "white",
                zIndex: "20",
                overflow: 'hidden',
            }}
        >
            <video loop autoPlay muted 
                style={{   
                    width: "80%",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}>
                <source src={BGVideo} type="video/mp4" />

            </video>
        </div>
    )
}

export default LoadingPage