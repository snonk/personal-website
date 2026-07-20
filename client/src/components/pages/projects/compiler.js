import React from "react";
import { MathJaxContext, MathJax } from "better-react-mathjax";

import "../../../utilities.css";
import "./projpage.css";

const Compiler = () => {
    return (<>
        <div className="projBody">
            <h1 className="projTitle">Decaf Compiler</h1>
            <h2 className="projSubtitle">Spring 2025</h2>
            <p>
                In spring semester of my junior year, I took a class on compilers, in which two other people and I wrote a Decaf compiler in Rust. Decaf is a simple language based on C, with similar syntax but fewer features.
                <br /><br />
                Our compiler lexes and parses the Decaf code into an AST, then performs some static semantic checking in AST form. It then converts that into a control-flow graph, then into SSA form, on which it performs some rounds of data flow optimizations like copy propagation and dead code elimination. Finally, it tries (and fails) to allocate registers.
            </p>
        </div>
    </>);
}

export default Compiler;