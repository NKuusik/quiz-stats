import React from 'react';
import renderer from 'react-test-renderer';
import SeasonViewWrapper from '../components/SeasonViewWrapper';
import { Team } from '../classes/Team';
import { Season } from '../classes/Season';

const testTeam = new Team(1, "Fake team", [1, 2], 3);
testTeam.seasons["SeasonNumber"] = [3, 4]

let testTeams = {
  "Fake team": testTeam
};

const testSeason = new Season("Test Season", {testTeams}, 0, []);

const testSeasons = {
    "Test Season": testSeason
}

it('renders correctly', () => {

    const tree = renderer
         .create(<SeasonViewWrapper seasons={testSeasons} teams={testTeams}/>)
         .toJSON();
       expect(tree).toMatchSnapshot(); 
    });
