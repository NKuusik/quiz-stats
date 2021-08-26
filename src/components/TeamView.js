import React from 'react';
import LineChart from '../subcomponents/LineChart';
import styles from '../style.css';

function TeamView (props) {
  const cumulativeLabels = generateLabelsCumulative();
  const totalPoints = generateTotalPointsArray(cumulativeLabels);

  function generateLabelsSeason (seasonsAsObject) {
    let longestSeason = null;
    for (const seasonKey in seasonsAsObject) {
      if (longestSeason == null || seasonsAsObject[seasonKey].length > longestSeason.length) {
        longestSeason = seasonsAsObject[seasonKey];
      }
    }
    const labels = [];
    for (let i = 1; i < longestSeason.length; i++) {
      labels.push(`Game #${i}`);
    }
    return labels;
  }

  function generateLabelsCumulative () {
    const labels = [];
    for (const season of Object.keys(props.team.seasons)) {
      const labelName = season;
      labels.push(labelName);
    }
    labels.sort();
    return labels;
  }

  function generateDataSetsSeason () {
    const arrayWithSeasonPoints = [];
    for (const season of Object.keys(props.team.seasons)) {
      const singleDataSet = {
        label: `# of points in ${season}`,
        data: props.team.seasons[season],
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(0, 10, 12)',
        borderWidth: 1.5,
        tension: 0.5
      };
      arrayWithSeasonPoints.push(singleDataSet);
    }
    return arrayWithSeasonPoints;
  }

  function generateTotalPointsArray (labels) {
    const totalPointsAllSeasons = [];
    console.log(labels);
    for (const seasonName of labels) {
      const pointsAsNumbers = props.team.seasons[seasonName].map(Number);
      const sum = pointsAsNumbers.reduce((a, b) => a + b, 0);
      totalPointsAllSeasons.push(sum);
    }
    return totalPointsAllSeasons;
  }

  function generateDataSetsCumualtive () {
    const singleDataSet = {
      label: `Cumulative points for ${props.team.name}.`,
      data: totalPoints,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(0, 10, 12)',
      borderWidth: 1.5,
      tension: 0.5
    };
    return [singleDataSet];
  }

  return (

        <div>
            <h1>Stats for team {props.team.name}</h1>
            <h2 className={styles['back-button']} onClick={() => props.chooseTeam(null)}>Go Back</h2>
            <LineChart maxValue={10} titleContent={'Game-by-game points per season'} dataSets={generateDataSetsSeason()} labels={generateLabelsSeason(props.team.seasons)} />
            <LineChart maxValue={Math.max.apply(null, totalPoints) + 10} titleContent={'Cumulative points accross seasons'} dataSets={generateDataSetsCumualtive()} labels={cumulativeLabels} />
        </div>
  );
}

export default TeamView;
