import React from 'react';
import renderer from 'react-test-renderer';
import TeamView from '../components/TeamView';
import { Team } from '../classes/Team';

// Todo: State change with enzyme.

const testTeam = new Team(1, "Fake team", [1, 2, 4], 3);
testTeam.seasons["SeasonNumber"] = ["3", "4", "2"];

it('default renders correctly', () => {
    const tree = renderer
         .create(<TeamView seasonNames={["SeasonNumber"]} team={testTeam}/>)
         .toJSON();
       expect(tree).toMatchSnapshot(); 
     });


testTeam.seasons["SecondSeason"] = ["3", "4", "2"];
testTeam.seasons["ThirdSeason"] = ["3", "4", "2"];
testTeam.seasons["FourthSeason"] = ["3", "4", "2"];

it('only 3 seasons are displayed', () => {
    const tree = renderer
         .create(<TeamView seasonNames={["SeasonNumber", "SecondSeason", "ThirdSeason", "FourthSeason"]} team={testTeam}/>)
         .toJSON();
       expect(tree).toMatchSnapshot(); 
     });
