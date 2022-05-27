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
  const [activeSeason, setActiveSeason] = useState(null);

  function chooseSeason (chosenSeason) {
    if (activeSeason === chosenSeason) {
      setActiveSeason(null);
    } else {
      setActiveSeason(chosenSeason);
    }
  }
  let seasonView;
  if (activeSeason != null) {
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
