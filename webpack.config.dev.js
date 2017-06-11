import webpack from 'webpack';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export default {
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  noInfo: false,
  entry: {
    weather_js: [
      'eventsource-polyfill', // necessary for hot reloading with IE
      'webpack-hot-middleware/client?reload=true',
      path.resolve(__dirname, 'src/index.js'), // note that it reloads the page if hot module reloading fails.
    ],
  },
  target: 'web',
  output: {
    path: `${__dirname}/dist`, // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: '[name].js',
  },
  devServer: {
    contentBase: './src',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'WEATHER_KEY': `"${process.env.WEATHER_KEY}"`,
        'GOOGLE_KEY': `"${process.env.GOOGLE_KEY}"`,
        'USER_NAME': `"${process.env.USER_NAME}"`,
        'PASSWORD': `"${process.env.PASSWORD}"`,
        'SECRET_KEY': `"${process.env.SECRET_KEY}"`,
        'API_KEY': `"${process.env.API_KEY}"`,
      },
    }),
  ],
  module: {
    loaders: [
      { test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel'] },
      { test: /(\.css)$/, loaders: ['style', 'css'] },
      {
        test: /\.less$/,
        // Use local CSS modules
        loaders: ['style?insertAt=top', 'css?sourceMap&modules&importLoaders=1', 'less-loader?sourceMap'],
        include: path.resolve(__dirname, 'src'),
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
    ],
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};
