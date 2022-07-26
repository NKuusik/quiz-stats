import React, {useState} from 'react';
import {Team} from '../classes/EntityChildren/Team';
import styles from '../style.css';
import MenuBar from './MenuBar';

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
        <div id={styles['menu-bar-comparison']}>
            <MenuBar category={teams} choice={(comparedTeam) => comparisonTeamHandler(comparedTeam)} viewType={'team'}/>
        </div>

    );
}

export default TeamComparison;