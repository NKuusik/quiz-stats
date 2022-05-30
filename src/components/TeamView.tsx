import React from 'react';
import LineChart from '../subcomponents/LineChart';
import styles from '../style.css';
import { Team } from '../scripts/readData';

type MyProps = {
  team: Team
}

const TeamView = ({ team }: MyProps) => {
  const borderColor : string = '#AF79E7';
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

  function generateLabelsCumulative () {
    const labels : string[] = [];
    for (const season of Object.keys(team.seasons)) {
      const labelName = season;
      labels.push(labelName);
    }
    labels.sort();
    return labels;
  }

  function generateDataSetsSeason() {
    const arrayWithSeasonPoints : Array<Object> = []; // Eraldi Type?
    for (const season of Object.keys(team.seasons)) {
      const singleDataSet : Object = {
        label: `# of points in ${season}`,
        data: team.seasons[season],
        backgroundColor: borderColor,
        borderColor: borderColor,
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
      const pointsAsNumbers = team.seasons[seasonName].map(Number);
      const sum = pointsAsNumbers.reduce((a, b) => a + b, 0);
      totalPointsAllSeasons.push(sum);
    }
    return totalPointsAllSeasons;
  }

  const cumulativeLabels = generateLabelsCumulative();
  const totalPoints = generateTotalPointsArray(cumulativeLabels);

  function generateDataSetsCumualtive() { // Todo: convert to TS.
    const singleDataSet = {
      label: `Cumulative points for ${team.name}.`,
      data: totalPoints,
      backgroundColor: borderColor,
      borderColor: borderColor,
      borderWidth: 1.5,
      tension: 0.5
    };
    return [singleDataSet];
  }

  return (
        <div className={styles['team-view']}>
            <h1>Stats for team {team.name}</h1>
            <LineChart maxValue={10} titleContent={'Game-by-game points per season'} dataSets={generateDataSetsSeason()} labels={generateLabelsSeason(team.seasons)} />
            <LineChart maxValue={Math.max.apply(null, totalPoints) + 10} titleContent={'Cumulative points accross seasons'} dataSets={generateDataSetsCumualtive()} labels={cumulativeLabels} />
        </div>
  );
};

export default TeamView;
