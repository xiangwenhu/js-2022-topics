const sourceMap = require("source-map");

const rawSourceMap = {
  version: 3,
  sources: ["index.js"],
  names: ["words", "console", "log"],
  mappings: "AACA,IAAIA,MAAQ,QACZC,QAAQC,IAAIF,KAAK",
};

const sourceCode = `// 输出日志
var words = 'Hello';
console.log(words);`;
const lines = sourceCode.split('\n')


function printSource(line, column) {
  console.log('source code:', lines[line - 1].substring(column));
}

(async function test() {
  const whatever = await sourceMap.SourceMapConsumer.with(
    rawSourceMap,
    null,
    (consumer) => {
      console.log(consumer.sources);
      // [ 'index.js']

      let pos = consumer.originalPositionFor({
        source: "index.js",
        line: 1,
        column: 4,
      })
      console.log('pos:', pos);
      printSource(pos.line, pos.column);
      console.log()
      // { source: 'index.js', line: 2, column: 4, name: 'words' }
      // words

      pos = consumer.originalPositionFor({
        source: "index.js",
        line: 1,
        column: 10,
      })

      console.log(pos);
      printSource(pos.line, pos.column);
      console.log();
      // { source: 'index.js', line: 2, column: 12, name: null } 
      // '


      pos =
        consumer.originalPositionFor({
          source: "index.js",
          line: 1,
          column: 35,
        })
      console.log(pos);
      printSource(pos.line, pos.column);
      console.log();
      // { source: 'index.js', line: 3, column: 17, name: null }
      // )

    }
  );
})();
