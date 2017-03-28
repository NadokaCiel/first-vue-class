var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: process.env.NODE_ENV === 'production' ? '/dist/' : '/dist/',
    filename: process.env.NODE_ENV === 'production' ? 'build.[hash:4].js' : 'build.js',
    chunkFilename: "[name].[hash:4].min.js"
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue',
      options: {
        postcss: [
          require('precss')(),
          require('autoprefixer')()
        ]
      }
    }, {
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(scss|sass)$/,
      loader: 'style-loader!css-loader!sass-loader'
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file'
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file',
      options: {
        limit: 10000,
        name: '[name].[ext]?[hash]'
      }
    }]
  },
  resolve: {
    alias: {
      // 'vue$': 'vue/dist/vue'
      'vue$': process.env.NODE_ENV === 'production' ? 'vue/dist/vue.min' : 'vue/dist/vue'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}