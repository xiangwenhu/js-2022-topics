const sourceMap = require("source-map");

const rawSourceMap = {
  version: 3,
  sources: ["index.js"],
  names: ["words", "console", "log"],
  mappings: "AACA,IAAIA,MAAQ,QACZC,QAAQC,IAAIF,KAAK",
};

(async function test() {
  const whatever = await sourceMap.SourceMapConsumer.with(
    rawSourceMap,
    null,
    (consumer) => {
      console.log(consumer.sources);
      // [ 'index.js']

      console.log(
        consumer.originalPositionFor({
          source: "index.js",
          line: 1,
          column: 4,
        })
      );
    // { source: 'index.js', line: 2, column: 4, name: 'words' }
    // words

    console.log(
        consumer.originalPositionFor({
          source: "index.js",
          line: 1,
          column: 10,
        })
      );
    // { source: 'index.js', line: 2, column: 12, name: null } 
    // '


    console.log(
        consumer.originalPositionFor({
          source: "index.js",
          line: 1,
          column: 35,
        })
      );
     
      // { source: 'index.js', line: 3, column: 17, name: null }
      // )

    }
  );
})();
