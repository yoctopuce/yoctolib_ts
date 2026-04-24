Development tools folder
========================

## What is this development tool good for ?

This folder provides a small script that simplifies the TypeScript app development process.
More precisely, this script will:
1. build the project
2. start a tiny HTTP server
3. open a Web browser and start the application from the tiny HTTP server
4. watch TypeScript source files to incrementally rebuild the application whenever a source file changes

So when you perform any change to the source code, all you have to do is to save the TypeScript file
and press reload on the Web browser. The *watcher* will take care of recompiling the application 
under the hood.

## How to use it ?

Simply start:
```   
npm run app-server
```

## Folder content

| file           | description                                    |
|:---------------|:-----------------------------------------------|
| app-server.ts  | TypeScript source file for the tiny web server | 
| tsconfig.json  | TypeScript compiler settings for this tool     | 
| README.md      | This file                                      |

The two files below are generated when the tiny web server is started:

| file              | description                                     |
|:------------------|:------------------------------------------------|
| app-server.js     | Tiny web server, transpiled to JS for execution |
| app-server.js.map | Application map file for the tiny web server    |

For details on how to generate `app.min.js`, see the [top-level README file](../README.md) 