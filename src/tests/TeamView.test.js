/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import TeamView from '../components/TeamView';
import { Team } from '../classes/EntityChildren/Team';
import { Season } from '../classes/EntityChildren/Season';
import {render, fireEvent} from '@testing-library/react';

const testTeam = new Team("Fake team", [1, 2, 4], 3);
const testSeason = new Season("SeasonNumber");
testTeam.results["SeasonNumber"] = ["3", "4", "2"];
testTeam.teamSeasons["SeasonNumber"] = testSeason;


it('default renders correctly', () => {
    const tree = renderer
         .create(<TeamView seasonNames={["SeasonNumber"]} team={testTeam}/>)
         .toJSON();
       expect(tree).toMatchSnapshot(); 
     });


const secondSeason = new Season("SecondSeason");
const thirdSeason = new Season("ThirdSeason");
const fourthSeason = new Season("FourthSeason");
testTeam.results["SecondSeason"] = ["3", "4", "2"];
testTeam.results["ThirdSeason"] = ["3", "4", "2"];
testTeam.results["FourthSeason"] = ["3", "4", "2"];
testTeam.teamSeasons["SecondSeason"] = secondSeason;
testTeam.teamSeasons["ThirdSeason"] = thirdSeason;
testTeam.teamSeasons["FourthSeason"] = fourthSeason;


it('only 3 seasons are displayed', () => {
    const tree = renderer
         .create(<TeamView seasonNames={["SeasonNumber", "SecondSeason", "ThirdSeason", "FourthSeason"]} team={testTeam}/>)
         .toJSON();
       expect(tree).toMatchSnapshot(); 
     });

test('active button can be toggled', () => {
  const element = render(<TeamView seasonNames={["SeasonNumber", "SecondSeason", "ThirdSeason", "FourthSeason"]} team={testTeam}/>)
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