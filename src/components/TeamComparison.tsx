import React, {useState} from 'react';
import {Team} from '../classes/EntityChildren/Team';
import styles from '../style.css';
import MenuBar from './MenuBar';
import {closeIcon} from '../resources/icons/icons';

type MyProps = {
    teams : {[teamName: string]: Team};
    comparisonTeamHandler: any;
}

function TeamComparison({teams, comparisonTeamHandler}: MyProps) {
    const [viewActive, setViewActive] = useState<Boolean>(false);
    

    let compareTeamsMenuBar = <button onClick={() => setViewActive(true)} className={styles['button-chart']}>Compare Teams</button>;
    if (viewActive) {
        compareTeamsMenuBar = <MenuBar category={teams} choice={(comparedTeam) => comparisonTeamHandler(comparedTeam.name)} viewType={'comparison'}/>;
    }

    console.log(closeIcon);
    return (
        <div id={styles['comparison-menu-bar']}>
            <button onClick={() => setViewActive(false)} className={styles['button-chart']} id={styles['comparison-close']} ><img src={closeIcon} alt='Close'></img></button>
            {compareTeamsMenuBar}
        </div>

    );
}

export default TeamComparison;