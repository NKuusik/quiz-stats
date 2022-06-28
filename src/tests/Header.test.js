import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../components/Header';
import {cleanup, fireEvent, render} from '@testing-library/react';


// Todo: testi evente Enzyme'iga
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
