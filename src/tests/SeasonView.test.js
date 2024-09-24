/**
 * @jest-environment jsdom
 */

import React from 'react';
import SeasonView from '../components/SeasonView';
import {Team} from '../classes/EntityChildren/Team';
import {Season} from '../classes/EntityChildren/Season';
import {render, fireEvent, screen} from '@testing-library/react';

// Todo: kusagil peaks valideerima, et Team place ei kattu Seasoni ulatuses.

const testTeam = new Team("Fake team", [1, 2, 4.2, 5, 6], 3);
const secondTeam = new Team("Second team", [1, 2, 4, 5, 6], 3);
const thirdTeam = new Team("Third team", [1, 2, 4, 5, 6], 3);
const fourthTeam = new Team("Fourth team", [1, 2, 4, 5, 6], 3);

let testTeams = {
  "Fake team": testTeam
};

testTeam.results["Test Season"] = [1, 2, 4.2, 5, 6];

const testSeason = new Season("Test Season", testTeams, 5, ["Fake team"]);

it('default renders correctly', () => {
    const tree = render(<SeasonView season={testSeason} />);
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
    const tree = render(<SeasonView season={secondSeason} />);
       expect(tree).toMatchSnapshot(); 
    });

test('active button can be toggled', () => {
  const element = render(<SeasonView season={testSeason}></SeasonView>);
  let activeButton = element.container.querySelector("#chart-button-active");
  const seasonViewButton = element.container.querySelectorAll(".button-chart")[0];
  const cumulativeViewButton = element.container.querySelectorAll(".button-chart")[1];
  expect(seasonViewButton).toBe(activeButton);
  fireEvent.click(cumulativeViewButton);
  activeButton = element.container.querySelector("#chart-button-active");
  expect(cumulativeViewButton).toBe(activeButton);
  fireEvent.click(seasonViewButton);
  activeButton = element.container.querySelector("#chart-button-active");
  expect(seasonViewButton).toBe(activeButton);
});

test('data is accurate in ChartDataSets', () =>{
  const element = render(<SeasonView season={testSeason}></SeasonView>);
  const cumulativeViewButton = element.container.querySelectorAll(".button-chart")[1];
  let testData = element.container.getElementsByClassName('test-data')[0];
  
  // Game-by-game view point data.
  expect(testData).toHaveTextContent('1,2,4.2,5,6');
  
  // Incremental view point data.
  fireEvent.click(cumulativeViewButton);
  testData = element.container.getElementsByClassName('test-data')[0];
  expect(testData).toHaveTextContent('1,3,7.2,12.2,18.2');
});