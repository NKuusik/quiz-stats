import React, { useState } from 'react';
import MenuBar from './MenuBar';
import SeasonView from './SeasonView';
import styles from '../style.css';
import { Team }  from '../classes/Team';
import { Season } from '../classes/Season';

type MyProps = {
  seasons : {[seasonName: string]: Season};
}

function SeasonViewWrapper ({ seasons } : MyProps) {
  const defaultState = new Season("", "", 0, []) // Motle, kas on parem variant. = muuda vajadusel klasside struktuure
  const [activeSeason, setActiveSeason] = useState(defaultState);

  function chooseSeason(chosenSeason: Season) {
    if (activeSeason === chosenSeason) {
      setActiveSeason(defaultState);
    } else {
      setActiveSeason(chosenSeason);
    }
  }
  let seasonView;
  if (activeSeason != defaultState) {
    seasonView = <SeasonView season={activeSeason} />;
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
