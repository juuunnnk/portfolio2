module.exports = {
    entry: ['babel-polyfill', './src/js/main.js'], // babel-polyfill はIE11などで必要
    output: {
        //path : __dirname,
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        //loadersだとエラー出た
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                compact: false
            }
        }]
    }
};