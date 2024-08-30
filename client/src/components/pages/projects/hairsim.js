import React from "react";
import { MathJaxContext, MathJax } from "better-react-mathjax";

import "../../../utilities.css";
import "./projpage.css";

const HairSim = () => {
    return (<>
        <div className="projBody">
        <h1 className="projTitle">HairSim</h1>
        <h2 className="projSubtitle">Nov 2023</h2>
        <p>
        HairSim is a simple graphics project that aims to recreate some of the essential physical behaviors of hair: inextensibility, hair-hair repulsion, and friction.
        </p>
        <div className="captionedPhoto">
            <img src="/projects/hairs.png"/>
            <p>Hair strands being affected by a wind force, in chronological order of appearance.</p>
        </div>
        <p>
        
        This project is written in <a href="https://sourceforge.net/projects/gloo/" target="_blank">GLOO</a>, an object-oriented C++ wrapper for OpenGL and implements a particle-based approach to simulating hair. Each strand of hair is represented by a string of particles, where the first particle of every strand is at a fixed position.
        <br/>
        <br/>
        This particle-based approach is based on <a href="https://matthias-research.github.io/pages/publications/FTLHairFur.pdf" target="_blank">Müller, Kim, and Chentanez’s approach</a> to imitating the inextensibility of hair. This is in contrast to some other approaches to rendering hair that involve mass-spring systems, which allow for the length-wise stretching of hair. These approaches may be better suited for curly hair, where there is a little more room for extensibility.
        <div className="captionedPhoto smallPhoto">
            <img src="/projects/particles.png"/>
            <p>Hair strands including the corresponding particle
            control points.</p>
        </div>
       
        However, in straight hair, there is typically little extensibility or strech along the length of the hair, as the hair strand itself is very inelastic. Therefore, to imitate this property of hair, the individual particles that make up the hair must always maintain a constant distance between them. Then, even as the positions and velocities of the particles change, the distance between them is preserved and therefore the entire length of the hair strand remains constant throughout the simulation.
        <br/>
        <br/>
        Much of hair dynamics is also highly dependent on numerous small-scale interactions between individual hairs, which collectively create movement on a larger scale. Collisions between hair strands create friction, and static electricity forces can cause hairs to stick together in clusters or repulse each other to create frizz; a combination of many strands can also create a larger volume of hair from the volume of strands. However, simulating each of these behaviors on such an individual scale is extremely expensive – a human head can contain hundreds of thousands of strands, and coats of animals can contain millions.
        </p>
        
        <p>
        Therefore, this behavior must be approximated using alternative strategies. To simulate hair-hair repulsion and friction, I borrowed ideas from <a href="https://graphics.pixar.com/library/Hair/paper.pdf" target="_blank">Petrovic, Henne, and Anderson’s exploration</a> of volumetric based hair rendering.
        <br/>
        <br/>

        In their paper, they group hair particles based on position into a voxel grid. From this grid, particles are velocity smoothed and hair is directed into a target shape by calculating the gradient between a target voxel grid and a current voxel grid.
        <br/>
        
        <br/>

        <br/>

        <MathJax>
        {"The positions and velocities of each particle is updated based on the following equations from simple kinematics, where $\\mathbf{p}_i$ represents the new position and $\\mathbf{x}_i$ represents the position of the particle at the previous timestep:"}
        </MathJax>
        <br/>
        <br/>
        <MathJaxContext>
            <MathJax>
            {
                "\\begin{equation}\\tag{1}\\mathbf{p}_i \\leftarrow \\mathbf{x}_i + \\Delta t\\mathbf{v}_i + \\Delta t^2 \\frac{\\mathbf{f}_i} {m_i}\\end{equation} \\begin{equation}\\tag{2}\\mathbf{v}_i \\leftarrow \\mathbf{p}_i - \\mathbf{x}_i \\Delta t \\end{equation} \\begin{equation}\\tag{3}\\mathbf{p}_i \\leftarrow \\mathbf{x}_i \\end{equation}"
            }
            </MathJax>
        </MathJaxContext>
        <br/>
        <br/>
        This set of equations can be modified to handle the distance constraints between particles by modifying the position and velocity updates to account for these
        updates.
        </p>
        </div>
        </>);
}

export default HairSim;