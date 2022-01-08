import React from 'react';
import renderer from 'react-test-renderer';
import SeasonViewWrapper from '../components/SeasonViewWrapper';
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

const testSeasons = {
    "SeasonNumber": testSeason
}

it('renders correctly', () => {

    const tree = renderer
         .create(<SeasonViewWrapper seasons={testSeasons} teams={testTeams}/>)
         .toJSON();
       expect(tree).toMatchSnapshot(); 
    });
