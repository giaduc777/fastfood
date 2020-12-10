const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: 'bundle.js'
    },
    mode: 'development',
   
    serve: {
        content: path.resolve(__dirname, "dist")
      },
    module: {
      rules: [
          {
            test: /\.module\.s(a|c)ss$/,
            use: [
                  //isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                  MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                      modules: true,
                      //sourceMap: isDevelopment
                  }
                }, 
                {
                    loader: 'sass-loader',
                    options: {
                      //sourceMap: isDevelopment
                    }
                }
            ]
          },
          {
            test: /\.s(a|c)ss$/,
            exclude: /\.module\.(s(a|c)ss)$/,
            use: [
                  //isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                  MiniCssExtractPlugin.loader,
                  'css-loader', 
                {
                    loader: 'sass-loader',
                    options: {
                      //sourceMap: isDevelopment
                    }
                }
            ]
          },
          {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              loader: ['babel-loader']
          },
          {
              test: /\.(jpeg|jpg|png)$/,
              use: [
                {
                  loader: 'url-loader?name=app/images/[name].[ext]'
                }
              ]
            }
      ]
      
    },
    resolve: {
      extensions: ['.js', '.jsx', '.scss']
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "styles.css"
      })
    ]
}