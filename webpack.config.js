var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: [
		'babel-polyfill'
		,'./src/main.js'
		,'webpack-dev-server/client?http://localhost:8080'
	]
	,plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
	,output: {
		path: path.resolve('__dirname')
		,filename: 'bundle.js'
	}
	,module: {
		loaders: [
			{
				test: /.js$/
				,loader: 'babel-loader'
				,exclude: 'node_modules'
				,query: {
					presets: ['es2015']
				}
			}
		]
	}
	,devServer: {
		port: 8080
		,hot: true
	}
}
