import React from 'react';
import LineChart from '../subcomponents/LineChart';

type MyProps = {
  teams : any,
  season : any,
}

const SeasonView = ({ teams, season }: MyProps) => {
  function calculateLabels () {
    const labels : string[] = [];
    for (let i = 1; i < teams[season.teams[0]].seasons[season.name].length; i++) {
      labels.push(`Game #${i}`);
    }
    return labels;
  }

  function generateDataSetsWithRunningPoints () {
    const dataSetsWithRunningPoints : Object[] = [];
    for (const teamName of Object.values(season.teams)) {
      const singleDataSet : Object = {
        label: `${teamName}`,
        data: teams[`${teamName}`].seasons[season.name],
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
    const dataSets : Object[] = [];
    for (const teamName of Object.values(season.teams)) {
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
            <LineChart titleContent={`Game-by-game points for ${season.name}`} dataSets={generateDataSetsWithRunningPoints()} labels={calculateLabels()} maxValue={10}/>
            {
              /*Todo: change maxValue dynamic in incremental points chart to correlate with the highest value of points.. */
            }
            <LineChart titleContent={`Incremental points ${season.name}`} dataSets={generateDataSetsWithIncrementalPoints()} labels={calculateLabels()} maxValue={300}/>
        </div>
  );
};

export default SeasonView;
