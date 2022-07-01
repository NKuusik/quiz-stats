import React, {useState} from 'react';
import LineChart from '../subcomponents/LineChart';
import { Season } from '../classes/Season';
import styles from '../style.css';
import { ChartDataSet } from '../classes/ChartDataSet';

//Todo: liiga palju korduvat koodi: äkki parem üks generic View komponent?
type MyProps = {
  season : Season;
}

const SeasonView = ({ season }: MyProps) => {
  const defaultDataSetsShown : number = 3
  const [cumulativeView, setCumulativeView] = useState(false);

  function isDataSetHidden(currentCount: number, defaultDataSetsShown: number): boolean {
    if (currentCount > defaultDataSetsShown) {
      return true;
    }
    return false;
  }

  function calculateIncrementalPoints(teamName: string, isHidden: boolean): ChartDataSet {
    let dataColor : string = '#' + Math.floor(Math.random()*16777215).toString(16); // Todo: at least in SeasonView, the colors on two charts should match
    const incrementalPoints : number[] = [];
    const teamPoints: string[] = season.teams[teamName].seasons[season.name];
    for (let i = 0; i < teamPoints.length; i++) {
      if (i === 0) {
        incrementalPoints.push(parseInt(teamPoints[i]));
      } else {
        const incrementedValue = parseInt(teamPoints[i]) + incrementalPoints[i - 1];
        incrementalPoints.push(incrementedValue);
      }
    }
    const label = `${teamName}`;
    const chartDataSet = new ChartDataSet(isHidden, label, incrementalPoints, dataColor, dataColor, 1.5, 0.5);
    return chartDataSet;

  }

  function generateLabels(): string[] {
    const labels : string[] = [];
    for (let i = 1; i < season.total_games; i++) {
      labels.push(`Game #${i}`);
    }
    return labels;
  }

  function generateDataSetsWithRunningPoints(): ChartDataSet[] {
    const dataSetsWithRunningPoints : ChartDataSet[] = [];
    let dataSetCount : number = 0;
    let isHidden : boolean = false;
    for (const teamName of season.ranking) {
      dataSetCount++;
      isHidden = isDataSetHidden(dataSetCount, defaultDataSetsShown);
      let dataColor : string = '#' + Math.floor(Math.random()*16777215).toString(16);
      const teamPoints: number[] = season.teams[teamName].seasons[season.name];
      const label = `${teamName}`
      const chartDataSet = new ChartDataSet(isHidden, label, teamPoints, dataColor, dataColor, 1.5, 0.5);
      dataSetsWithRunningPoints.push(chartDataSet);
    }
    return dataSetsWithRunningPoints;
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
            <button className={styles['button-chart-type']} onClick={() => setCumulativeView(false)}>
              See game-by-game
            </button>
            <button className={styles['button-chart-type']} onClick={() => setCumulativeView(true)}>
              See incrementally
            </button>

            {
            !cumulativeView 
            ? <LineChart titleContent={`Game-by-game points for ${season.name}`} dataSets={generateDataSetsWithRunningPoints()} labels={generateLabels()} maxValue={10}/>

            : <LineChart titleContent={`Incremental points ${season.name}`} dataSets={generateDataSetsWithIncrementalPoints()} labels={generateLabels()} maxValue={350}/>

            }  
            {
              /* Todo: change maxValue dynamic in incremental points chart to correlate with the highest value of points.. */
            }
        </div>
  );
};

export default SeasonView;
