import React, {useState} from 'react';
import {Season} from '../classes/EntityChildren/Season';
import styles from '../style.css';
import {visualizeActiveButton} from '../scripts/visualizeActiveButton';
import SeasonViewPerGame from './SeasonViewSubComponents/SeasonViewPerGame';
import SeasonViewCumulative from './SeasonViewSubComponents/SeasonViewCumulative';

type MyProps = {
  season : Season;
}

const SeasonView = ({season}: MyProps) => {
  const defaultDataSetsShown : number = 3;

  function generateLabels(): string[] {
    const labels : string[] = [];
    for (let i = 1; i <= season.totalGames; i++) {
      labels.push(`Game #${i}`);
    }
    return labels;
  }

  const labels: string[] = generateLabels();
  const [cumulativeView, setCumulativeView] = useState(false);

  function isDataSetHidden(currentCount: number, defaultDataSetsShown: number): boolean {
    if (currentCount > defaultDataSetsShown) {
      return true;
    }
    return false;
  }

  return (
        <div>
            <h1>Stats for {season.name}</h1>
            <button id={styles[visualizeActiveButton('game-by-game', cumulativeView)]} className={styles['button-chart']} onClick={() => setCumulativeView(false)}>
              See game-by-game
            </button>
            <button id={styles[visualizeActiveButton('cumulative', cumulativeView)]} className={styles['button-chart']} onClick={() => setCumulativeView(true)}>
              See incrementally
            </button>

            {
            !cumulativeView
              ? <SeasonViewPerGame season={season} defaultDataSetsShown={defaultDataSetsShown} labels={labels} isDataSetHidden={isDataSetHidden}/>

              : <SeasonViewCumulative season={season} defaultDataSetsShown={defaultDataSetsShown} labels={labels} isDataSetHidden={isDataSetHidden}/>
            }
            {

            }
        </div>
  );
};

export default SeasonView;
