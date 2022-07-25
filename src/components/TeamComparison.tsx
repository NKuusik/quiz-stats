import React, {useState} from 'react';
import {Team} from '../classes/EntityChildren/Team';
import styles from '../style.css';

type MyProps = {
    teams : {[teamName: string]: Team};
    comparisonTeamHandler: any;
}

function TeamComparison({teams, comparisonTeamHandler}: MyProps) {
    let teamNames: any = []
    for (let team of Object.keys(teams)) {
        teamNames.push(
        <button onClick={() => comparisonTeamHandler(teams[team])}>{team}</button>);
    }
    return (
        <div>
            <p>I am team comparison</p>
            {teamNames[0]}
            {teamNames[1]}
        </div>

    );
}

export default TeamComparison;