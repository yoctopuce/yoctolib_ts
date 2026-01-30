Yoctopuce TypeScript Library
============================

## What is this library good for ?

This library provides access to [Yoctopuce devices](https://www.yoctopuce.com) for TypeScript.
It can be used with any kind of JavaScript/EcmaScript environments, including in browsers,
in Node.js services, and with Electron or similar software.

This library handles asynchronous communication with the devices using Promise objects, 
leveraging the new EcmaScript 2017 `async` / `await` non-blocking syntax for asynchronous I/O.

You can choose to include the library
- either by adding the TypeScript source files to your project (you just need a few files)
- or by referencing the EcmaScipt Module exports, found in dist/esm
- or by referencing the CommonJS exports, found in dist/cjs
Both CommonJS and EcmaScript module directories include corresponding .d.ts definition files
and .js.map sourcemap files to facilitate development.

You can find examples in the zipped library on the [Yoctopuce web site](https://www.yoctopuce.com/EN/libraries.php)
and on [GitHub](https://github.com/yoctopuce/yoctolib_ts).


## Content of this package

* doc/

		API Reference in HTML

* examples_html/

		Directory with example programs designed to be run in a web browser

* examples_node/

		Directory with example programs designed to be run with node.js

* src/

		Source code of the library (in TypeScript)

* dist/cjs

		The library transpiled according to CommonJS module standard

* dist/esm

		The library transpiled as an ECMAScript 2015 module

* bin/

		Internal build tools

* FILES.txt

		List of files contained in this archive

* RELEASE.txt

		Release notes


## Installing the lib from NPM

This library is also published on NPM

To install the CommonJS module standard version use the yoctolib-cjs package:
````
npm install yoctolib-cjs
````

To install the ECMAScript 2015 module version use the yoctolib-esm package
````
npm install yoctolib-esm
````
## How to run examples

### nodes.js examples

To start the example you need to run ```npm install``` in the directory of the example.
then you can start the examples with:
````
npm run demo 
````


### HTML examples

In the HTML examples, there is an HTML file named app.html, and a TypeScript file app.ts. No installation is 
needed to run these examples, as the TypeScript library is referenced using a relative path. However, in order to allow 
the browser to run the code, the HTML page must be served by a Web server. We therefore provide a simple test server for
this purpose, that you can start with the command:

````
npm run app-server
````

This command compiles the TypeScript example code, makes it available via an HTTP server on port 3000, and opens a Web 
browser on this example. If you change the example source code, the TypeScript compiler is automatically triggered
to update the transpiled code and a simple page reload on the browser makes it possible to test the change.

## More help

For more details, refer to the documentation specific to each product, which
includes example code with explanations, and a programming reference manual.
In case of trouble, contact support@yoctopuce.com

Have fun !

## License information

Copyright (C) 2015 and beyond by Yoctopuce Sarl, Switzerland.

Yoctopuce Sarl (hereafter Licensor) grants to you a perpetual
non-exclusive license to use, modify, copy and integrate this
file into your software for the sole purpose of interfacing
with Yoctopuce products.

You may reproduce and distribute copies of this file in
source or object form, as long as the sole purpose of this
code is to interface with Yoctopuce products. You must retain
this notice in the distributed source file.

You should refer to Yoctopuce General Terms and Conditions
for additional information regarding your rights and
obligations.

THE SOFTWARE AND DOCUMENTATION ARE PROVIDED "AS IS" WITHOUT
WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING
WITHOUT LIMITATION, ANY WARRANTY OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. IN NO
EVENT SHALL LICENSOR BE LIABLE FOR ANY INCIDENTAL, SPECIAL,
INDIRECT OR CONSEQUENTIAL DAMAGES, LOST PROFITS OR LOST DATA,
COST OF PROCUREMENT OF SUBSTITUTE GOODS, TECHNOLOGY OR
SERVICES, ANY CLAIMS BY THIRD PARTIES (INCLUDING BUT NOT
LIMITED TO ANY DEFENSE THEREOF), ANY CLAIMS FOR INDEMNITY OR
CONTRIBUTION, OR OTHER SIMILAR COSTS, WHETHER ASSERTED ON THE
BASIS OF CONTRACT, TORT (INCLUDING NEGLIGENCE), BREACH OF
WARRANTY, OR OTHERWISE.

