import React, {useState} from 'react';
import CategoryView from './CategoryView';
import SeasonView from './SeasonView';

function SeasonViewWrapper(props) {
    const [activeSeason, setActiveSeason] = useState(null);
    
    function chooseSeason(chosenSeason) {
        setActiveSeason(chosenSeason);

    }
    if (activeSeason == null) {
        return (
            <div>
                <div>
                Select which season you want to check.
                </div>
                <CategoryView category={props.seasons} choice={(chosenSeason) => {chooseSeason(chosenSeason);}} />
                </div>
        );
    } else {
        return (
            <div>
                <SeasonView season={activeSeason} teams={props.teams} chooseSeason={(chosenSeason) => {chooseSeason(chosenSeason);}}/>
            </div>
        )
    }
    
}

export default SeasonViewWrapper;