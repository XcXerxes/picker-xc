const webpack=require("webpack");
const WebpackHtmlPlugin=require("webpack-html-plugin");

module.exports={
    entry:__dirname+"/src/index.js",
    output:{
        filename:"bundle.js",
        path:__dirname+"/public"
    },
    module:{
        loaders:[
            {
                test:/\.js$/,
                loader:"babel",
                exclude:/node_modules/
            },
            {
                test:/\.css$/,
                loader:"style!css!postcss"
            }
        ]
    },
    devServer:{
      contentBase:"./public"  
    },
    postcss:[
        require("autoprefixer")({ browsers: ['last 10 versions'] })
    ],
    plugins:[
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
    ]
}