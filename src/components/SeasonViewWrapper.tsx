import React, {useState} from 'react';
import MenuBar from './MenuBar';
import SeasonView from './SeasonView';
import styles from '../style.css';
import {Season} from '../classes/Season';

type MyProps = {
  seasons : {[seasonName: string]: Season};
  fadeOut: string;
}

function SeasonViewWrapper({seasons, fadeOut: classNameProp} : MyProps) {
  const [activeSeason, setActiveSeason] = useState<Season | null>(null);

  function chooseSeason(chosenSeason: Season) {
    if (activeSeason === chosenSeason) {
      setActiveSeason(null);
    } else {
      setActiveSeason(chosenSeason);
    }
  }
  let seasonView;
  if (activeSeason != null) {
    seasonView = <SeasonView season={activeSeason} />;
  }

  return (
    <div id={styles[classNameProp]} className={styles['view-wrapper']}>
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
