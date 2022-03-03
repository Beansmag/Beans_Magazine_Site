import { Center } from '@react-three/drei'
import React from 'react'

import BGVideo from '../Assets/Backprint_1.mp4'

import '../Styles/Home.css'

const LoadingPage = () => {

    return (
        <div style={{ height: "100vh", width: "100vw", backgroundColor: "white", position: "fixed", zIndex: "30" }}>
        <video loop autoPlay muted 
            style={{   
                position: "fixed",
                right: "25%",
                bottom: "0",
                width: "auto",
                height: "100vh",
                alignContent: "Center",
            }}>
             <source src={BGVideo} type="video/mp4" />
        </video>
        </div>
    )
}

export default LoadingPage