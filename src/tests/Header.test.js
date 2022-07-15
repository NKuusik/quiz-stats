/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../components/Header';
import {screen} from '@testing-library/dom';
import {render} from '@testing-library/react';

it('default renders correctly', () => {
  const tree = renderer
      .create(<Header activeView="" choice={""} />)
      .toJSON();
    expect(tree).toMatchSnapshot(); 
  });

it('season renders correctly', () => {
  const tree = renderer
       .create(<Header activeView="season" choice={""} />)
       .toJSON();
     expect(tree).toMatchSnapshot(); 
   });

it('team renders correctly', () => {
  const tree = renderer
      .create(<Header activeView="season" choice={""} />)
      .toJSON();
    expect(tree).toMatchSnapshot(); 
   });

test('Header displays "Stats for something" when no active view', () => {
  render(<Header activeView="" choice={""} />);
  expect(screen.getByRole("heading")).toHaveTextContent("Stats for something");
});

test('Header displays "Stats for teams" when no active view', () => {
  render(<Header activeView="team" choice={""} />);
  expect(screen.getByRole("heading")).toHaveTextContent("Stats for team");
});

test('Header displays "Stats for seasons" when no active view', () => {
  render(<Header activeView="season" choice={""} />);
  expect(screen.getByRole("heading")).toHaveTextContent("Stats for season");
});