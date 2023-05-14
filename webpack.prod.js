const path = require('path');
const config = require('./webpack.config');
const glob = require("glob")
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin")
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')

module.exports = merge(config, {
	mode: 'production',
	output: {
		path: path.resolve(__dirname, 'bundle'),
		filename: '[name].[contenthash].js',
		assetModuleFilename: 'img/[hash][ext]',
		clean: true,
	},
	optimization: {
		minimizer: [
			`...`,
			new CssMinimizerPlugin(),
			new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.sharpMinify,
        },
      }),
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'style.[contenthash].css',
		}),
		new PurgeCSSPlugin({
			paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`, { nodir: true })
		})
	],
});
