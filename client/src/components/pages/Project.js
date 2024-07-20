import React from "react";
import { useNavigate } from "react-router-dom";

import "./Project.css";

const Project = ({ title, date, summary }) => {
  const navigate = useNavigate();

  return (
    <div className="projPreview">
        <h1 onClick={() => navigate('./projects/' + title)}>{title}</h1>
        <h2>{date}</h2>
        <img src={title + ".png"} alt={title}/>
        <p>{summary}</p>
    </div>
  );
};

export default Project;
