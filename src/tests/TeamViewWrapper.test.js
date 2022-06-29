/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import TeamViewWrapper from '../components/TeamViewWrapper';
import {Team} from '../classes/Team';
import {render, fireEvent} from '@testing-library/react';

const testTeam = new Team(1, "Fake team", [1, 2], 3);
testTeam.seasons["SeasonNumber"] = [3, 4]

let testTeams = {
  "Fake team": testTeam
};

it('renders correctly', () => {

    const tree = renderer
         .create(<TeamViewWrapper teams={testTeams} seasonNames={['SeasonNumber']}/>)
         .toJSON();
       expect(tree).toMatchSnapshot(); 
    });

test("Active team is changed in menu bar", () => {
  const element = render(<TeamViewWrapper teams={testTeams} seasonNames={['SeasonNumber']}/>);
  const entriesInMenuBar = element.container.querySelector('.entry-selection');
  fireEvent.click(entriesInMenuBar);
  expect(element.getByRole('heading')).toHaveTextContent('Stats for team Fake team');
});  

// Todo: Active team dissapears after toggling the same team.