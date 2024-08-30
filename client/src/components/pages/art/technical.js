import React from "react";

import "../../../utilities.css";
import Gallery from "../../modules/Gallery";

const Technical = () => {
    return (<>
        <div className="projBody">
        <h1 className="projTitle">Technical Work</h1>
        <p>
            A mix of digital and traditional pieces.
        </p>
        <Gallery path="technical/"/>

        </div>

        </>);
}

export default Technical;