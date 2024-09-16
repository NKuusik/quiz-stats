const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: '/src/index.js',
    output: {
        filename: 'bundle.[fullhash].js'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]

    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: ['ts-loader']
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    'css-modules-typescript-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true
                        }
                    },
                ]
            },
            {    test: /\.scss$/,
                use: [                    
                    {
                        loader: 'sass-loader'
                    },
                    ]
        
            },   
            {
                test: /\.csv$/,
                loader: 'file-loader',
                exclude: /node_modules/
            },
            {
                test: /\.png/,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
        }),
        
    ]
};