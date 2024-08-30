import React from "react";

import "../../../utilities.css";
import Project from "../../modules/Project";

const Game = () => {
    const games = [
        {
            id: "runes",
            title: "Runes of Time",
            summary: "A little action game created for GMTK Game Jam 2024.",
            date: "Aug 2024",
        },
        {
            id: "wig",
            title: "Wig Farm",
            summary: "A reverse farming sim created for GMTK Game Jam 2023.",
            date: "Aug 2023",
        },
        {
            id: "drywalle",
            title: "DRYWALL-E",
            summary: "A rhythm-based obstacle course set in a wasteland.",
            date: "Jul 2021",
        },
        {
            id: "grimm",
            title: "Grimm",
            summary: "A scrolling platformer based on an old tale created for the LD48 game jam.",
            date: "Jul 2021",
        },
        {
            id: "oworbit",
            title: "OwOrbit",
            summary: "A cute space game created for the LD46 game jam.",
            date: "Apr 2020",
        },
    ]
    return (<>
    <div style={{margin:"10% 10% 0% 10%"}}>
        <h1 className="projTitle">Game Design</h1>
        <span className="projBody" style={{margin:"0px"}}>
        <p>Some of the games that I've worked on. Visit <a href="https://snopulent.itch.io/">my itch page</a> to play all of them!</p>
        </span>
    </div>
        <div className="projectContainer" >
            {games.map((proj) =>
            <Project id={proj.id} title={proj.title} summary={proj.summary} date={proj.date} key={proj.title} />
            )}
        </div>
        </>);
}

export default Game;