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
import ArtProject from "./pages/art/project.js";

// import { socket } from "../client-socket.js";

import { get, post } from "../utilities";
import { MathJaxContext } from "better-react-mathjax";
import DrywallE from "./pages/projects/drywalle.js";
import Wig from "./pages/projects/wig.js";
import Runes from "./pages/projects/runes.js";
import Oworbit from "./pages/projects/oworbit.js";
import Grimm from "./pages/projects/grimm.js";
import Angel from "./pages/projects/angel.js";
import Alice from "./pages/projects/alice.js";

/**
 * Define the "App" component
 */


const App = () => {
  const [projects, setProjects] = useState([]);

  const config = {
    loader: { load: ["[tex]/html"] },
    tex: {
      packages: { "[+]": ["html"] },
      inlineMath: [
        ["$", "$"],
        ["\\(", "\\)"]
      ],
      displayMath: [
        ["$$", "$$"],
        ["\\[", "\\]"]
      ]
    }
  };

  useEffect(() => {
    get("/api/projects").then((projects) => {
      setProjects(projects);
    });
  }, []);

  return (
    <MathJaxContext config={config}>
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
        <Route path="/projects/drywalle" element={<DrywallE/>}/>
        <Route path="/projects/wig" element={<Wig/>}/>
        <Route path="/projects/runes" element={<Runes/>}/>
        <Route path="/projects/oworbit" element={<Oworbit/>}/>
        <Route path="/projects/grimm" element={<Grimm/>}/>
        <Route path="/projects/angel" element={<Angel/>}/>
        <Route path="/projects/alice" element={<Alice/>}/>
        <Route path="/art/technical" element={<Technical/>}/>
        <Route path="/art/project" element={<ArtProject/>}/>
        <Route path="/art/figure" element={<Figure/>}/>
        <Route path="/art/game" element={<Game/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </MathJaxContext>
  );
};

export default App;
