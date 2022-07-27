import React, {useState} from 'react';
import {Team} from '../classes/EntityChildren/Team';
import styles from '../style.css';
import MenuBar from './MenuBar';

type MyProps = {
    teams : {[teamName: string]: Team};
    comparisonTeamHandler: any;
}

function TeamComparison({teams, comparisonTeamHandler}: MyProps) {
    return (
        <div id={styles['menu-bar-comparison']}>
            <MenuBar category={teams} choice={(comparedTeam) => comparisonTeamHandler(comparedTeam.name)} viewType={'comparison'}/>
        </div>

    );
}

export default TeamComparison;