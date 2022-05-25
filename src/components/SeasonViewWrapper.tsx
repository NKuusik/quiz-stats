import React, { useState } from 'react';
import MenuBar from './MenuBar';
import SeasonView from './SeasonView';
import styles from '../style.css';

type MyProps = {
  teams : Object,
  seasons : Object,
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
        <MenuBar category={seasons} choice={(chosenSeason) => { chooseSeason(chosenSeason); }} />
      </div>
      <div className={styles['chart-view']}>
        {seasonView}
        </div>
    </div>
  );
}

export default SeasonViewWrapper;
