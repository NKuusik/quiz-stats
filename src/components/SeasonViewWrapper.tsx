import React, { useState } from 'react';
import MenuBar from './MenuBar';
import SeasonView from './SeasonView';
import styles from '../style.css';

function SeasonViewWrapper (props) {
  const [activeSeason, setActiveSeason] = useState(null);

  function chooseSeason (chosenSeason) {
    setActiveSeason(chosenSeason);
  }
  let seasonView;
  if (activeSeason != null) {
    seasonView = <SeasonView season={activeSeason} teams={props.teams} chooseSeason={(chosenSeason) => { chooseSeason(chosenSeason); }}/>
  }
  
  return (
    <div className={styles['view-wrapper']}>
      <div className={styles['category-selection']}>
        <MenuBar category={props.seasons} choice={(chosenSeason) => { chooseSeason(chosenSeason); }} />
      </div>
      <div className={styles['chart-view']}>
        {seasonView}
        </div>
    </div>
  );
}

export default SeasonViewWrapper;
