import {parseData, getTeamResults, Team} from '../scripts/readData';
import axios from 'axios';


test("Data is parsed properly", async () => {
    const testData = "2,FakeTeam,9.5,8,,9,10,3,4,54";

    const parsedData = await parseData(testData);
    console.log(testData.split(","));
    expect(parsedData.data[0]).toEqual(testData.split(","));
    });