import React, {useEffect, useState, Dispatch} from 'react';
import MenuBar from './MenuBar';
import SeasonView from './SeasonView';
import styles from '../style.css';
import {Season} from '../classes/EntityChildren/Season';

type MyProps = {
  seasons : {[seasonName: string]: Season};
  fadeOut: string;
  categorySelectionStyle: any;
  collapseMenuBarFunction: Function;
}

function SeasonViewWrapper({seasons, fadeOut, categorySelectionStyle, collapseMenuBarFunction} : MyProps) {
  const [activeSeason, setActiveSeason] = useState<Season | null>(null);
  function chooseSeason(seasonName: string) {
    if (activeSeason === seasons[seasonName]) {
      setActiveSeason(null);
    } else {
      setActiveSeason(seasons[seasonName]);
    }
  }
  let seasonView;
  if (activeSeason != null) {
    seasonView = <SeasonView season={activeSeason} />;
  }

  return (
    <div id={styles[fadeOut]} className={categorySelectionStyle}>
      <div className={styles['category-selection']}>
        <MenuBar viewType={'season'} category={Object.keys(seasons)} choice={(chosenSeason: string) => { chooseSeason(chosenSeason); }} collapseFunction ={() => {collapseMenuBarFunction()}} />
      </div>
      <div className={styles['chart-view']}>
        {seasonView}
        </div>
    </div>
  );
}

export default SeasonViewWrapper;
