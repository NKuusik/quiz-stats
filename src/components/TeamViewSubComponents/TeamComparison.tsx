import React, {useState} from 'react';
import {Team} from '../../classes/EntityChildren/Team';
import styles from '../../style.css';
import MenuBar from '../MenuBar';
import {closeIcon} from '../../resources/icons/icons';

type MyProps = {
    teams : {[teamName: string]: Team};
    comparisonTeamHandler: any;
}

function TeamComparison({teams, comparisonTeamHandler}: MyProps) {
  const [viewActive, setViewActive] = useState<Boolean>(false);

  let menuBar = <button onClick={() => setViewActive(true)} className={styles['button-chart']}>Compare Teams</button>;
  let closeButton;

  if (viewActive) {
    closeButton = <button onClick={() => setViewActive(false)} className={styles['button-chart']} id={styles['comparison-close']} ><img src={closeIcon} alt='Close'></img></button>;
    menuBar = <MenuBar category={Object.keys(teams)} choice={(comparedTeamName: string) => comparisonTeamHandler(comparedTeamName)} viewType={'comparison'} collapseFunction={() => { console.log('boo'); }}/>;
  }

  return (
        <div id={styles['comparison-container']}>
            {closeButton}
            <div id={styles['comparison-menu-bar']}>
                {menuBar}
            </div>
        </div>
  );
}

export default TeamComparison;
