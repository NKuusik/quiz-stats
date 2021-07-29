import React, {useState} from 'react';
import LineChart from '../subcomponents/LineChart';

function SeasonView(props) {
    function calculateLabels() {
        labels = [];
        for (let i = 1; i < longestSeason.length; i++) {
            labels.push(`Game #${i}`);
        }
        return labels;
    }
    return (
        <div>
            <p>I am a SeasonView</p>
            <p>This is season {props.season.name}</p>
{/* //Todo: seasonil peab olema kas kogu tiimi info või teams propsidena alla.
          <LineChart data={props.season} dataSetName={"teams"} labels={}/> */} 
        </div>
    )
}

export default SeasonView;