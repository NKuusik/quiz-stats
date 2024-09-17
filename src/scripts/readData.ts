const papaparse = require('papaparse');

export async function parseData(input: string): Promise<object> {
  return new Promise((resolve) => {
    papaparse.parse(input, {
      complete: function(results : object) {
        return resolve(results);
      }
    });
  });
}
