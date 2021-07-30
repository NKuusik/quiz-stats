import React from 'react';
import LineChart from '../subcomponents/LineChart';


function TeamView(props) {

    function calculateLabels(seasonsAsObject) {
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

      function generateDataSetsWithSeasonPoints() {
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
    return (
        <div>
            <h1>Stats for team {props.team.name}</h1>
            <h2 onClick={() => props.chooseTeam(null)}>Go Back</h2>
            <h2>Their total score was {props.team.totalScore}</h2>
            <LineChart titleContent={`Season points for ${props.team.name}`} dataSets={generateDataSetsWithSeasonPoints()} labels={calculateLabels(props.team)} />
        </div>
    );
}


export default TeamView;