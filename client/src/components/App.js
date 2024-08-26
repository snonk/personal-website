import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import NotFound from "./pages/NotFound.js";
import NavBar from "./modules/NavBar.js";
import Footer from "./modules/Footer.js";

import ProjSet from "./pages/projects/projset.js";
import HairSim from "./pages/projects/hairsim.js";
import Technical from "./pages/art/technical.js";
import Figure from "./pages/art/figure.js";
import Game from "./pages/art/game.js";
import Project from "./pages/art/project.js";

// import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */


const App = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    get("/api/projects").then((projects) => {
      setProjects(projects);
    });
  }, []);

  return (
    <>
      <NavBar/>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              path="/"
            />
          }
        />
        <Route path="/projects/projset" element={<ProjSet/>}/>
        <Route path="/projects/hairsim" element={<HairSim/>}/>
        <Route path="/art/technical" element={<Technical/>}/>
        <Route path="/art/project" element={<Project/>}/>
        <Route path="/art/figure" element={<Figure/>}/>
        <Route path="/art/game" element={<Game/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </>
  );
};

export default App;
