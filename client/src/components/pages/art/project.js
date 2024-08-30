import React from "react";

import "../../../utilities.css";
import Project from "../../modules/Project";

const ArtProject = () => {
    const projects = [
        {
            id: "angel",
            title: "Angel House",
            summary: "A fantasy world filled with OCs, in development since 2020.",
            date: "2020 - current",
        },
        {
            id: "alice",
            title: "Alice in Wonderland",
            summary: "A reimagining of Alice in Wonderland in the context of Alice in Wonderland syndrome.",
            date: "2021",
        },
    ]
    return (<>
    <div style={{margin:"10% 10% 0% 10%"}}>
        <h1 className="projTitle">Personal Projects</h1>
        <span className="projBody" style={{margin:"0px"}}>
        <p>Some of the projects that I've worked on. </p>
        </span>
    </div>
        <div className="projectContainer" >
            {projects.map((proj) =>
            <Project id={proj.id} title={proj.title} summary={proj.summary} date={proj.date} key={proj.title} />
            )}
        </div>
        </>);
}

export default ArtProject;