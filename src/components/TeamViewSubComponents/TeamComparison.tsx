import React, {useState} from 'react';
import {Team} from '../../classes/EntityChildren/Team';
import * as styles from '../../style.css';
import MenuBar from '../MenuBar';
import {closeIcon} from '../../resources/icons/icons';

type MyProps = {
    teams : {[teamName: string]: Team};
    comparisonTeamHandler: (teamName: string) => void;
    collapseWidth: number;
}

function TeamComparison({
    teams, 
    comparisonTeamHandler, 
    collapseWidth}: MyProps) {
  const [viewActive, setViewActive] = useState<boolean>(false);
 
 
  let compareButtonText = 'Compare Teams';
  if (window.innerWidth < collapseWidth) {
    compareButtonText = 'compare';
  }

  let menuBar = <button onClick={() => setViewActive(true)} className={styles['button-chart']}>{compareButtonText}</button>;
  let closeButton;

  if (viewActive) {
    closeButton = <button onClick={() => setViewActive(false)} className={styles['button-chart']} id={styles['comparison-close']} ><img src={closeIcon} alt='Close'></img></button>;
    menuBar = <MenuBar 
      category={Object.keys(teams)} 
      choice={(comparedTeamName: string) => comparisonTeamHandler(comparedTeamName)} 
      viewType={'comparison'}/>;
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
