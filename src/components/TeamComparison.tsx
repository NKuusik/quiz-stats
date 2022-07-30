import React, {useState} from 'react';
import {Team} from '../classes/EntityChildren/Team';
import styles from '../style.css';
import MenuBar from './MenuBar';

type MyProps = {
    teams : {[teamName: string]: Team};
    comparisonTeamHandler: any;
}

function TeamComparison({teams, comparisonTeamHandler}: MyProps) {
    const [viewActive, setViewActive] = useState<Boolean>(false);
    
    function toggleMenuBar(): void {
        if (viewActive === false) {
            setViewActive(true)
        } else {
            setViewActive(false);
        }
    }

    let compareTeamsMenuBar;
    if (viewActive) {
        compareTeamsMenuBar = <MenuBar category={teams} choice={(comparedTeam) => comparisonTeamHandler(comparedTeam.name)} viewType={'comparison'}/>;
    }

    return (
        <div id={styles['menu-bar-comparison']}>
            <button onClick={() => toggleMenuBar()}>Compare Teams</button>
            {compareTeamsMenuBar}
        </div>

    );
}

export default TeamComparison;