import React, { useEffect, useLayoutEffect, useState } from "react";
import Project from '../modules/Project';

import { get } from "/client/src/utilities.js";

import "../../utilities.css";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {

  const [projects, setProjects] = useState([]);
  const [primaryText, setPrimaryText] = useState("computer science student");
  const [secondaryText, setSecondaryText] = useState("focus in systems and security");

  useEffect(() => {
    get("/api/projects").then((projects) => {
      setProjects(projects);
    });
  }, []);

  // ——————————————————————————————————————————————————
  // TextScramble
  // ——————————————————————————————————————————————————

  Number.prototype.mod = function(n) {
    return ((this % n) + n) % n;
  }
  class TextScramble {
    constructor(setText) {
      this.chars = '!<>-_\\/[]{}—=+*^?#________'
      this.update = this.update.bind(this)
      this.setText = setText;
    }
    updateText(oldText, newText) {
      const length = Math.max(oldText.length, newText.length)
      const promise = new Promise((resolve) => this.resolve = resolve)
      this.queue = []
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || ''
        const to = newText[i] || ''
        const start = Math.floor(Math.random() * 40)
        const end = start + Math.floor(Math.random() * 40)
        this.queue.push({ from, to, start, end })
      }
      cancelAnimationFrame(this.frameRequest)
      this.frame = 0
      this.update();
      return promise;
    }
    update() {
      let output = ''
      let complete = 0
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i]
        if (this.frame >= end) {
          complete++
          output += to
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar()
            this.queue[i].char = char
          }
          output += char;
        } else {
          output += from
        }
      }
      this.setText(output);
      if (complete === this.queue.length) {
        this.resolve()
      } else {
        this.frameRequest = requestAnimationFrame(this.update)
        this.frame++
      }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
  }

  // ——————————————————————————————————————————————————
  // Example
  // ——————————————————————————————————————————————————

  const primaryPhrases = [
    'computer science student',
    'artist',
    'music enjoyer',
    'bird fan'
  ]
  const secondaryPhrases = [
    'focus in systems and security',
    'love for color',
    'something',
    'particular love for pigeons'
  ]
  
  const updatePrimary = (text) => {
    setPrimaryText(text);
  }

  const updateSecondary = (text) => {
    setSecondaryText(text);
  }

  const primaryFx = new TextScramble(updatePrimary)
  const secondaryFx = new TextScramble(updateSecondary)

  useEffect(() => {
    let counter = 0;
    const next = () => {
      Promise.all([primaryFx.updateText(primaryPhrases[(counter + primaryPhrases.length - 1) % primaryPhrases.length], primaryPhrases[counter]),
        secondaryFx.updateText(secondaryPhrases[(counter + primaryPhrases.length - 1) % secondaryPhrases.length], secondaryPhrases[counter])]).then(()=>{
          setTimeout(next, 1300);
        });
      counter = (counter + 1) % primaryPhrases.length;
    }
    next();
  }, [])


  return (
    <div className="home" style={{height: "100%"}}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Kosugi&display=swap" rel="stylesheet" />
      <div className="homeHeader">
        <div>
          <h1 className="Title" id="title">i’m selena, a <span className="primaryDesc">{primaryText}</span> with a <span className="secondaryDesc">{secondaryText}</span>.</h1>
        </div>
        <p className="Subtitle">
          currently a security engineer intern @ amazon
        </p>
        <img className="stars1" src="assets/stars.png"/>
        <img className="stars1" src="assets/stars2.png"/>
        <img className="plant" src="assets/plant.png"/>
        <img className="plant" src="assets/plant2.png"/>
      </div>

      <h1 className="sectionTitle" id="about">about me</h1>
      <div className="aboutContainer">
        <img src="assets/me.png" className="about"/>
        <img className="stars2" src="assets/stars.png"/>
        <img className="stars2" src="assets/stars2.png"/>
        <div className="about">
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>

      <h1 className="sectionTitle" id="projects">my projects</h1>
      <div className="projectContainer">
        {projects.map((proj) =>
          <Project id={proj.id} title={proj.title} summary={proj.summary} date={proj.date} key={proj.title} />
        )}
      </div>

      <h1 className="sectionTitle" id="art">art</h1>
      <div className="artContainer">
        <div id="technical" className="artCategory" style={{
          backgroundImage: "url(assets/technical.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "350px"
          }}>
        <Link to="/art/Technical">
          <img src="assets/technical.png"/>
        </Link>
        </div>
        
        <div id="artProjects" className="artCategory" style={{
          backgroundImage: "url(assets/projects.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "350px"
          }}>
        <Link to="/art/Project">
          <img src="assets/projects.png"/>
        </Link>
        </div>
        
        <div id="game" className="artCategory" style={{
          backgroundImage: "url(assets/game.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "350px"
          }}>
          <Link to="/art/Game">
          <img src="assets/game.png"/>
          </Link>
        </div>
        
        <div id="figure" className="artCategory" style={{
          backgroundImage: "url(assets/figure.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "350px"
          }}>
          <Link to="/art/Figure">
        <img src="assets/figure.png"/>
          </Link>
        </div>
        

      </div>

      <h1 className="sectionTitle" id="contact">contact me</h1>
      <div className="contactContainer">
          <p> email: scq at mit dot edu</p>
      </div>


    </div>
  );
}

export default Home;