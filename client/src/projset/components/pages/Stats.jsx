import React, { useEffect, useState } from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import { Card } from '@mui/material';

import "../../utilities.css";
import { post } from "../../utilities";

const Stats = ({ userId }) => {

  const [user, setUser] = useState(0);

  useEffect(() => {
    if (userId) {
      post("/projset/api/stats").then((res) => {
        setUser(res);
      });
    }
  }, [userId]);

  return (
    <div className="text">
      <h1>Your stats</h1>
      <div className="stats">
        <Card sx={{ padding: "1.5em", borderRadius: "1em" }}>
          <p><b>Number of sets found: </b>{user.sets}<br />
            <b>Elo: </b>{~~user.elo}<br />
            <b>Games won:</b> {user.won}<br />
            <b>Games lost:</b> {user.lost}
          </p>
        </Card>
        {/* </div> */}
        {/* <div className="half"> */}
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: user.won, label: 'Games won', color: "#82a2c4" },
                { id: 1, value: user.lost, label: 'Games lost', color: "#c03243" },
              ],
            },
          ]}
          width={400}
          height={200}
        />
      </div>
      {/* <Card> */}
      {/* </Card> */}
    </div>
  );
};

export default Stats;
