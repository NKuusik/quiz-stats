import React from 'react';
import LineChart from '../subcomponents/LineChart';

function TeamView(props) {
    return (
        <div>
            <h2>The team in place {props.team.place} is {props.team.name}</h2>
            <h2>Their total score was {props.team.totalScore}</h2>
            <LineChart team={props.team}></LineChart>
            <h2></h2>    
        </div>
    );

}

export default TeamView;