import React from "react";

import "../../../utilities.css";
import "./projpage.css";

const ProjSet = () => {
    return (<>
        <div className="projBody">
        <h1 className="projTitle">ProjSet</h1>
        <h2 className="projSubtitle">Jan 2024</h2>
        <p>
            ProjSet is a real-time multiplayer card game created using React, Express.js, and MongoDB. The multiplayer networking uses Socket.IO.
            <br/>
            <br/>
            The game can be played <a href="https://projset-f5m9.onrender.com/" target="_blank">here</a>.
            {/* <br/> */}
            {/* <br/> */}
            <span style={{color:"var(--faded-text)", fontSize: "11pt"}}> (please go play it's really fun I promise)</span>
        </p>
        <div className="captionedPhoto">
            <img src="/projects/projset_home.png"/>
            <p>In-game screenshot of a game of projective set.</p>
        </div>
        <p>
        In projective set, all cards can be seen as being represented by six bits. Four of these bits are the binary representation of the number. The remaining two bits represent the suit. 00 for clubs, 01 for hearts, 10 for diamonds, and 11 for spades. A projective set is any number of cards such that all the cards XOR to zero.
        <br/>
        <br/>
        There are seven cards on the board at all times—when a set is found, removed cards are replaced from the deck. When all cards are removed from the deck, the game ends and the player with the most sets wins. There is always a set on the board, and once all cards are removed from the deck, the current board is always a set (and therefore not scored).

        </p>
        <p>
            More detailed rules and hints can be found on <a href="https://projset-f5m9.onrender.com/help" target="_blank">the game website</a>.
        </p>
        </div>
        </>);
}

export default ProjSet;