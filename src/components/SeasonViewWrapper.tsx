import React, {useEffect, useState, Dispatch} from 'react';
import MenuBar from './MenuBar';
import SeasonView from './SeasonView';
import styles from '../style.css';
import {Season} from '../classes/EntityChildren/Season';

type MyProps = {
  seasons : {[seasonName: string]: Season};
  fadeOut: string;
}

function SeasonViewWrapper({seasons, fadeOut} : MyProps) {
  const [activeSeason, setActiveSeason] = useState<Season | null>(null);
  const [categorySelectionStyle, setCategorySelectionStyle] : [any, Dispatch<any>] = useState(styles['category-selection'])
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

  // Siit edasi: funktsiooni kasutatakse MenuBar-is ja peab muutma stiili väärtust selles klassis
  // Kui see toimib, tõsta see veel samm kõrgemale
  function collapseMenuBar() {
    const width = window.innerWidth;
    if (width < 500) {
      setCategorySelectionStyle(styles['menu-bar-container-collapsed']);
    }
  }
  useEffect(() => {
    extendMenuBar();
  }, []);

  window.addEventListener('resize', () => {
    extendMenuBar();
  });


  function extendMenuBar() {
    const width = window.innerWidth;
    if (width < 500) {
      setCategorySelectionStyle(styles['menu-bar-container-extended']);
    } else {
      setCategorySelectionStyle(styles['category-selection']);
    }
  }

  return (
    <div id={styles[fadeOut]} className={styles['view-wrapper']}>
      <div className={categorySelectionStyle}>
        <MenuBar viewType={'season'} category={Object.keys(seasons)} choice={(chosenSeason: string) => { chooseSeason(chosenSeason); }} collapseFunction ={() => {collapseMenuBar()}} />
      </div>
      <div className={styles['chart-view']}>
        {seasonView}
        </div>
    </div>
  );
}

export default SeasonViewWrapper;
