import React from "react";

import "../../../utilities.css";
import Gallery from "../../modules/Gallery";

const Angel = () => {
    return (<>
        <div className="projBody">
        <h1 className="projTitle">Angel House</h1>
        <h2 className="projSubtitle">in collaboration with Katherine Huang</h2>
        <p>
            <i>Angel House</i> is a web comic set in a fantasy world, which was in development for several years. Below is a collection of character design sketches, concept art, and drafts of panels, which I hope can provide a peek into the process.
        </p>
        <div className="captionedPhoto">
            <img src="/art/ah-concept/angel.png"/>
            <p>inspired by redum</p>
        </div>

        <h2 className="projSubtitle">Character Design</h2>
        <p>
            <i>Angel House</i> has a fairly large cast of characters, some of whose designs have been constantly updated throughout the process.
        </p>
        
        <div className="captionedPhoto" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
            <img src="/art/ah-design/ig1.png" style={{ flex: "1 1 30%", maxWidth: "30%", margin: "0 1%" }} />
            <img src="/art/ah-design/ig2.png" style={{ flex: "1 1 30%", maxWidth: "32%", margin: "0 1%" }} />
            <img src="/art/ah-design/ig3.png" style={{ flex: "1 1 30%", maxWidth: "30%", margin: "0 1%" }} />
            <p>The initial designs for proposed characters, some of which were retained, some discarded, and some drastically updated.</p>
        </div>

        <p>The two main characters are Delaire and Ponkey, who are best described as angry and unserious, respectively. Delaire started out as Brooke, who can also be seen in the previous set of characters, and eventually was updated into who her character is today. </p>
        <div className="captionedPhoto">
            <img src="/art/ah-design/brooke.png" style={{ width: "40%", margin:"auto"}} />
            <p>Brooke, before she became Delaire</p>
        </div>
        <div className="captionedPhoto">
            <img src="/art/ah-design/fiddling with characters.png" style={{ width: "40%", margin:"auto"}} />
            <p>Various sketches of Delaire and her two sisters, Vicky and Kitty.</p>
        </div>

        <p>Ponkey's design hasn't actually been updated all that much, considering how much she appears in my art. She is primarily marked by the pink and green of her hair, which still is one of my favorite color combinations.
        </p>
        <div className="captionedPhoto" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: "20px", width: "100%" }}>
                <img src="/art/ah-design/ponk.png" style={{ width: "40%" }} />
                <img src="/art/ah-concept/ponkey underwater.png" style={{ width: "40%" }} />
            </div>
            <p>Some Ponkeys</p>
        </div>

        <div className="captionedPhoto">
            <img src="/art/ah-design/char design sheet - ponk.png" style={{ width: "80%", margin:"auto"}} />
            <p>Some of Ponkey's later design iterations</p>
        </div>

        <div className="captionedPhoto">
            <img src="/art/ah-design/character finals.png" style={{ width: "70%", margin:"auto"}} />
            <p>Finalized designs of some of the characters at the point of beginning actual panels of the web comic. In order, they are Ponkey, Delaire, Arsenic, Nox, and Kali.</p>
        </div>

        <h2 className="projSubtitle">Concept Art</h2>
        <p>In the process of constructing this world, a lot of art was created of the characters, their interactions, and their world. </p>
        <div className="captionedPhoto">
            <img src="/art/ah-design/church concept.png" style={{ width: "40%", margin:"auto"}} />
            <p>The church where Delaire and her sisters were raised.</p>
        </div>
        <div className="captionedPhoto">
            <img src="/art/ah-design/ah.png" style={{ width: "40%", margin:"auto"}} />
            <p>The cover art created for the web comic, depicting Delaire, Lux, and Ponkey in her ghost form.</p>
        </div>
        <Gallery path="ah-concept/"/>
        <h2 className="projSubtitle">Final Panels</h2>
        <p>Though there was a lot of preparatory work, below are the only finalized panels created for this web comic. The comic begins with a view into Delaire's childhood with her two sisters.</p>
        <Gallery path="ah-panels/"/>

        </div>

        </>);
}

export default Angel;