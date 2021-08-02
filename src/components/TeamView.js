import React from 'react';
import LineChart from '../subcomponents/LineChart';


function TeamView(props) {

    function generateLabelsSeason(seasonsAsObject) {
        let longestSeason = null;
        for (let seasonKey in seasonsAsObject) {
          if (longestSeason == null || seasonsAsObject[seasonKey].length > longestSeason.length) {
            longestSeason = seasonsAsObject[seasonKey];
          }
        }
        let labels = []
        for (let i = 1; i < longestSeason.length; i++) {
            labels.push(`Game #${i}`);
        }
        return labels;
      }

      function generateLabelsCumulative() {
        let labels = []
        for (let season of Object.keys(props.team.seasons)) {
          let labelName = `Season ${season}`;
          labels.push(labelName);
        }
        return labels;
      }

      function generateDataSetsSeason() {
        let arrayWithSeasonPoints = [];
        for (let season of Object.keys(props.team.seasons)) {
          let singleDataSet = {
            label: `# of points in ${season}`,
            data: props.team.seasons[season],
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(0, 10, 12)',
            borderWidth: 1.5,
            tension: 0.5
          }
          arrayWithSeasonPoints.push(singleDataSet);
        }
        return arrayWithSeasonPoints;
      }

      function generateTotalPointsArray() {
        let totalPointsAllSeasons = [];
        for (let season of Object.values(props.team.seasons)) {
          let pointsAsNumbers = season.map(Number);
          let sum = pointsAsNumbers.reduce((a, b) => a + b, 0);

          totalPointsAllSeasons.push(sum);
        }
        return totalPointsAllSeasons;
      }

      let totalPoints = generateTotalPointsArray();

      function generateDataSetsCumualtive() {
        let singleDataSet = {
          label: `Cumulative points for ${props.team.name}.`,
          data: totalPoints,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(0, 10, 12)',
          borderWidth: 1.5,
          tension: 0.5
        }
        return [singleDataSet];
      }

    return (

        <div>
            <h1>Stats for team {props.team.name}</h1>
            <LineChart maxValue={10} titleContent={`Game-by-game points per season`} dataSets={generateDataSetsSeason()} labels={generateLabelsSeason(props.team.seasons)} />
            <LineChart maxValue={Math.max.apply(null, totalPoints) + 10} titleContent={`Cumulative points accross seasons`} dataSets={generateDataSetsCumualtive()} labels={generateLabelsCumulative()} />
        </div>
    );
}

export default TeamView;