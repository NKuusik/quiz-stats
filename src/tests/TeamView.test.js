import React from 'react';
import renderer from 'react-test-renderer';
import TeamView from '../components/TeamView';
import {Team} from '../scripts/readData';

const testTeam = new Team(1, "Fake team", [1, 2], 3);
testTeam.seasons["SeasonNumber"] = [3, 4]

it('renders correctly', () => {
    const tree = renderer
         .create(<TeamView chooseTeam={testTeam} team={testTeam}/>)
         .toJSON();
       expect(tree).toMatchSnapshot(); 
     });
