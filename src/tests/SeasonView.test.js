import React from 'react';
import renderer from 'react-test-renderer';
import SeasonView from '../components/SeasonView';
import {Team} from '../classes/Team';
import {Season} from '../classes/Season';

const testTeam = new Team(1, "Fake team", [1, 2], 3);

let testTeams = {
  "Fake team": testTeam
};
testTeam.seasons["SeasonNumber"] = [3, 4]

const testSeason = new Season("Test Season", {testTeams}, 0, []);

it('renders correctly', () => {

    const tree = renderer
         .create(<SeasonView season={testSeason} teams={testTeams}/>)
         .toJSON();
       expect(tree).toMatchSnapshot(); 
    });
