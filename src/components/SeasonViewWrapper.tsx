import React, {useEffect, useState, Dispatch} from 'react';
import MenuBar from './MenuBar';
import SeasonView from './SeasonView';
import styles from '../style.css';
import {Season} from '../classes/EntityChildren/Season';

type MyProps = {
  seasons : {[seasonName: string]: Season};
  fadeOut: string;
  categorySelectionStyle: any;
}

function SeasonViewWrapper({seasons, fadeOut, categorySelectionStyle} : MyProps) {
  const [activeSeason, setActiveSeason] = useState<Season | null>(null);
  //const [categorySelectionStyle, setCategorySelectionStyle] : [any, Dispatch<any>] = useState(styles['category-selection'])
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

  // Siit edasi: tõsta see ka App komponenti
  function collapseMenuBar(setterFunctionName:Function) {
    const width = window.innerWidth;
    if (width < 500) {
      setterFunctionName(styles['category-selection-collapsed']);
    }
  }

  return (
    <div id={styles[fadeOut]} className={styles['view-wrapper']}>
      <div className={categorySelectionStyle}>
        <MenuBar viewType={'season'} category={Object.keys(seasons)} choice={(chosenSeason: string) => { chooseSeason(chosenSeason); }} collapseFunction ={() => {console.log('boo')}} />
      </div>
      <div className={styles['chart-view']}>
        {seasonView}
        </div>
    </div>
  );
}

export default SeasonViewWrapper;
