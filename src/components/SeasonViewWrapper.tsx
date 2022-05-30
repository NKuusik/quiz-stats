import React, { useState } from 'react';
import MenuBar from './MenuBar';
import SeasonView from './SeasonView';
import styles from '../style.css';
import {Team} from '../scripts/readData';

type MyProps = {
  teams : {[teamName: string]: Team};
  seasons : {[seasonName: string]: {name: string, teams: string[]}};
}

function SeasonViewWrapper ({ teams, seasons } : MyProps) {
  const defaultState = {name: "", teams: []} // Motle, kas on parem variant.
  const [activeSeason, setActiveSeason] = useState(defaultState);

  function chooseSeason (chosenSeason) {
    if (activeSeason === chosenSeason) {
      setActiveSeason(defaultState);
    } else {
      setActiveSeason(chosenSeason);
    }
  }
  let seasonView;
  if (activeSeason != defaultState) {
    seasonView = <SeasonView season={activeSeason} teams={teams} />;
  }

  return (
    <div className={styles['view-wrapper']}>
      <div className={styles['category-selection']}>
        <MenuBar viewType={'season'} category={seasons} choice={(chosenSeason) => { chooseSeason(chosenSeason); }} />
      </div>
      <div className={styles['chart-view']}>
        {seasonView}
        </div>
    </div>
  );
}

export default SeasonViewWrapper;
