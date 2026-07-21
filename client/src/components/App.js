import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import NotFound from "./pages/NotFound.js";
import MainLayout from "./modules/MainLayout.js";
import ScrollToTop from "./modules/ScrollToTop.jsx";

import ProjsetApp from "../projset/components/ProjsetApp.jsx";
import ProjSet from "./pages/projects/projset.js";
import FlapGap from "./pages/projects/flapgap.js";
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


import { useLocation } from "react-router";
import MEng from "./pages/projects/meng.js";

// const ScrollToTop = ({ children }) => {
//   const { pathname, hash } = useLocation();

//   useEffect(() => {
//     if (!hash) {
//       window.scrollTo({
//         top: 0,
//         left: 0,
//         behavior: "smooth",
//       });
//     }
//   }, [pathname]);

//   return children;
// };

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
    <div style={{ minHeight: "100vh", padding: "0%", margin: "0%" }}>
      <ScrollToTop />
      <MathJaxContext config={config}>

        <Routes>
          <Route element={<MainLayout />}>
            <Route
              path="/"
              element={
                <Home
                  path="/"
                />
              }
            />
            <Route path="/projects/projset" element={<ProjSet />} />
            <Route path="/projects/hairsim" element={<HairSim />} />
            <Route path="/projects/meng" element={<MEng />} />
            <Route path="/projects/flapgap" element={<FlapGap />} />
            <Route path="/projects/drywalle" element={<DrywallE />} />
            <Route path="/projects/wig" element={<Wig />} />
            <Route path="/projects/runes" element={<Runes />} />
            <Route path="/projects/oworbit" element={<Oworbit />} />
            <Route path="/projects/grimm" element={<Grimm />} />
            <Route path="/projects/angel" element={<Angel />} />
            <Route path="/projects/alice" element={<Alice />} />
            <Route path="/art/technical" element={<Technical />} />
            <Route path="/art/project" element={<ArtProject />} />
            <Route path="/art/figure" element={<Figure />} />
            <Route path="/art/game" element={<Game />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/projset/*" element={<ProjsetApp />} />
        </Routes>
      </MathJaxContext>
    </div>

  );
};

export default App;
