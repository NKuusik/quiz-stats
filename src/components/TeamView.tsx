import React, { useState } from 'react';
import LineChart from '../subcomponents/LineChart';
import styles from '../style.css';
import { Team } from '../classes/Team';
import { ChartDataSet } from '../classes/ChartDataSet';

type MyProps = {
  team: Team;
  seasonNames: string[]
}

const TeamView = ({ team, seasonNames }: MyProps) => {
  const defaultDataSetsShown : number = 3
  const [cumulativeView, setCumulativeView] = useState(false);

  function generateLabelsSeason(seasonsAsObject: Object): string[] { 
    let longestSeason = [];
    for (const seasonKey in seasonsAsObject) {
      if (seasonsAsObject[seasonKey].length > longestSeason.length) { // Todo: parem kui saaks kasutada Season.total_games-i
        longestSeason = seasonsAsObject[seasonKey];
      }
    }
    const labels : string[] = [];
    for (let i = 1; i < longestSeason.length; i++) {
      labels.push(`Game #${i}`);
    }
    return labels;
  }

  function generateLabelsCumulative(): string[] {
    const labels : string[] = [];
    for (const season of seasonNames) {
      labels.push(season);
    }
    labels.sort();
    return labels;
  }

  function generateDataSetsSeason(): ChartDataSet[] {
    const arrayWithSeasonPoints : ChartDataSet[] = [];
    let count : number = 0;
    let isHidden : boolean = false;
    for (const season of Object.keys(team.seasons)) {
      count++;
      if (count > defaultDataSetsShown) {
        isHidden = true;
      }
      let dataColor : string = '#' + Math.floor(Math.random()*16777215).toString(16);
      const label = `# of points in ${season}`;
      const chartDataSet = new ChartDataSet(isHidden, label, team.seasons[season], dataColor, dataColor, 1.5, 0.5);
      arrayWithSeasonPoints.push(chartDataSet);
    }
    return arrayWithSeasonPoints;
  }

  function generateTotalPointsArray(labels: string[]): number[] {
    const totalPointsAllSeasons : number[] = [];
    for (const seasonName of labels) {
      let sum: number = 0;
      if (team.seasons[seasonName] !== undefined) {
        const pointsAsNumbers = team.seasons[seasonName].map(Number);
        sum = pointsAsNumbers.reduce((a: number, b: number) => a + b, 0);
      }
      totalPointsAllSeasons.push(sum);
    }
    return totalPointsAllSeasons;
  }

  const cumulativeLabels: string[] = generateLabelsCumulative();
  const totalPoints: number[] = generateTotalPointsArray(cumulativeLabels);

  function generateDataSetsCumualtive(): ChartDataSet[] { // Todo: convert to TS. // Todo: võiks saada siin ja mujal võrrelda erinevaid tiime.
    let dataColor : string = '#' + Math.floor(Math.random()*16777215).toString(16);
    let label = `Cumulative points for ${team.name}.`;
    const chartDataSet = new ChartDataSet(false, label, totalPoints, dataColor, dataColor, 1.5, 0.5);
    return [chartDataSet];
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
