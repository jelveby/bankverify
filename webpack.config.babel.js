import path from 'path';
import webpack from 'webpack';
// import paths from './paths.json';

module.exports = {
	entry: {
		preload: './es5/index.js'
	},
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: './dist/',
		filename: 'bankverify.min.js',
		chunkFilename: '[id].bundle.js',
		library: 'BankVerify',
    libraryTarget: 'umd',
    umdNamedDefine: true
	},
	plugins: [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin()
  ]
};
