import React from 'react';
import renderer from 'react-test-renderer';
import DummyComponent from '../subcomponents/DummyComponent';

it('renders correctly', () => {
 const tree = renderer
      .create(<DummyComponent />)
      .toJSON();
    expect(tree).toMatchSnapshot(); 
  });