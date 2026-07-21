import "../styles.css";
import firebase from "../firebase.js";
import * as firebaseui from "firebaseui";

// import fbauth from "firebase/auth";
import { Game } from "./pages/game.jsx";
import PrivateRoute from "./modules/PrivateRoute.jsx"

import Home from "./pages/Home.jsx";

import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound.jsx";
import Skeleton from "./pages/Skeleton.jsx";
import Help from "./pages/Help.jsx";
import Stats from "./pages/Stats.jsx";


import NavBar from "./modules/NavBar.jsx";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities.js";

/**
 * Define the "App" component
 */
const ProjsetApp = () => {
  const [userId, setUserId] = useState(undefined);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    get("/projset/api/whoami").then((user) => {
      if (user._id) {
        setUserId(user._id);
      }
      setLoadingUser(false);
    });
  }, []);
  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/projset/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/projset/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/projset/api/logout");
  };

  if (loadingUser) {
    return null; // or a spinner
  }
  return (
    <div className="projset-root">
      <NavBar handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
      <Routes>
        <Route
          path="/"
          element={
            <Skeleton
              path="/"
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              userId={userId}
            />
          }
        />
        <Route path="home" element={<PrivateRoute auth={userId}>
          <Home userId={userId} />
        </PrivateRoute>} />
        <Route path="game" element={<PrivateRoute auth={userId}>
          <Game userId={userId} />
        </PrivateRoute>} />
        <Route path="help" element={<Help />} />
        <Route path="stats" element={<PrivateRoute auth={userId}>
          <Stats userId={userId} />
        </PrivateRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default ProjsetApp;
