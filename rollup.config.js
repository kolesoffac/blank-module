import eslint from 'rollup-plugin-eslint';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-js';
import progress from 'rollup-plugin-progress';
import inject from 'rollup-plugin-inject';
import json from 'rollup-plugin-json';
import path from 'path';
import babel from 'rollup-plugin-babel';
import cleanup from 'rollup-plugin-cleanup';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import css from 'rollup-plugin-css-only'

export default {
	entry: 'src/main.js',
	dest: 'build/' + (process.env.BUILD_MODE === 'production'?'moduleName.min.js':'moduleName.js'),
	format: 'umd',
	moduleName: 'moduleName',
	plugins: [

		cleanup(),
		json({
			//include: 'node_modules/**',  // Default: undefined
			//exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],  // Default: undefined
			//preferConst: true, // Default: false
		}),
		resolve({
			jsnext: true,
			main: true,
			browser: true
		}),
		commonjs(),
		babel({
			exclude: 'node_modules/**',
		}),
		(process.env.BUILD_MODE === 'eslint' && eslint({
			exclude: [
				'src/styles/**',
			]
		})),
		replace({
			exclude: 'node_modules/**',
			ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
		}),
		(process.env.BUILD_MODE === 'production' && uglify({}, minify)),
		progress({
			//clearLine: false // default: true
		}),
		inject({
			// control which files this plugin applies to
			// with include/exclude
			include: 'src/**/*.js',
			exclude: 'node_modules/**',

			// /* all other options are treated as modules...*/

			// // use the default – i.e. insert
			// // import $ from 'jquery'
			// $: 'jquery',

			// // use a named export – i.e. insert
			// // import { Promise } from 'es6-promise'
			//Promise: [ 'es6-promise', 'Promise' ],

			// // use a namespace import – i.e. insert
			// // import * as fs from 'fs'
			// fs: [ 'fs', '*' ],

			// // use a local module instead of a third-party one
			// 'Object.assign': path.resolve( 'src/helpers/object-assign.js' ),

			/* ...but if you want to be careful about separating modules
				 from other options, supply `options.modules` instead */

			modules: {
				//CONSTS: path.resolve('src/other/consts.js'),
				utils: path.resolve('src/other/utils.js'),
			}
		})
	]
};