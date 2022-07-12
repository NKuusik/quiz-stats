/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import MenuBar from '../components/MenuBar';
import {Team} from '../classes/Team';
import {render, fireEvent} from '@testing-library/react';

const category = {};
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

test('value changes in SearchField input', () => { // Triviaalne test, aga kui jatta, siis äkki SearchFieldi sees?
  const menuBar = render((<MenuBar viewType="" category={category} choice={choice}/>));
  const searchField = menuBar.container.querySelector('input');
  expect(searchField.value).toBe('');
  fireEvent.change(searchField, {target: {value: 'gad'}});
  expect(searchField.value).toBe('gad');
});

test('entries are shown', () => {
  const firstTeam = new Team(1, "Fake team", [1, 2], 3);
  firstTeam.results["SeasonNumber"] = [3, 4]

  const secondTeam = new Team(1, "secondTeam", [1, 2], 3);
  firstTeam.results["SeasonNumber"] = [3, 4]
  secondTeam.results["SeasonNumber"] = [3, 4]
  
  let testTeams = {
    "Fake team": firstTeam,
    "secondTeam": secondTeam
  };
  const menuBar = render((<MenuBar viewType="team" category={testTeams} choice={choice}/>));
  const entriesAsDOM = menuBar.container.getElementsByClassName('entry-selection');
  expect(entriesAsDOM.length).toBe(2);
  expect(entriesAsDOM[0].textContent).toBe('Fake team');
  expect(entriesAsDOM[1].textContent).toBe('secondTeam');
});

test('entries correspond to value on SearchField input', () => {
  const firstTeam = new Team(1, "Fake team", [1, 2], 3);
  firstTeam.results["SeasonNumber"] = [3, 4]

  const secondTeam = new Team(1, "secondTeam", [1, 2], 3);
  firstTeam.results["SeasonNumber"] = [3, 4]
  secondTeam.results["SeasonNumber"] = [3, 4]
  
  let testTeams = {
    "Fake team": firstTeam,
    "secondTeam": secondTeam
  };
  const menuBar = render((<MenuBar viewType="team" category={testTeams} choice={choice}/>));
  const entriesAsDOM = menuBar.container.getElementsByClassName('entry-selection');
  expect(entriesAsDOM.length).toBe(2);
  expect(entriesAsDOM[0].textContent).toBe('Fake team');
  expect(entriesAsDOM[1].textContent).toBe('secondTeam');
  const searchField = menuBar.container.querySelector('input');
  // No result
  fireEvent.change(searchField, {target: {value: 'boo'}});
  fireEvent.keyUp(searchField, {key: 'A', code: 'KeyA'});
  expect(entriesAsDOM.length).toBe(0);

  //One result
  fireEvent.change(searchField, {target: {value: 'Fake'}});
  fireEvent.keyUp(searchField, {key: 'A', code: 'KeyA'});
  expect(entriesAsDOM.length).toBe(1);

  //Two results, case insensitive
  fireEvent.change(searchField, {target: {value: 'team'}});
  fireEvent.keyUp(searchField, {key: 'A', code: 'KeyA'});
  expect(entriesAsDOM.length).toBe(2);

  //Two results, whitespaces and tab
  fireEvent.change(searchField, {target: {value: '  team  '}});
  fireEvent.keyUp(searchField, {key: 'A', code: 'KeyA'});
  expect(entriesAsDOM.length).toBe(2);
});

/* Todo: Uuri, kuidas kontrollida, kas form submission toimus või mitte

test('Default submission with Enter is disabled for SearchField input', () => {
  const menuBar = render((<MenuBar viewType="" category={category} choice={choice}/>));
  const searchField = menuBar.container.querySelector('input');
  expect(searchField.value).toBe('');
  fireEvent.change(searchField, {target: {value: 'gad'}});
  fireEvent.keyDown(searchField, {key: 'Enter', code: 'Enter', charCode: 13})
  expect(menuBar.handleMouseUp).toHaveBeenCalled();
});
**/
