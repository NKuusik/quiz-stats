import React from 'react';
import renderer from 'react-test-renderer';
import TeamView from '../components/TeamView';
import { Team } from '../classes/Team';

const testTeam = new Team(1, "Fake team", [1, 2, 4], 3);
testTeam.seasons["SeasonNumber"] = ["3", "4", "2"];

it('renders correctly', () => {
    const tree = renderer
         .create(<TeamView seasonNames={["SeasonNumber"]} team={testTeam}/>)
         .toJSON();
       expect(tree).toMatchSnapshot(); 
     });
