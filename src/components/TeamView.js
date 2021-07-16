import React from 'react';

function TeamView(props) {
    return (
        <div>
            <h2>The team in place {props.team.place} is {props.team.name}</h2>
            <h2>Their points during the season were: {props.team.gameScoresAsSting}</h2>
            <h2>Their total score was {props.team.totalScore}</h2>
            <h2>---------------------------------------------------------</h2>    
        </div>
    );

}

export default TeamView;