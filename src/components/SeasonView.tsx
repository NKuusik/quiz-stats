import React, {useState} from 'react';
import LineChart from '../subcomponents/LineChart';
import { Team } from '../classes/Team';
import { Season } from '../classes/Season';
import styles from '../style.css';
import { ChartDataSet } from '../classes/ChartDataSet';

//Todo: liiga palju korduvat koodi: äkki parem üks generic View komponent?
type MyProps = {
  teams : {[teamName: string]: Team};
  season : Season;
}

const SeasonView = ({ teams, season }: MyProps) => {
  const defaultDataSetsShown : number = 3
  const [cumulativeView, setCumulativeView] = useState(false);

  function calculateLabels(): string[] {
    const labels : string[] = [];
    for (let i = 1; i < season.total_games; i++) {
      labels.push(`Game #${i}`);
    }
    return labels;
  }

  // Propsist saab lahti kui season.teams[teamName].seasons[season.name], aga Teams.season praegu katki. 
  function generateDataSetsWithRunningPoints(): ChartDataSet[] {
    const dataSetsWithRunningPoints : ChartDataSet[] = [];
    let count : number = 0;
    let isHidden : boolean = false;
    for (const teamName of season.ranking) {
      count++;
      if (count > defaultDataSetsShown) {
        isHidden = true;
      }
      let dataColor : string = '#' + Math.floor(Math.random()*16777215).toString(16);
      console.log(`Season prop for ${teamName}:`);
      console.log(season.teams[teamName].seasons[season.name]);
      console.log(`Team prop for ${teamName}:`);
      console.log(teams[`${teamName}`].seasons[season.name]);
      const label = `${teamName}`
      const chartDataSet = new ChartDataSet(isHidden, label, teams[`${teamName}`].seasons[season.name], dataColor, dataColor, 1.5, 0.5);
      dataSetsWithRunningPoints.push(chartDataSet);
    }
    return dataSetsWithRunningPoints;
  }

  function generateDataSetsWithIncrementalPoints(): ChartDataSet[] {
    let count : number = 0;
    let isHidden : boolean = false;
    const dataSets : ChartDataSet[] = [];
    for (const teamName of season.ranking) {
      count++;
      if (count > defaultDataSetsShown) {
        isHidden = true;
      }
      let dataColor : string = '#' + Math.floor(Math.random()*16777215).toString(16); // Todo: at least in SeasonView, the colors on two charts should match
      const incrementalPoints : number[] = [];
      for (let i = 0; i < teams[`${teamName}`].seasons[season.name].length; i++) {
        if (i === 0) {
          incrementalPoints.push(parseInt(teams[`${teamName}`].seasons[season.name][i]));
        } else {
          const incrementedValue = parseInt(teams[`${teamName}`].seasons[season.name][i]) + incrementalPoints[i - 1];
          incrementalPoints.push(incrementedValue);
        }
      }
      const label = `${teamName}`;
      const chartDataSet = new ChartDataSet(isHidden, label, incrementalPoints, dataColor, dataColor, 1.5, 0.5);
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
            ? <LineChart titleContent={`Game-by-game points for ${season.name}`} dataSets={generateDataSetsWithRunningPoints()} labels={calculateLabels()} maxValue={10}/>

            : <LineChart titleContent={`Incremental points ${season.name}`} dataSets={generateDataSetsWithIncrementalPoints()} labels={calculateLabels()} maxValue={300}/>

            }  
            {
              /* Todo: change maxValue dynamic in incremental points chart to correlate with the highest value of points.. */
            }
        </div>
  );
};

export default SeasonView;
