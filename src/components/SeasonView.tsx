import React, {useState} from 'react';
import LineChart from '../subcomponents/LineChart';
import { Team } from '../data_structures/Team';
import styles from '../style.css';

//Todo: liiga palju korduvat koodi: äkki parem üks generic View komponent?
type MyProps = {
  teams : {[teamName: string]: Team};
  season : {name: string, teams: string[]};
}

const SeasonView = ({ teams, season }: MyProps) => {
  const defaultDataSetsShown : number = 3
  const [cumulativeView, setCumulativeView] = useState(false);
  function calculateLabels () {
    const labels : string[] = [];
    for (let i = 1; i < teams[season.teams[0]].seasons[season.name].length; i++) {
      labels.push(`Game #${i}`);
    }
    return labels;
  }

  function generateDataSetsWithRunningPoints () {
    const dataSetsWithRunningPoints : Object[] = [];
    let count : number = 0;
    let defaultHide : boolean = false;
    for (const teamName of Object.values(season.teams)) {
      count++;
      if (count > defaultDataSetsShown) {
        defaultHide = true;
      }
      let dataColor : string = '#' + Math.floor(Math.random()*16777215).toString(16);
      const singleDataSet : Object = {
        hidden: defaultHide,
        label: `${teamName}`,
        data: teams[`${teamName}`].seasons[season.name],
        backgroundColor: dataColor,
        borderColor: dataColor,
        borderWidth: 1.5,
        tension: 0.5
      };
      dataSetsWithRunningPoints.push(singleDataSet);
    }
    return dataSetsWithRunningPoints;
  }

  function generateDataSetsWithIncrementalPoints () {
    let count : number = 0;
    let defaultHide : boolean = false;
    const dataSets : Object[] = [];
    for (const teamName of Object.values(season.teams)) {
      count++;
      if (count > defaultDataSetsShown) {
        defaultHide = true;
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
      const singleDataSet = {
        hidden: defaultHide,
        label: `${teamName}`,
        data: incrementalPoints,
        backgroundColor: dataColor,
        borderColor: dataColor,
        borderWidth: 1.5,
        tension: 0.5
      };
      dataSets.push(singleDataSet);
    }
    return dataSets;
  }

  generateDataSetsWithIncrementalPoints();
  return (
        <div>

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
