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
    return (
        <div>
            <h1>Stats for team {props.team.name}</h1>
            <h2 onClick={() => props.chooseTeam(null)}>Go Back</h2>
            <h2>Their total score was {props.team.totalScore}</h2>
            <LineChart data={props.team} dataSetName={"seasons"} labels={calculateLabels(props.team)} />
        </div>
    );

}



export default TeamView;