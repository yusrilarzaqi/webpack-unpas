# Bejalar Webpack WPU

## 1. JavaScript Module System

### Module System (membuat aplikasi yang modular)

1. **Reusability**. Module bisa digunakan kembali oleh bagian program lain, atau bisa menjadi package untuk app lain.
2. **Isolation**. Satu modul mengerjakan hanya hal yang spesifik saja.
3. **Organization**. Kemudahan pengolalaan aplikasi secara keseluruhan.

### Module System pada JavaScript

- 1995 - 2000 (**NO** Module System)
- 2000 - 2010 (**IIFE** _Immediately Invoked Function Expression_)
- 2010 - 2015 (CommonJS)
- 2015 - now (**ES6** Modules)

#### No Modules

**Sebelum ada module**

- Harus membuat fungsi pembungkus / _wrapper function_.
- Agar memiliki scope, sehingga tidak ada global variable.
- Tetap muncul function wrapper yang bisa diakes secara global.
- Kurang reusable.
- Masalah pengelolaan dependency.

```javascript
var users = ['Yusril', 'Bimo', 'Adam'];

function getUsers() {
	return users;
}
```

---

```javascript
function usersWrapper() {
	var users = ['Yusril', 'Bimo', 'Adam'];

	function getUsers() {
		return users;
	}

	app.getUsers = getUsers;
}

usersWrapper();
```

#### IFFFE _Invoked Function Expression_

- Tidak perlu membuat nama function.
- Tidak perlu menjalankan function.
- Tidak ada funcion yang bisa diakses secara global.
- Harus ditulis disetiap modlue.
- Masih bukan module system.

```javascript
(function () {
	var users = ['Yusril', 'Bimo', 'Adam'];

	function getUsers() {
		return users;
	}
});
```

#### CommonJS

Module formatting system

- Menggunakan keyword `module.exports` dan `require()`.
- Di terapkan di dalam **nodeJS**.
- Butuh **module bundler** jika ingin dijalankan di browser.

`users.js`

```javascript
var users = ['Yusril', 'Bimo', 'Adam'];

function getUsers() {
	return users;
}

module.exports = getUsers;
```

---

`app.js`

```javascript
var getUser = require('./users');

getUsers(); //  ["Yusril", "Bimo", "Adam"]
```

#### ES6 Module

ECMAScript Harmony

- Menggunakan keyword `exports` dan `import`.
- Asinkronus.
- Tidak butuh module bundler jika ingin dijalankan di browser.
- Tambahkan `type="module"` saat pemanggilan script.

`users.js`

```javascript
var getUser = require('./users');

export function getUsers() {
	return getUser;
}
```

---

`app.js`

```javascript
import { getUsers } from './users';

getUsers(); //  ["Yusril", "Bimo", "Adam"]
```

---

`index.html`

```html
<script type="module" src="app.js"></script>
```

## Apa itu Webpack (belajar Webpack)

### Module Bundler

Sebuah tool yang mengambil code-code javascript yang kita gunakan (berserta dengan dependency-nya) dan mem-_bundle_ / menggabungkan-nya menjadi sebuah file (biasanya untuk digunakan digunakan di browser)

[Module Bundler](https://www.freecodecamp.org/news/lets-learn-how-module-bundlers-work-and-then-write-one-ourselves-b2e3fe6c88ae/)

### Benefit Module Bundler

- Melakukan penggabungan dan pengelolaan _dependencies_ secara otomatis.
- Bahkan melakukan _minify_ / _uglify_ terhadap file agar ukurannya menjadi semakin kecil.

### Macam-macam Module Bundler

- [browserify](browserify.org)
- [webpack](webpack.js.org)
- [rollupjs](rollupsjs.org)
- [parceljs](parceljs.org)
- [snowpack](snowpack.dev)
- [vitejs](vitejs.dev)

### Kekurangan Webpack

- slow

### Fitur Webpack

- Dependency management.
- Hot module replacement.
- Caching.
- Supported modules: ES Modules, CommonJS, AMD Modules.
- Transpile older JS.
- Bundle CSS & Image.
- Asset optimization.
- Increase development productivity & experience.

### Komponen Konfigurasi Webpack

- Entry
- Output
- Mode
- Loaders
- Plugins
- Browser Compatibility

## 3.Webpack Custom Configuration

[webpack.config.js](./belajar-webpack-code/webpack.config.js)

```javascript
const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'bundle'),
		filename: 'index.js',
	},
	watch: true,
	devtool: false,
};
```

## 4.Loaders (Webpack Loaders)

Melakukan bundle pada sumberdaya statis selain javascript.

[Loaders](webpack.js.org/loaders)

## 5.Cache, Plugins & Tools

### Caching

> Sebuah teknik untuk menyimpan data di dalam komponen hardware atau software, dilakukan agar request (berikutnya) untuk data tersebut terjadi dengan lebih cepat
> [caching](https://webpack.js.org/guides/caching)

So we're using webpack to bundle our modular application which ields a deployable `/dist` directory.
Once the contents of `/dist` have been deployed to a server, client (typically browsers) will hit that server to grap to site and its assets.
The last step can be time consuming, which is why browsers use a technique called [caching](https://webpack.js.org/guides/caching).
This allwes sites to load faster with less unnecessary network traffic.
However, it can also cause headaches when you neeed new code to be picked up.

#### Output Filenames

We can use the `output.filename` [substitutions](https://webpack.js.org/configuration/output/#outputfilename) setting to define the names of our output files.
Webpack provides a method of templating the filenames using bracketd strings called **subsitutions**.
The `[contenthash]` substitution will add a unique hash based on t econtent of an asset.
When the asset's content changes, `[contenthash]` will change as well.

### HtmlWebpackPlugin (Easily created HTML files to serve your bundles)

**Instalation**

`npm install --save-dev html-webpack-plugin`

**Basic Usage**

The plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using `script` tags. Add the plugin to your webpack configuration as follows.

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	entry: 'index.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'index_bundle.js',
	},
	plugins: [new HtmlWebpackPlugin()],
};
```

### Webpack Merge

**Instalation**

`npm i webpack-merge`

**Usage**

`webpack.dev.js`

```javascript
const path = require('path');
const config = require('./webpack.config');
const { merge } = require('webpack-merge');

module.exports = merge(config, {
	mode: 'development',
	output: {
		path: path.resolve(__dirname, 'bundle'),
		filename: 'script.js',
		clean: true,
	},
	watch: true,
});
```

## 6.Asset Management

### MiniCssExtractPlugin

This plugin extract CSS into separate files.
It creates a CSS file per JS file which contains CSS.
It supports **On-demand-Loading** of CSS and SourceMaps.

### Plugin `webpack-dev-server` API

`webpack-dev-server` provides a Node.js API which can be used directly in Node.js runtime.

**Installation**

`npm install webpack-dev-server --save-dev`

### DevServer

`webpack.config.js`

```javascript
const path = require('path');

module.exports = {
	devServer: {
		static: {
			directory: path.join(__dirname, 'public'),
		},
		compress: true,
		port: 8080,
	},
};
```

### Asset Modules

### Resource Asset

`webpack.config.js`

```javascript
module.exports = {
	// ...
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|svg|giv)/i,
				type: 'asset/resource',
			},
		],
	},
	// ...
};
```

---

`webpack.dev.js`

```javascript
module.exports = {
	// ...
	output: {
		// ...
		assetModuleFilename: 'img/[name][ext]',
		// ...
	},
	// ...
};
```

---

`webpack.prod.js`

```javascript
module.exports = {
	// ...
	output: {
		// ...
		assetModuleFilename: 'img/[name].[hash][ext]',
		// ...
	},
	// ...
};
```

## Code Splitting

Code splitting is one of the most compelling features of webpack.
This feature allows you to split your code into various bundles which can then be loaded on demand or in parallel.
It can be used to achieve smaller bundles and control resource load prioritization which, if used correctly, can have a major impact on load time.

There are three general approaches to code splitting available:

- **Entry Points**: Manually split code using [`entry`](https://webpack.js.org/configuration/entry-context)
- **Prevent Duplication**: Use [Entry dependencies](https://webpack.js.org/configuration/entry-context/#dependencies) or [`SplitChinksPlugin`](https://webpack.js.org/plugins/split-chunks-plugin/) to dedupe and split chinks.
- **Dynamic Imports**: Split code via inline function calls within modules.

### Entry Points

`src/vendor.js`

```javascript
import * as bootstrap from 'bootstrap';
```

---

`webpack.config.js`

```javascript
module.exports = {
	entry: {
		main: './src/index.js',
		vendor: './src/vendor.js',
	},
};
```

---

`webpack.dev.js`

```javascript
module.exports = {
	output: {
		filename: '[name].js',
	},
};
```

---

`webpack.prod.js`

```javascript
module.exports = {
	output: {
		filename: '[name].[hash].js',
	},
};
```

### Prevent Duplication

The [`dependOn`](https://webpack.js.org/configuration/entry-context/#dependencies) [option](https://webpack.js.org/configuration/entry-context/#dependencies) allows to share the modules between the chunks:

`webpack.config.js`

```javascript
module.exports = {
	// ....
	entry: {
		index: {
			import: 'src/index.js',
			depenOn: 'shared',
		},
		vendor: 'src/vendor.js',
		hello: {
			import: 'src/hello.js',
			depenOn: 'shared',
		},
		shared: 'lodash',
	}
	// ....
}
```

### `SplitChunksPlugin`

Originally, chunks (and modules imported inside them) were connected by a parent-child relationship in the internal webpack graph.
The `CommonsChunkPlugin` was used to avoid duplicateed dependencies across them, but further optimizations were not possible.

The [`SplitChunksPlugin`](https://webpack.js.org/plugins/split-chunks-plugin/) allows us to extract common dependencies into an existing entry chink or an entirely new chunk.
Let's use this to de-duplicate the `lodash` dependency from the previous example:

`webpack.config.js`

```javascript
module.exports = {
	// ....
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	}
	// ....
}
```

## 8.Minimizer

### `CssMinimizerWebpackPlugin`

This plugin uses [`cssnano`](https://cssnano.co/) to optimze any minify.

`webpack.prod.js`

```javascript
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
	// ...
	optimization: {
		// ...
		minimizer: [
			`...`,
			new CssMinimizerPlugin(),
		]
		// ...
	}
	// ...
}
```

### `PurgeCSSPugin`

```javascript
const glob = rqeuire('glob')
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin")

module.exports = {
	// ...
	plugins: [
		// ...
		new PurgeCSSPlugin({
			paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`, { nodir: true })
		})
		// ...
	],
	// ...
}
```

### `ImageMinimizerWebpackPlugin`

[`squoosh`](https://github.com/GoogleChromeLabs/squoosh/tree/dev/libsquoosh) - While working in experimenal mode with `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif` file types.

`npm i image-minimizer-webpack-plugin @squoosh/lib -D`

`webpack.prod.js`

```javascript
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')

new ImageMinimizerPlugin({
  minimizer: {
    implementation: ImageMinimizerPlugin.squoosshminify,
  },
}),
```

##
