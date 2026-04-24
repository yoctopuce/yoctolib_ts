Typescript HTML WebApp project boilerplate
==========================================

## What is this project good for ?

Unlike JavaScript, using TypeScript to write a web application requires a *transpilation*
step before the code can be used in an HTML page. Furthermore, if the source code consists of 
multiple files or modules, a *bundler* is typically used to resolve the dependencies 
between modules. All these tools must be configured correctly to work together, and it’s 
easy to waste time setting up the structure when starting a new project.

This small example project is intended to provide a ready-to-use basic structure that meets 
the criteria we consider most important:
- **Convenient**: a single click should be enough test a code change;
- **Lightweight**: the project should be simple and minimize external dependencies;
- **Interoperable**: the project should allow the integration of external libraries, 
  integrated either via source files or via a package manager; 
- **Portable**: the project must not require a specific version of Node.js or TypeScript, 
  but must work with all versions supported for at least the past 5 years.

## Setting up the development environment

### ... on recent operating systems (Windows 10+, Linux, etc.)

To use this template project, you should first install [Node.js](https://nodejs.org/en/download) version 22 or higher.
- On a 32-bit OS, use Node.js version 22 (last version with 32-bit support)
- On a 64-bit OS, you can use Node.js 24 or later

### ... on Windows 7

To use this template project on Windows 7, you should install [Node.js](https://nodejs.org/dist/v12.22.12/node-v12.22.12-x64.msi) version 12, the last supported (LTS) version of node.js on Windows 7.

For Windows 7, you should also edit the `package.json` to file to prevent using the latest version of `esbuild` which would not work on Windows 7.
In order to do so, change the dependencies to:
```
"@types/node": "^12.0.0",
"esbuild": "0.21.5",
"typescript": "5.0.4"
```

### After installing Node.js
Once node.js is installed on your machine, open a command shell in this directory and run:
```	
npm install 
```
This will install the project dependencies, namely the TypeScript compiler and `esbuild` bundler.

> 📌 In case you come across dozens of warnings while `esbuild` package installs, make sure you are using
the proper version of Node.js as recommended above, and that you did apply the changes to 
`packages.json` if you intend to use Node version 12. In that specific case, the `esbuild` package
will still issue some warnings on install, but they will not prevent `esbuild` from working properly. 

## How to test the application ?

```   
npm run app-server
```
This command will:
1. build the project
2. start a tiny Web server (see [tools/README.md](tools/README.md)) for testing
3. open a Web browser and start the application from the tiny Web server
4. watch TypeScript source files to incrementally rebuild the application whenever a source file changes

So when you perform any change to the source code, all you have to do is to save the TypeScript file
and press reload on the Web browser. The *watcher* will take care of recompiling the application under the hood.

## How to build the project using a command-line ?

The following command will fully rebuild the application from TypeScript source files: 
```   
npm run build
```
Once done, you will find the distribution files in the `dist/` subdirectory.

You can then upload them to any Web server, or to your favorite YoctoHub.

## Project structure

| path            | description                                 |
|:----------------|:--------------------------------------------|
| `dist/**`       | distribution folder (runtime files)         |
| `obj/**`        | individual transpiled files                 |                                      
| `src/**`        | full source code (TypeScript)               |                                     
| `tools/**`      | development tools for this project          |                                    
| `package.json`  | project description, including dependencies |
| `tsconfig.json` | global TypeScript settings file             |
| `README.md`     | this file                                   |

The top-level entry point for the web app is the file `dist/app.html`.
For more details on this file and other global static files,
see [dist/README.md](dist/README.md).

For more details on the individual source code files, see [src/README.md](src/README.md).

If you need to integrate a third-party library to the project via a
package manager, you can use the usual `npm install ...` command.
The package will then be automatically integrated as needed by the bundler.

> ⚠️ Note: To illustrate this, we have intentionally added a dependency to `uuid` 
library. This library is however not really needed for the project 
compilation framework, so make sure to uninstall it to avoid keeping 
it unnecessarily in your final project !
