const parser = require('@babel/parser');
const traverse = require('@babel/traverse')
const template = require('@babel/template');
const generator = require('@babel/generator')

const code = `// 输出日志
var words = 'Hello';
console.log(words);`;

// 转换
const ast = parser.parse(code, {
    sourceType: 'module',
});

console.log(JSON.stringify(ast));

// 打印console.log调用节点位置
const visitor = {
    CallExpression(path) {
        // 输出console.log的位置
        if (path.node.callee.object.name === 'console') {
            console.log(path.node.loc)
        }
    }
}
traverse.default(ast, visitor);

// 修改AST
const visitorUpdate = {
    VariableDeclaration(path) {
        const node = path.node;
        if (node.isNew) {
            return;
        }
        if (node.kind === 'var') {
            const newNode = template.statement('var now = Date.now();')();
            newNode.isNew = true;
            path.insertBefore(newNode);
            path.skip();
        }
    }
}
traverse.default(ast, visitorUpdate);

// 输出代码:
const result = generator.default(ast);
console.log("");
console.log("::修改后的code:");
console.log(result.code)
console.log("");

// 重新输出位置信息, 位置信息并没有变
traverse.default(ast, visitor);