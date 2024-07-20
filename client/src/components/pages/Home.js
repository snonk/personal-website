import React, { useEffect, useState } from "react";
import Project from './Project';

import { get } from "/client/src/utilities.js";

import "../../utilities.css";
import "./Home.css";

const Home = () => {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    get("/api/projects").then((projects) => {
      setProjects(projects);
    });
  }, []);

  

  return (
    <div className="home">
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
      <link href="https://fonts.googleapis.com/css2?family=Kosugi&display=swap" rel="stylesheet"/>
      <header className="homeHeader">
        <h1 className="Title">i’m selena, a computer
science student with a focus in systems and security.</h1>
        <p>
          currently a security engineer intern @ amazon
        </p>
      </header>

      <h1 className="sectionTitle">about me</h1>

      <h1 className="sectionTitle">my projects</h1>
      {projects.map((proj) => 
        <Project title={proj.title} summary={proj.summary} date={proj.date} key={proj.title}/>
      )}

      <h1 className="sectionTitle">art</h1>

      
    </div>
  );
}

export default Home;