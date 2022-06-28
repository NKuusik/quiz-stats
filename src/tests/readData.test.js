const {parseData: parseData, getTeamResults: getTeamResults} = require('../scripts/readData');


const testData = '2,FakeTeam,9.5,8,,9,10,3,4,54';

test('Data is parsed properly', async () => {
  const parsedData = await parseData(testData);
  expect(parsedData.data[0]).toEqual(testData.split(','));
});