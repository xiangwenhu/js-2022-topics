const { declare } = require('@babel/helper-plugin-utils');

const plugin = declare((api, options, dirname) => {
    api.assertVersion(7);

    const { variables } = options;

    const variablesPropertiesMap = {};

    return {

        visitor: {

            Program: {
                enter(path) {
                    console.log('enter Program!')
                },
                exit(path) {
                    console.log('exit Program!', variablesPropertiesMap);

                    // 查找到对象，并删除不使用的属性
                    path.traverse({
                        VariableDeclarator(path) {
                            const { node } = path;
                            const name = node.id.name;

                            // 检查是否在白名单
                            if (variables.includes(name)) {
                                const usedProperties = variablesPropertiesMap[name] || [];
                                const properties = node.init.properties;

                                // 删除未使用的属性
                                for (let index = properties.length - 1; index >= 0; index--) {
                                    const pName = properties[index].key.name;
                                    if(!usedProperties.includes(pName)){
                                        properties.splice(index, 1)
                                    }
                                }
                            }
                        }
                    })
                }
            },

            MemberExpression(path) {
                const { node } = path;
                const variableName = node.object.name;

                // 记录已经使用的属性
                if (variables.includes(variableName)) {
                    const variableProperty = node.property.name;
                    if (!variablesPropertiesMap[variableName]) {
                        variablesPropertiesMap[variableName] = [];
                    }
                    variablesPropertiesMap[variableName].push(variableProperty);
                }
            },
        }
    };
});

module.exports = plugin;