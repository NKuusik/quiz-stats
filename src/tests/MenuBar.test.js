/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import MenuBar from '../components/MenuBar';
import {Team} from '../classes/EntityChildren/Team';
import {render, fireEvent} from '@testing-library/react';
import {screen} from '@testing-library/dom'

const category = [];
const choice = () => {};
const viewTypeSeason = "season";
const viewTypeTeam = "team";

it('default renders correctly', () => {
    const tree = renderer
         .create(<MenuBar viewType="" category={category} choice={choice}/>)
         .toJSON();
       expect(tree).toMatchSnapshot(); 
     });

it('season renders correctly', () => {
    const tree = renderer
         .create(<MenuBar viewType={viewTypeSeason} category={category} choice={choice}/>)
         .toJSON();
       expect(tree).toMatchSnapshot(); 
     });

it('team renders correctly', () => {
    const tree = renderer
         .create(<MenuBar viewType={viewTypeTeam} category={category} choice={choice}/>)
         .toJSON();
       expect(tree).toMatchSnapshot(); 
     });

test('value changes in SearchField input', () => {
  const menuBar = render((<MenuBar viewType="" category={category} choice={choice}/>));
  const searchField = menuBar.container.querySelector('input');
  expect(searchField.value).toBe('');
  fireEvent.change(searchField, {target: {value: 'gad'}});
  expect(searchField.value).toBe('gad');
});

test('entries are shown', () => {
  const firstTeam = new Team("Fake team", [1, 2], 3);
  firstTeam.results["SeasonNumber"] = [3, 4]

  const secondTeam = new Team("secondTeam", [1, 2], 3);
  firstTeam.results["SeasonNumber"] = [3, 4]
  secondTeam.results["SeasonNumber"] = [3, 4]
  
  let testTeams = {
    "Fake team": firstTeam,
    "secondTeam": secondTeam
  };
  render((<MenuBar viewType="team" category={Object.keys(testTeams)} choice={choice}/>));
  const entriesAsDOM = screen.getAllByTestId('matched-entry');
  expect(entriesAsDOM.length).toBe(2);
  expect(entriesAsDOM[0].textContent).toBe('Fake team');
  expect(entriesAsDOM[1].textContent).toBe('secondTeam');
});

test('entries correspond to value on SearchField input', () => {
  const firstTeam = new Team("Fake team", [1, 2], 3);
  firstTeam.results["SeasonNumber"] = [3, 4]

  const secondTeam = new Team("secondTeam", [1, 2], 3);
  firstTeam.results["SeasonNumber"] = [3, 4]
  secondTeam.results["SeasonNumber"] = [3, 4]
  
  let testTeams = {
    "Fake team": firstTeam,
    "secondTeam": secondTeam
  };
  const menuBar = render((<MenuBar viewType="team" category={Object.keys(testTeams)} choice={choice}/>));
  let entriesAsDOM = screen.queryAllByTestId('matched-entry');
  expect(entriesAsDOM.length).toBe(2);
  expect(entriesAsDOM[0].textContent).toBe('Fake team');
  expect(entriesAsDOM[1].textContent).toBe('secondTeam');
  const searchField = menuBar.container.querySelector('input');

  // No result
  fireEvent.change(searchField, {target: {value: 'boo'}});
  fireEvent.keyUp(searchField, {key: 'A', code: 'KeyA'});
  entriesAsDOM = screen.queryAllByTestId('matched-entry');
  expect(entriesAsDOM.length).toBe(0);

  //One result
  fireEvent.change(searchField, {target: {value: 'Fake'}});
  fireEvent.keyUp(searchField, {key: 'A', code: 'KeyA'});
  entriesAsDOM = screen.queryAllByTestId('matched-entry');
  expect(entriesAsDOM.length).toBe(1);

  //Two results, case insensitive
  fireEvent.change(searchField, {target: {value: 'team'}});
  fireEvent.keyUp(searchField, {key: 'A', code: 'KeyA'});
  entriesAsDOM = screen.queryAllByTestId('matched-entry');
  expect(entriesAsDOM.length).toBe(2);

  //Two results, whitespaces and tab
  fireEvent.change(searchField, {target: {value: '  team  '}});
  fireEvent.keyUp(searchField, {key: 'A', code: 'KeyA'});
  entriesAsDOM = screen.queryAllByTestId('matched-entry');
  expect(entriesAsDOM.length).toBe(2);
});