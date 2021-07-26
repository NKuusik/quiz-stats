import React from 'react';
import LineChart from '../subcomponents/LineChart';


function TeamView(props) {
    return (
        <div>
            <h1>Stats for team {props.team.name}</h1>
            <h2 onClick={() => props.chooseTeam(null)}>Go Back</h2>
            <h2>Their total score was {props.team.totalScore}</h2>
            <LineChart team={props.team}></LineChart>
            <h2></h2>    
        </div>
    );

}

export default TeamView;