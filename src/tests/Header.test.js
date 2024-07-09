/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../components/Header';
import {screen} from '@testing-library/dom';
import {render, fireEvent} from '@testing-library/react';

it('default renders correctly', () => {
  const tree = renderer
      .create(<Header 
        choice={() => console.log('choice was called')}
        smallLayoutTransitions={() => console.log('smallLayoutTransitions was called')}
        activeView="" 
        collapseWidth={800}
        />)
      .toJSON();
    expect(tree).toMatchSnapshot(); 
  });

it('season renders correctly', () => {
  const tree = renderer
       .create(<Header 
        choice={() => console.log('choice was called')}
        smallLayoutTransitions={() => console.log('smallLayoutTransitions was called')}
        activeView="season" 
        collapseWidth={800}
        />)
       .toJSON();
     expect(tree).toMatchSnapshot(); 
   });

it('team renders correctly', () => {
  const tree = renderer
      .create(<Header 
        choice={() => console.log('choice was called')}
        smallLayoutTransitions={() => console.log('smallLayoutTransitions was called')}
        activeView="team" 
        collapseWidth={800}
        />)
      .toJSON();
    expect(tree).toMatchSnapshot(); 
   });

test('Header displays "Stats for something" when no active view', () => {
  render(<Header 
    choice={() => console.log('choice was called')}
    smallLayoutTransitions={() => console.log('smallLayoutTransitions was called')}
    activeView="" 
    collapseWidth={800}
    />);
  expect(screen.getByRole("heading")).toHaveTextContent("Stats for something");
});

test('Header displays "Stats for teams" when team is active view', () => {
  render(<Header 
    choice={() => console.log('choice was called')}
    smallLayoutTransitions={() => console.log('smallLayoutTransitions was called')}
    activeView="team" 
    collapseWidth={800}
    />);
  expect(screen.getByRole("heading")).toHaveTextContent("Stats for team");
});

test('Header displays "Stats for seasons" when season is active view', () => {
  render(<Header 
    choice={() => console.log('choice was called')}
    smallLayoutTransitions={() => console.log('smallLayoutTransitions was called')}
    activeView="season" 
    collapseWidth={800}
    />);
  expect(screen.getByRole("heading")).toHaveTextContent("Stats for season");
});

test('Active view value changes when clicking the corresponding button', () => {
  let choiceValue = ''; // Mock value which in actual code depends on App component.
  let header = render(<Header 
    activeView={choiceValue} 
    choice={(value) => {choiceValue = value}} 
    smallLayoutTransitions={() => console.log('smallLayoutTransitions was called')}
    collapseWidth={800}
    />);
  let activeButton = header.container.querySelector('#header-active');
  expect(activeButton).toBe(null);
  let teamButton = header.container.querySelectorAll('button')[0];
  let seasonButton = header.container.querySelectorAll('button')[1];
  
  // Team button is clicked.
  fireEvent.click(teamButton);
  header = render(<Header 
    activeView={choiceValue} 
    choice={(value) => {choiceValue = value}} 
    smallLayoutTransitions={() => console.log('smallLayoutTransitions was called')}
    collapseWidth={800}
    />);
  teamButton = header.container.querySelectorAll('button')[0];
  activeButton = header.container.querySelector('#header-active');
  expect(teamButton).toBe(activeButton);

  // Season button is clicked.
  fireEvent.click(seasonButton);
  header = render(<Header 
    activeView={choiceValue} 
    choice={(value) => {choiceValue = value}} 
    smallLayoutTransitions={() => console.log('smallLayoutTransitions was called')}
    collapseWidth={800}
    />);
  activeButton = header.container.querySelector('#header-active');
  seasonButton = header.container.querySelectorAll('button')[1];
  expect(seasonButton).toBe(activeButton);
});