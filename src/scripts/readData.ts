const papaparse = require('papaparse');

export async function parseData(input: string): Promise<Object> {
  return new Promise((resolve) => {
    papaparse.parse(input, {
      complete: function(results : Object) {
        return resolve(results);
      }
    });
  });
}
