import React from "react";

import "./Footer.css";

const Footer = () => {
    return (
      <div className="Footer-container">
        <div className="Footer-linkContainer">
            
            <a href="https://www.instagram.com/snopulent" target="_blank">
                <img src="/assets/ig.png" className="Footer-link"/>
            </a>
            <a href="mailto:scq@mit.edu" target="_blank">
                <img src="/assets/mail.png"  className="Footer-link"/>
            </a>
            <a href="https://github.com/snonk/" target="_blank">
                <img src="/assets/gh.png" className="Footer-link"/>
            </a>
            <a href="https://www.instagram.com/snopulent" target="_blank">
                <img src="/assets/resume.png" className="Footer-link"/>
            </a>
        </div>

        <a href="#title" id="Footer-title">
                <img src="/assets/qiao.png" className="Footer-link"/>
        </a>
        
      </div>
    );
  };
  
export default Footer;