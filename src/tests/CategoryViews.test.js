import React from 'react';
import renderer from 'react-test-renderer';
import CategoryView from '../components/CategoryView';
import {Team} from '../scripts/readData'

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

it('renders correctly with Seasons', () => {

    const tree = renderer
         .create(<CategoryView category={testSeasons} choice={testSeason}/>)
         .toJSON();
       expect(tree).toMatchSnapshot(); 
    });

it('renders correctly with Teams', () => {

    const tree = renderer
         .create(<CategoryView category={testTeams} choice={testTeam}/>)
         .toJSON();
       expect(tree).toMatchSnapshot(); 
    });