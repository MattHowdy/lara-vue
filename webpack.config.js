let webpack = require('webpack')
let path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry : {
        app : './resources/assets/js/app.js',
        vendor : ['vue', 'axios']
    },

    output : {
        path : path.resolve(__dirname, 'public/js'),
        filename : '[name].js', 
        publicPath : './public'
    },

    module : {
        rules : [
            {
            test: /\.js$/,
            exclude : /node_modules/,
            loader : 'babel-loader'
            }
        ]
    },
    resolve : {
        alias : {
            //'vue$' : 'vue/dist/vue.common.js' // for webpack1
            'vue$': 'vue/dist/vue.esm.js' 
        }
    },

    optimization: {
        minimizer: [new UglifyJsPlugin()],
      },

    plugins : [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor']
        })
    ]
}

if(process.env.NODE_ENV === 'production'){
    module.exports.plugins.push(
        // new webpack.optimize.UglifyJsPlugin({
        //     sourcemap: true,
        //     compress : {
        //         warnings : false
        //     }
        // })
        new webpack.DefinePlugin({
            'process.env' : {
                NODE_ENV : JSON.stringify('production')
            }
        })
    )
}

module.exports.plugins.push(
    new webpack.DefinePlugin({
        'process.env' : {
            NODE_ENV : 'production'
        }
        
    })
)