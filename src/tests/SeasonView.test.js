/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import SeasonView from '../components/SeasonView';
import {Team} from '../classes/EntityChildren/Team';
import {Season} from '../classes/EntityChildren/Season';
import {render, fireEvent} from '@testing-library/react';

// Todo: kusagil peaks valideerima, et Team place ei kattu Seasoni ulatuses.

const testTeam = new Team("Fake team", [1, 2, 4, 5, 6], 3);
const secondTeam = new Team("Second team", [1, 2, 4, 5, 6], 3);
const thirdTeam = new Team("Third team", [1, 2, 4, 5, 6], 3);
const fourthTeam = new Team("Fourth team", [1, 2, 4, 5, 6], 3);

let testTeams = {
  "Fake team": testTeam
};

testTeam.results["Test Season"] = [1, 2, 4, 5, 6];

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

testTeam.results["Second Season"] = [1, 2, 4, 5, 6];
secondTeam.results["Second Season"] = [1, 2, 4, 5, 6];
thirdTeam.results["Second Season"] = [1, 2, 4, 5, 6];
fourthTeam.results["Second Season"] = [1, 2, 4, 5, 6];

const secondSeason = new Season("Second Season", secondTestTeams, 5, ["Fake team", "Second team", "Third team", "Fourth team"]);

it('teams are hidden by default after third team', () => {
    const tree = renderer
         .create(<SeasonView season={secondSeason} />)
         .toJSON();
       expect(tree).toMatchSnapshot(); 
    });
    
test('cumulative view is triggered', () => { // Siin võiks veel LineCharti titleContent propsi kontrollida. Peab vastavaks muutma MockCharti
  const element = render(<SeasonView season={testSeason}></SeasonView>);
  let activeButton = element.container.querySelector("#chart-button-active");
  const cumulativeViewButton = element.container.querySelectorAll(".button-chart-type")[1];
  expect(cumulativeViewButton).not.toBe(activeButton);
  fireEvent.click(cumulativeViewButton);
  activeButton = element.container.querySelector("#chart-button-active");
  expect(cumulativeViewButton).toBe(activeButton);
});