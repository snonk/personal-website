import React from "react";
import { HashLink as Link } from 'react-router-hash-link';

import "./NavBar.css";

const NavBar = () => {
    return (
      <nav className="NavBar-container">
        <Link to="/" className="NavBar-link" id="NavBar-title">
                <img src="/assets/selenaqiao.png" style={{height:"60px"}}/>
        </Link>
        
        <div className="NavBar-linkContainer">
            
            <Link to="/#about" className="NavBar-link">
                about
            </Link>
            <Link to="/#projects" className="NavBar-link">
                projects
            </Link>
            <Link to="/#art" className="NavBar-link">
                art
            </Link>
            <Link to="/#contact" className="NavBar-link">
                contact
            </Link>
        </div>
      </nav>
    );
  };
  
export default NavBar;