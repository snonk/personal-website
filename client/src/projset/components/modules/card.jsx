import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const SUITS = {
    0: "CLUB",
    1: "DIAMOND",
    2: "HEART",
    3: "SPADE",
}

class SetCard extends React.PureComponent {
    render() {
        let content = this.props.content;


        const handleSelect = (event) => {
            event.preventDefault();
            this.props.handleSelect(this.props.content);
        }

        return (
            <Card sx={{ width: 100, display: 'inline-block', margin: 2, boxShadow: this.props.selected ? ('0px 0px 4px 4px rgb(25 118 210 / 40%)') : 2, }}
                onClick={handleSelect} className={"slide-in-right"}>
                <CardActionArea>
                    <CardContent style={{ padding: "0px" }}>
                        {/* <Typography>
                        {(content % 0x10) + " of " + SUITS[content >> 4]+ "s"}
                    </Typography> */}
                        <img
                            src={"/projset/faces/" + SUITS[content >> 4] + "-" + (content % 0x10) + ".svg"}
                            style={{ width: "100%" }}
                        />
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
}


// const SetCard = (props) => {
//     let content = props.content;

//     useEffect(() => { console.log('mounted'); }, [])

//     const handleSelect = (event) => {
//         event.preventDefault();
//         props.handleSelect(props.content);
//     }

//     return (
//         <Card sx={{ maxWidth: 100, display: 'inline-block', margin: 2, boxShadow: props.selected? ('0px 0px 4px 4px rgb(25 118 210 / 40%)'):2,}}
//         onClick = {handleSelect} className={"slide-in-right"}>
//             <CardActionArea>
//                 <CardContent style={{padding:"0px"}}>
//                     {/* <Typography>
//                         {(content % 0x10) + " of " + SUITS[content >> 4]+ "s"}
//                     </Typography> */}
//                     <img
//                         src={"assets/faces/"+SUITS[content >> 4]+"-"+(content % 0x10)+".svg"}
//                         style={{width:"100%"}}
//                     />
//                 </CardContent>
//             </CardActionArea>
//         </Card>
//     );
// }

export default React.memo(SetCard);