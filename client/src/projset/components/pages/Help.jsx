import React, { useState, useEffect } from "react";
import SetCard from "../modules/card.jsx";

const Help = () => {
    return (<div className = "text">
      <h1>How to Play</h1>
      <p>
        Projective set is a real-time multiplayer card game derived from the older card game Set. Originally, this game is played with special cards with colored dots, but this web app implements a variant of projective set using only a set of poker cards.
      </p>
      <p>
        In projective set, all cards can be seen as being represented by six bits. Four of these bits are the binary representation of the number. The remaining two bits represent the suit. <b>00</b> for clubs, <b>01</b> for hearts, <b>10</b> for diamonds, and <b>11</b> for spades. A projective set is any number of cards such that all the cards XOR to zero. 
      </p>
      <p>
        There are seven cards on the board at all times<code>&#8212;</code>when a set is found, removed cards are replaced from the deck. When all cards are removed from the deck, the game ends and the player with the most sets wins. There is always a set on the board, and once all cards are removed from the deck, the current board is always a set (and therefore not scored).
      </p>
      <h2>Hints and Examples</h2>
      <p>
        While projective set is most concisely described in terms of bits, it's hard to think about the game in this way. If you're having trouble finding sets, it often helps to think about finding sets as finding cards that "cancel out". It also helps to think about the number and suit separately<code>&#8212;</code>first try to find a set of cards that cancel out numerically, then see if their suits also check out. For example, consider the following cards:
      </p>
      <div className="example-set">

        <SetCard
              content={6}
              selected={false}
              key={0}
              handleSelect={()=>{}}
        />
        <SetCard
              content={19}
              selected={false}
              key={1}
              handleSelect={()=>{}}
        />
        <SetCard
              content={21}
              selected={false}
              key={2}
              handleSelect={()=>{}}
        />
      </div>
      <p>
        First, we consider the numbers: the three is comprised of a two and a one, the five is comprised of a four and one, and the six is comprised of a four and a two. Numerically, the cards cancel out because the ones from the five and three cancel, the twos from the three and six cancel, and the fours from the six and five cancel. Suits-wise, the two diamond cards cancel because they are the same suit, and the clubs is the zero suit so it does not affect the suits. Therefore, these three cards form a projective set.
      </p>
      <p>
        Another example is as follows:
      </p>
      <div className="example-set">

      <SetCard
              content={24}
              selected={false}
              key={3}
              handleSelect={()=>{}}
        />
        <SetCard
              content={20}
              selected={false}
              key={4}
              handleSelect={()=>{}}
        />
        <SetCard
              content={17}
              selected={false}
              key={7}
              handleSelect={()=>{}}
        />
        <SetCard
              content={37}
              selected={false}
              key={5}
              handleSelect={()=>{}}
        />
        <SetCard
              content={56}
              selected={false}
              key={6}
              handleSelect={()=>{}}
        />
        </div>
      <p>
        Again, we check the numbers first: the eights cancel because they are the same number, then the five is comprised of a four and a one, which then cancel with the remaining cards. The suits are a little more complicated: first, two of the diamonds cancel out, so we are left with one diamond, one heart, and one spade.
      </p>
      <p>
        At first glance, these might not seem like they would cancel out, but if we examine the binary representation of the suits, this actually results in there being two ones in each bit position. These then cancel; therefore, both numbers and suits cancel.
      </p>
      <h2>Controls</h2>
      <p>
        Select sets by clicking the cards in the set and then clicking the submit button below the scoreboard. Alternatively, cards can be selected using the <b>asdfzxc</b> keys, each of which correspond to a card position on the board, and sets can be submitted using the Enter or Return key.
      </p>

      <p>
        Have fun! For judging purposes, we've printed the indices of the projective set in the console if you're having trouble finding it.
      </p>
    </div>);
}

export default Help;