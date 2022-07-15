import React from 'react';
import renderer from 'react-test-renderer';
import TeamView from '../components/TeamView';
import { Team } from '../classes/EntityChildren/Team';
import { Season } from '../classes/EntityChildren/Season';

// Todo: State change with enzyme.

const testTeam = new Team("Fake team", [1, 2, 4], 3);
const testSeason = new Season("SeasonNumber");
testTeam.results["SeasonNumber"] = ["3", "4", "2"];
testTeam.teamSeasons["SeasonNumber"] = testSeason;


it('default renders correctly', () => {
    const tree = renderer
         .create(<TeamView seasonNames={["SeasonNumber"]} team={testTeam}/>)
         .toJSON();
       expect(tree).toMatchSnapshot(); 
     });


const secondSeason = new Season("SecondSeason");
const thirdSeason = new Season("ThirdSeason");
const fourthSeason = new Season("FourthSeason");
testTeam.results["SecondSeason"] = ["3", "4", "2"];
testTeam.results["ThirdSeason"] = ["3", "4", "2"];
testTeam.results["FourthSeason"] = ["3", "4", "2"];
testTeam.teamSeasons["SecondSeason"] = secondSeason;
testTeam.teamSeasons["ThirdSeason"] = thirdSeason;
testTeam.teamSeasons["FourthSeason"] = fourthSeason;


it('only 3 seasons are displayed', () => {
    const tree = renderer
         .create(<TeamView seasonNames={["SeasonNumber", "SecondSeason", "ThirdSeason", "FourthSeason"]} team={testTeam}/>)
         .toJSON();
       expect(tree).toMatchSnapshot(); 
     });
