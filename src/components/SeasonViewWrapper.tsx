import React from 'react';
import MenuBar from './MenuBar';
import SeasonView from './SeasonView';
import styles from '../style.css';
import {Season} from '../classes/EntityChildren/Season';

type MyProps = {
  seasons : {[seasonName: string]: Season};
  fadeOut: string;
  collapseMenuBarFunction: Function;
  chooseSeasonFunction: Function;

  // Todo: it seems SeasonViewWrapper and TeamViewWrapper can be merged into a single component with the only difference
  // that activeEntry becomes   activeEntry: Season | Team | null and conditional rendering is expanded
  activeEntry: Season | null;
}

function SeasonViewWrapper({
  seasons,
  fadeOut,
  collapseMenuBarFunction,
  chooseSeasonFunction,
  activeEntry
} : MyProps) {
  let seasonView;
  if (activeEntry != null) {
    seasonView = <SeasonView season={activeEntry} />;
  }

  return (
    <div id={styles[fadeOut]} >
      <div className={styles['category-selection']}>
        <MenuBar viewType={'season'} category={Object.keys(seasons)} choice={(chosenSeason: string) => { chooseSeasonFunction(chosenSeason, seasons); }} collapseFunction ={() => { collapseMenuBarFunction(); }} />
      </div>
      <div className={styles['chart-view']}>
        {seasonView}
        </div>
    </div>
  );
}

export default SeasonViewWrapper;
