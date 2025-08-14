import React from "react";
import { HashLink as Link } from 'react-router-hash-link';

import "./NavBar.css";

const NavBar = () => {
    return (
      <nav className="NavBar-container">
        <Link to="/" className="NavBar-link" scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })} id="NavBar-title">
                <img src="/assets/selenaqiao.png" style={{height:"60px"}}/>
        </Link>
        
        <div className="NavBar-linkContainer">
            
            <Link to="/#about" className="NavBar-link" scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })} >
                about
            </Link>
            <Link to="/#projects" className="NavBar-link" scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                projects
            </Link>
            <Link to="/#art" className="NavBar-link" scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                art
            </Link>
            <Link to="/#contact" className="NavBar-link" scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                contact
            </Link>
        </div>
      </nav>
    );
  };
  
export default NavBar;