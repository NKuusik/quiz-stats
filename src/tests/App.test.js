import React from 'react';
import renderer from 'react-test-renderer';
import App  from '../App';

// Just a placeholder for now.

it('default renders correctly', () => {
    const tree = renderer
        .create(<App />)
        .toJSON();
      expect(tree).toMatchSnapshot(); 
    });