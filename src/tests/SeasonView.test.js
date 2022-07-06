import React from 'react';
import renderer from 'react-test-renderer';
import SeasonView from '../components/SeasonView';
import {Team} from '../classes/Team';
import {Season} from '../classes/Season';

// Todo: kusagil peaks kontrollima, et Team place ei kattu Seasoni ulatuses.

const testTeam = new Team(1, "Fake team", [1, 2, 4, 5, 6], 3);
const secondTeam = new Team(2, "Second team", [1, 2, 4, 5, 6], 3);
const thirdTeam = new Team(3, "Third team", [1, 2, 4, 5, 6], 3);
const fourthTeam = new Team(4, "Fourth team", [1, 2, 4, 5, 6], 3);

let testTeams = {
  "Fake team": testTeam
};

testTeam.seasons["Test Season"] = [1, 2, 4, 5, 6];

const testSeason = new Season("Test Season", testTeams, 5, ["Fake team"]);

it('default renders correctly', () => {

    const tree = renderer
         .create(<SeasonView season={testSeason} />)
         .toJSON();
       expect(tree).toMatchSnapshot(); 
    });

let secondTestTeams = {
  "Fake team": testTeam,
  "Second team": secondTeam,
  "Third team": thirdTeam,
  "Fourth team": fourthTeam
}

testTeam.seasons["Second Season"] = [1, 2, 4, 5, 6];
secondTeam.seasons["Second Season"] = [1, 2, 4, 5, 6];
thirdTeam.seasons["Second Season"] = [1, 2, 4, 5, 6];
fourthTeam.seasons["Second Season"] = [1, 2, 4, 5, 6];

const secondSeason = new Season("Second Season", secondTestTeams, 5, ["Fake team", "Second team", "Third team", "Fourth team"]);

it('only 3 teams are shown', () => {

    const tree = renderer
         .create(<SeasonView season={secondSeason} />)
         .toJSON();
       expect(tree).toMatchSnapshot(); 
    });
    