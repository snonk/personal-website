import React, { useEffect, useLayoutEffect, useState } from "react";
import Project from '../modules/Project';

import { get } from "/client/src/utilities.js";

import "../../utilities.css";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  
  const primaryPhrases = [
    'a computer science student',
    'an artist',
    'a music enjoyer',
    'a bird fan'
  ]
  const secondaryPhrases = [
    'focus in systems and security',
    'love for color',
    'soft spot for operas',
    'particular love for pigeons'
  ]
  const [projects, setProjects] = useState([]);
  const [primaryText, setPrimaryText] = useState(primaryPhrases[0]);
  const [secondaryText, setSecondaryText] = useState(secondaryPhrases[0]);

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
          <h1 className="Title" id="title">i’m selena, <span className="primaryDesc">{primaryText}</span> with a <span className="secondaryDesc">{secondaryText}</span>.</h1>
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
          hi! i'm selena, currently an undergraduate at MIT studying computer science. i love anything systems or security or graphics, but i also do some drawing in my free time so this website is a space for me to dump it all!
          <br/>
          <br/>
          </p>
          <div style={{textAlign: "left"}}>
          <p>
          stuff i like today:
            <ul>
              <li><a href="https://www.blastradius.fail/attack-details">this attack</a> on an old network protocol i read about and never thought i'd see again</li>
              <li>emma harner's <a href="https://open.spotify.com/artist/22LN4kmzdiXhbuFUU4GWCQ">music</a></li>
              <li>cardamom and orange blossom</li>
            </ul>

          </p>

          </div>
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