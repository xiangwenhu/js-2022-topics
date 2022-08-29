
const sourceMap = require('source-map');
const fs = require('fs');
const path = require('path');

const { SourceMapGenerator } = sourceMap;
const NAMES = ["words", "console", "log"];
var generator = new SourceMapGenerator({
    file: 'index.js.map'
});

const mappings = [
    [0, 0, 1, 0],
    [4, 0, 0, 4, 0],
    [6, 0, 0, 8],
    [8, 0, 1, -12, 1],
    [8, 0, 0, 8, 1],
    [4, 0, 0, 4, -2],
    [5, 0, 0, 5]
];

function addMappings(generator, mappings) {
    let tCol = 0;
    let sFileIndex = 0;
    let sLine = 1;
    let sCol = 0;
    let sNameIndex = 0;

    let name;
    mappings.forEach(mapping => {
        // 目标列
        tCol += mapping[0];
        // 源文件索引
        sFileIndex += mapping[1];
        // 源代码行
        sLine += mapping[2];
        // 源代码列
        sCol += mapping[3];

        // 名字索引
        if (mapping.length > 4) {
            sNameIndex += mapping[4];
            name = NAMES[sNameIndex];
        }
        const mappingData = {
            generated: {
                line: 1,
                column: tCol
            },
            source: "index.js",
            original: {
                line: sLine,
                column: sCol
            },
            name: mapping.length > 4 ? name : undefined
        }
        // if (mapping.length > 4) {
        //     mappingData.name = name
        // }
        generator.addMapping(mappingData);
    });
}

addMappings(generator, mappings);


const fullPath = path.join(__dirname, 'index.js.map');
const content = JSON.stringify(generator.toJSON(), undefined, '\t')
fs.writeFileSync(fullPath, content);

