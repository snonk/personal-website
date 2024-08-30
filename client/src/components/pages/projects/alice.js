import React from "react";

import "../../../utilities.css";
import Gallery from "../../modules/Gallery";

const Alice = () => {
    return (<>
        <div className="projBody">
        <h1 className="projTitle">Alice in Wonderland</h1>
        <p>
            Alice.
        </p>
        <Gallery path="alice/"/>

        </div>

        </>);
}

export default Alice;