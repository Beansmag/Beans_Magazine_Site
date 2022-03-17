import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Close from "../../Assets/Close.svg";
import Open from "../../Assets/Open.svg";
import './hamburgerMenu.css';

  export default function MenuRight() {
    const [rightMenuVisible, setRightMenuVisible] = useState(false);

    return (
      <div style={{ position: "fixed", zIndex: "9999", top: "0" }}>
        <img
        	alt="menu"
					className="menu-button"
					onClick={() => setRightMenuVisible(!rightMenuVisible)}
					src={rightMenuVisible ? Close : Open}
        />
        <div 
          style={{
            transform: `${rightMenuVisible ? "translateX(0)" : "translateX(100%)" }`,
            opacity: `${rightMenuVisible ? "1" : "0" }`,
            transition: "transform 0.5s"
          }}
          className="menu menu--right"
        >
          <nav style={{ paddingTop: "20px", paddingBottom: "20px" }}> 
                <li className="menu-list-item menu-list-item--right" onClick={() => setRightMenuVisible(!rightMenuVisible)}>
                  <Link to="/">
                    Home
                  </Link>
                </li>
                <li className="menu-list-item menu-list-item--right" onClick={() => setRightMenuVisible(!rightMenuVisible)}>
                  <Link to="/lookbook">
                    Lookbook  
                  </Link>
                </li>
                <li className="menu-list-item menu-list-item--right" onClick={() => setRightMenuVisible(!rightMenuVisible)}>
                  <Link to="/about">
                    About 
                  </Link>
                </li>
          </nav> 
      </div >
    </div>
    );
}