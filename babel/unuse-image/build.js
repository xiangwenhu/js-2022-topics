const babel = require("@babel/core");
const path = require("path");
const fsp = require("fs/promises");

const plugin = require("./plugin");


; (async function build() {

    const filePath = path.join(__dirname, "./src/index.js");

    const result = await babel.transformFileAsync(filePath, {
        parserOpts: {
            sourceType: "unambiguous"
        },
        ast: true,
        // plugins: [
        //     [plugin, {
        //         variables: ["images"],
        //     }]
        // ]
    });

    fsp.writeFile(path.join(__dirname, "ast.json"), JSON.stringify(result.ast, undefined, 4));


    console.log("code:", result.code);

    // const images = {
    //     back: 'backPng'
    // };
    // console.log(images.back);

})();