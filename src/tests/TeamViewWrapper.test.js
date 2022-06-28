import React from 'react';
import renderer from 'react-test-renderer';
import TeamViewWrapper from '../components/TeamViewWrapper';
import {Team} from '../classes/Team';

const testTeam = new Team(1, "Fake team", [1, 2], 3);
testTeam.seasons["SeasonNumber"] = [3, 4]

let testTeams = {
  "Fake team": testTeam
};

it('renders correctly', () => {

    const tree = renderer
         .create(<TeamViewWrapper teams={testTeams}/>)
         .toJSON();
       expect(tree).toMatchSnapshot(); 
    });
