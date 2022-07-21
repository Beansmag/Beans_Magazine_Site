import React from 'react';

// import BGVideo from '../Assets/Backprint_1.webm';
import BGGif from '../Assets/Backprint_1.gif';

import '../Styles/Home.css'

const LoadingPage = () => {

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
            <img src={BGGif} alt="Loading Video"
                style={{ 
                    width: "auto",
                    minWidth: "600px",
                    height: "100%",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            />
        </div>
    )
}

export default LoadingPage