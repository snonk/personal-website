import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import "./Project.css";

const Project = ({ id, title, date, summary }) => {
  const navigate = useNavigate();

  return (
    // <div className="projPreview" onClick={() => navigate('../pages/projects/' + id + ".js") }>
    <Link className="projPreview" to={'/projects/' + id } style={{textDecoration: "none", color: "transparent"}}>
        <img src={"projects/" + title + ".png"} alt=""/>
        <h1>{title}</h1>
        <h2>{date}</h2>
        <p>{summary}</p>
    </Link>
  );
};

export default Project;
