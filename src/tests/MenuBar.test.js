import React from 'react';
import renderer from 'react-test-renderer';
import MenuBar from '../components/MenuBar';
import {cleanup, fireEvent, render} from '@testing-library/react';

const category = {};
const choice = () => {};
const viewTypeSeason = "season";
const viewTypeTeam = "team";

// Todo: test state change with Enzyme

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