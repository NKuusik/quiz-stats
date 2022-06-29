import React from 'react';
import renderer from 'react-test-renderer';
import App  from '../App';
import { Team }  from '../classes/Team';
import { Season } from '../classes/Season';

it('default renders correctly', () => {
    const tree = renderer
        .create(<App />)
        .toJSON();
      expect(tree).toMatchSnapshot(); 
    });