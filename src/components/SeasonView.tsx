import React, {useState} from 'react';
import LineChart from '../subcomponents/LineChart';
import {Season} from '../classes/EntityChildren/Season';
import styles from '../style.css';
import {ChartDataSet} from '../classes/ChartDataSet';
import {visualizeActiveButton} from '../scripts/visualizeActiveButton';
import SeasonViewPerGame from './SeasonViewSubComponents/SeasonViewPerGame';

type MyProps = {
  season : Season;
}

const SeasonView = ({season}: MyProps) => {
  const defaultDataSetsShown : number = 3;
  const [cumulativeView, setCumulativeView] = useState(false);
  let totalMaxPoints = 0;

  function isDataSetHidden(currentCount: number, defaultDataSetsShown: number): boolean {
    if (currentCount > defaultDataSetsShown) {
      return true;
    }
    return false;
  }

  function calculateIncrementalPoints(teamName: string, isHidden: boolean): ChartDataSet {
    const dataColor : string = season.teams[teamName].color;
    const incrementalPoints : number[] = [];
    const teamPoints: string[] = season.teams[teamName].results[season.name];
    for (let i = 0; i < teamPoints.length; i++) {
      if (i === 0) {
        incrementalPoints.push(parseFloat(teamPoints[i]));
      } else {
        const incrementedValue = parseFloat(teamPoints[i]) + incrementalPoints[i - 1];
        incrementalPoints.push(incrementedValue);
      }
    }
    const currentMaxPoints = incrementalPoints[incrementalPoints.length - 1];

    if (currentMaxPoints > totalMaxPoints) {
      totalMaxPoints = currentMaxPoints;
    }

    const label = `${teamName}`;
    const chartDataSet = new ChartDataSet(isHidden, label, incrementalPoints, dataColor, dataColor, 1.5, 0.5);
    return chartDataSet;
  }

  function generateLabels(): string[] {
    const labels : string[] = [];
    for (let i = 1; i <= season.totalGames; i++) {
      labels.push(`Game #${i}`);
    }
    return labels;
  }

  function generateDataSetsWithIncrementalPoints(): ChartDataSet[] {
    let dataSetCount : number = 0;
    let isHidden : boolean = false;
    const dataSets : ChartDataSet[] = [];
    for (const teamName of season.ranking) {
      dataSetCount++;
      isHidden = isDataSetHidden(dataSetCount, defaultDataSetsShown);
      const chartDataSet = calculateIncrementalPoints(teamName, isHidden);
      dataSets.push(chartDataSet);
    }
    return dataSets;
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
              ? <SeasonViewPerGame season={season}/>

              : <LineChart titleContent={`Incremental points ${season.name}`} dataSets={generateDataSetsWithIncrementalPoints()} labels={generateLabels()} maxValue={totalMaxPoints + 10}/>
            }
            {

            }
        </div>
  );
};

export default SeasonView;
