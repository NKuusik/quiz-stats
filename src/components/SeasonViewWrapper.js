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
                <h1>
                Select which season you want to check.
                </h1>
                <CategoryView category={props.seasons} choice={(chosenSeason) => {chooseSeason(chosenSeason);}} />
                </div>
        );
    } else {
        return (
            <div>
                <SeasonView season={activeSeason} teams={props.teams}/>
            </div>
        )
    }
    
}

export default SeasonViewWrapper;