import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

export function Scores({ scores }) {
  return (
    <Card className="scores">
      <h1>Scoreboard</h1>
      {Object.entries(scores).map(([player, num]) => (
        <div className="score-entry">
          <div className="player-name">
          <span className="elo">{Math.floor(num.elo)}</span> {player} 
          </div>
          <div className="score">
            {num.score}
          </div>
        </div>
      ))}
    </Card>
  );
}
