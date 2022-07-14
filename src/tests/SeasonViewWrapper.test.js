/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import SeasonViewWrapper from '../components/SeasonViewWrapper';
import { Team } from '../classes/Team';
import { Season } from '../classes/EntityChildren/Season';
import {screen} from '@testing-library/dom';
import {render, fireEvent} from '@testing-library/react';

// Todo: Test state change with Enzyme

const testTeam = new Team(1, "Fake team", [1, 2], 3);
testTeam.results["Test Season"] = [3, 4]

let testTeams = {
  "Fake team": testTeam
};

const testSeason = new Season("Test Season", {testTeams}, 0, []);

const testSeasons = {
    "Test Season": testSeason
}

it('default renders correctly', () => {

    const tree = renderer
         .create(<SeasonViewWrapper seasons={testSeasons} teams={testTeams}/>)
         .toJSON();
       expect(tree).toMatchSnapshot(); 
    });


test("Active season is changed in menu bar", () => {
  const element = render(<SeasonViewWrapper seasons={testSeasons} teams={testTeams}/>);
  const entriesInMenuBar = element.container.querySelector('.entry-selection');
  fireEvent.click(entriesInMenuBar);
  expect(element.getByRole('heading')).toHaveTextContent('Stats for Test Season');
});     