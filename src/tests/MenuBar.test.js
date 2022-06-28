import React from 'react';
import renderer from 'react-test-renderer';
import MenuBar from '../components/MenuBar';

const category = {};
const choice = () => {};
const viewType = "season";


it('default renders correctly', () => {
    const tree = renderer
         .create(<MenuBar viewType={viewType} category={category} choice={choice}/>)
         .toJSON();
       expect(tree).toMatchSnapshot(); 
     });