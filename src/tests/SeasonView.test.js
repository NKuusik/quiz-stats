import React from 'react';
import renderer from 'react-test-renderer';
import SeasonView from '../components/SeasonView';
import {Team} from '../scripts/readData';

const testTeam = new Team(1, "Fake team", [1, 2], 3);
testTeam.seasons["SeasonNumber"] = [3, 4]

let testTeams = {
  "Fake team": testTeam
};

const testSeason = {
    name: "SeasonNumber",
    teams: [testTeam["name"]]
}

it('renders correctly', () => {

    const tree = renderer
         .create(<SeasonView season={testSeason} teams={testTeams}/>)
         .toJSON();
       expect(tree).toMatchSnapshot(); 
    });
