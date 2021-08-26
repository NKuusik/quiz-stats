import React from 'react';
import LineChart from '../subcomponents/LineChart';
import styles from '../style.css';

function SeasonView (props) {
  function calculateLabels () {
    const labels = [];
    for (let i = 1; i < props.teams[props.season.teams[0]].seasons[props.season.name].length; i++) {
      labels.push(`Game #${i}`);
    }
    return labels;
  }

  function generateDataSetsWithRunningPoints () {
    const dataSetsWithRunningPoints = [];
    for (const teamName of Object.values(props.season.teams)) {
      const singleDataSet = {
        label: `${teamName}`,
        data: props.teams[teamName].seasons[props.season.name],
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(0, 10, 12)',
        borderWidth: 1.5,
        tension: 0.5
      };
      dataSetsWithRunningPoints.push(singleDataSet);
    }
    return dataSetsWithRunningPoints;
  }

  function generateDataSetsWithIncrementalPoints () {
    const dataSets = [];
    for (const teamName of Object.values(props.season.teams)) {
      const incrementalPoints = [];
      for (let i = 0; i < props.teams[teamName].seasons[props.season.name].length; i++) {
        if (i === 0) {
          incrementalPoints.push(parseInt(props.teams[teamName].seasons[props.season.name][i]));
        } else {
          const incrementedValue = parseInt(props.teams[teamName].seasons[props.season.name][i]) + incrementalPoints[i - 1];
          incrementalPoints.push(incrementedValue);
        }
      }
      const singleDataSet = {
        label: `${teamName}`,
        data: incrementalPoints,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(0, 10, 12)',
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
            <h2 className={styles['back-button']} onClick={() => props.chooseSeason(null)}>Go Back</h2>
            <LineChart titleContent={`Game-by-game points for ${props.season.name}`} dataSets={generateDataSetsWithRunningPoints()} labels={calculateLabels()}/>
            <LineChart titleContent={`Incremental points ${props.season.name}`} dataSets={generateDataSetsWithIncrementalPoints()} labels={calculateLabels()}/>
        </div>
  );
}

export default SeasonView;
