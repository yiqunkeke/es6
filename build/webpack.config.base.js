const path = require('path');

const baseConfig = {
    mode: 'production',
    target: 'web',
    // 配置如何展示性能提示
    // 此属性默认设置为 "warning"
    performance: {
        hints: false // 例如，如果一个资源超过 250kb，webpack 会对此输出一个警告来通知你。
    },
    entry: path.join(__dirname, '../src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '../dist')
    }
};


module.exports = baseConfig;