/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import TeamView from '../components/TeamView';
import { Team } from '../classes/EntityChildren/Team';
import { Season } from '../classes/EntityChildren/Season';
import {render, fireEvent} from '@testing-library/react';

const testTeam = new Team("Fake team", [], 3);
const testSeason = new Season("TestSeason 01");
testTeam.results["TestSeason 01"] = ["10", "11", "12"]; // 33
testTeam.teamSeasons["TestSeason 01"] = testSeason;


it('default renders correctly', () => {
    const tree = renderer
         .create(<TeamView allTeams={allTeams} seasonNames={["TestSeason 01"]} chosenTeam={testTeam} collapseWidth={800}/>)
         .toJSON();
       expect(tree).toMatchSnapshot(); 
     });


const secondSeason = new Season("TestSeason 02");
const thirdSeason = new Season("TestSeason 03");
const fourthSeason = new Season("TestSeason 04");
testTeam.results["TestSeason 02"] = ["7", "8", "9"]; // 24
testTeam.results["TestSeason 03"] = ["4", "5", "6"]; // 15
testTeam.results["TestSeason 04"] = ["1", "2", "3"]; // 6
testTeam.teamSeasons["TestSeason 02"] = secondSeason;
testTeam.teamSeasons["TestSeason 03"] = thirdSeason;
testTeam.teamSeasons["TestSeason 04"] = fourthSeason;


const allTeams = {"Fake Team": testTeam};


it('only 3 seasons are displayed', () => {
    const tree = renderer
         .create(<TeamView 
            allTeams={allTeams} 
            seasonNames={["TestSeason 01", "TestSeason 02", "TestSeason 03", "TestSeason 04"]} 
            chosenTeam={testTeam}
            collapseWidth={800} />)
         .toJSON();
       expect(tree).toMatchSnapshot(); 
     });

test('active button can be toggled', () => {
  const element = render(<TeamView 
    allTeams={allTeams} 
    seasonNames={["TestSeason 01", "TestSeason 02", "TestSeason 03", "TestSeason 04"]} 
    chosenTeam={testTeam}
    collapseWidth={800}/>)
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


const secondTeam = new Team("Second team", [], 2);
const thirdTeam = new Team("Third team", [], 2);
secondTeam.results["TestSeason 01"] = ["1", "2", "3"]; // 6
secondTeam.teamSeasons["TestSeason 01"] = testSeason;
secondTeam.results["TestSeason 02"] = ["4", "5", "6"]; // 15
secondTeam.results["TestSeason 03"] = ["7", "8", "9"]; // 24
secondTeam.results["TestSeason 04"] = ["10", "11", "12"]; // 33
secondTeam.teamSeasons["TestSeason 02"] = secondSeason;
secondTeam.teamSeasons["TestSeason 03"] = thirdSeason;
secondTeam.teamSeasons["TestSeason 04"] = fourthSeason;

thirdTeam.results["TestSeason 01"] = ["3", "4", "2"]; // 9
thirdTeam.teamSeasons["TestSeason 01"] = testSeason;
thirdTeam.results["TestSeason 02"] = ["3", "4", "2"]; // 9
thirdTeam.results["TestSeason 03"] = ["3", "4", "2"]; // 9 
thirdTeam.results["TestSeason 04"] = ["3", "4", "2"]; // 9
thirdTeam.teamSeasons["TestSeason 02"] = secondSeason;
thirdTeam.teamSeasons["TestSeason 03"] = thirdSeason;
thirdTeam.teamSeasons["TestSeason 04"] = fourthSeason;

allTeams["Second team"] = secondTeam;
allTeams["Third team"] = thirdTeam;

test('can compare teams in cumulative view', () => {
  const element = render(<TeamView 
      allTeams={allTeams} 
      seasonNames={["TestSeason 01", "TestSeason 02", "TestSeason 03", "TestSeason 04"]} 
      chosenTeam={testTeam}
      collapseWidth={800}/>)
  const cumulativeViewButton = element.container.querySelectorAll(".button-chart")[1];
  fireEvent.click(cumulativeViewButton);

  const pointTypeToggleButton = element.container.querySelectorAll(".button-chart")[2];
  const teamComparisonButton = element.container.querySelector('#comparison-menu-bar').querySelector('button');
  fireEvent.click(teamComparisonButton);
 
  const teamComparisonMenuBar = element.container.querySelector('#comparison-menu-bar').querySelector('.menu-bar-container');
  const teamComparisonMenuentries = teamComparisonMenuBar.querySelectorAll('.entry-selection');
  let mockChartDisplayedTestData = element.container.querySelector('.test-data').querySelectorAll('p');

  // Only original team is selected.

  expect(mockChartDisplayedTestData.length).toBe(1);
  expect(mockChartDisplayedTestData[0]).toHaveTextContent('11,8,5,2');

  // Switch to cumulative points
  fireEvent.click(pointTypeToggleButton);
  mockChartDisplayedTestData = element.container.querySelector('.test-data').querySelectorAll('p');
  expect(mockChartDisplayedTestData.length).toBe(1);
  expect(mockChartDisplayedTestData[0]).toHaveTextContent('33,24,15,6');

  // Second team is selected for comparison.
  fireEvent.click(teamComparisonMenuentries[1]);
  mockChartDisplayedTestData = element.container.querySelector('.test-data').querySelectorAll('p');
  expect(mockChartDisplayedTestData.length).toBe(2)
  expect(mockChartDisplayedTestData[1]).toHaveTextContent('6,15,24,33');

   // Switch to average points
  fireEvent.click(pointTypeToggleButton);
  mockChartDisplayedTestData = element.container.querySelector('.test-data').querySelectorAll('p');
  expect(mockChartDisplayedTestData.length).toBe(2)
  expect(mockChartDisplayedTestData[1]).toHaveTextContent('2,5,8,11');

  // Thrid team is selected for comparison.
  fireEvent.click(teamComparisonMenuentries[2]);
  mockChartDisplayedTestData = element.container.querySelector('.test-data').querySelectorAll('p');
  expect(mockChartDisplayedTestData.length).toBe(3)
  expect(mockChartDisplayedTestData[2]).toHaveTextContent('3,3,3,3');

  // Switch to cumulative points
  fireEvent.click(pointTypeToggleButton);
  mockChartDisplayedTestData = element.container.querySelector('.test-data').querySelectorAll('p');
  expect(mockChartDisplayedTestData.length).toBe(3)
  expect(mockChartDisplayedTestData[2]).toHaveTextContent('9,9,9,9');

  // Second is unselected for comparison.
  fireEvent.click(teamComparisonMenuentries[1]);
  mockChartDisplayedTestData = element.container.querySelector('.test-data').querySelectorAll('p');
  expect(mockChartDisplayedTestData.length).toBe(2)
  expect(mockChartDisplayedTestData[1]).toHaveTextContent('9,9,9,9'); // This is now data from third team.

  // Close teamComparisonMenuBar
  let closeButton = element.container.querySelector('#comparison-close');
  fireEvent.click(closeButton);
  closeButton = element.container.querySelector('#comparison-close');
  expect(closeButton).toBe(null); // Button no longer visible as the menu bar is closed.
})