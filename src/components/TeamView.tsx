import React, { useState } from 'react';
import LineChart from '../subcomponents/LineChart';
import styles from '../style.css';
import { Team } from '../data_structures/Team';

type MyProps = {
  team: Team;
  seasonNames: Array<string>
}

const TeamView = ({ team, seasonNames }: MyProps) => {
  const defaultDataSetsShown : number = 3
  const [cumulativeView, setCumulativeView] = useState(false);
  function generateLabelsSeason (seasonsAsObject) {
    let longestSeason = [];
    for (const seasonKey in seasonsAsObject) {
      if (seasonsAsObject[seasonKey].length > longestSeason.length) {
        longestSeason = seasonsAsObject[seasonKey];
      }
    }
    const labels : string[] = [];
    for (let i = 1; i < longestSeason.length; i++) {
      labels.push(`Game #${i}`);
    }
    return labels;
  }

  function generateLabelsCumulative() {
    const labels : string[] = [];
    for (const season of seasonNames) {
      const labelName = season;
      labels.push(labelName);
    }
    labels.sort();
    console.log(labels);
    return labels;
  }

  function generateDataSetsSeason() {
    const arrayWithSeasonPoints : Array<Object> = []; // Eraldi Type?
    let count : number = 0;
    let defaultHide : boolean = false;
    for (const season of Object.keys(team.seasons)) {
      count++;
      if (count > defaultDataSetsShown) {
        defaultHide = true;
      }
      let dataColor : string = '#' + Math.floor(Math.random()*16777215).toString(16);
      const singleDataSet : Object = {
        hidden: defaultHide,
        label: `# of points in ${season}`,
        data: team.seasons[season],
        backgroundColor: dataColor,
        borderColor: dataColor,
        borderWidth: 1.5,
        tension: 0.5
      };
      arrayWithSeasonPoints.push(singleDataSet);
    }
    return arrayWithSeasonPoints;
  }

  function generateTotalPointsArray(labels) {
    const totalPointsAllSeasons : Array<number> = [];
    for (const seasonName of labels) {
      let sum = 0;
      if (team.seasons[seasonName] !== undefined) {
        const pointsAsNumbers = team.seasons[seasonName].map(Number);
        sum = pointsAsNumbers.reduce((a, b) => a + b, 0);
      }
      totalPointsAllSeasons.push(sum);
    }
    return totalPointsAllSeasons;
  }

  const cumulativeLabels = generateLabelsCumulative();
  const totalPoints = generateTotalPointsArray(cumulativeLabels);

  function generateDataSetsCumualtive() { // Todo: convert to TS. // Todo: võiks saada siin ja mujal võrrelda erinevaid tiime.
    let dataColor : string = '#' + Math.floor(Math.random()*16777215).toString(16);
    const singleDataSet = {
      label: `Cumulative points for ${team.name}.`,
      data: totalPoints,
      backgroundColor: dataColor,
      borderColor: dataColor,
      borderWidth: 1.5,
      tension: 0.5
    };
    return [singleDataSet];
  }

  return (
        <div className={styles['team-view']}>
            <h1>Stats for team {team.name}</h1>
            <button className={styles['button-chart-type']} onClick={() => setCumulativeView(false)}>
              See points per season
            </button>
            <button className={styles['button-chart-type']} onClick={() => setCumulativeView(true)}>
              See points across seasons
            </button>
            
            {
            !cumulativeView 
            ? <LineChart maxValue={10} titleContent={'Game-by-game points per season'} dataSets={generateDataSetsSeason()} labels={generateLabelsSeason(team.seasons)} />
            : <LineChart maxValue={Math.max.apply(null, totalPoints) + 10} titleContent={'Cumulative points across seasons'} dataSets={generateDataSetsCumualtive()} labels={cumulativeLabels} />
            }            
        </div>
  );
};

export default TeamView;
