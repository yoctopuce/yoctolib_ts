/*********************************************************************
 *
 *  $Id: app.ts 32624 2018-10-10 13:23:29Z seb $
 *
 *  Yoctopuce trivial HTTP server for testing TypeScript/HTML examples;
 *  Also runs a TypeScript watcher in background
 *
 *  You can run it using 'npm run app'
 *
 *  - When run at root of yoctolib-ts, open a browser on the full URL
 *    of the example that you want to open, eg:
 *    http://127.0.0.1:3000/example_html/Doc-Inventory/app.html
 *  - When run within a subdirectory of example_html, the server will
 *    automatically redirect to the current directory app.html
 *
 *********************************************************************/


import 'process';
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';
import * as http from 'http';
import * as childProcess from 'child_process';

const HTTP_PORT: number = 3000;
const HTTP_ROOT: string = process.cwd();
const DEMO_PATH: string = (process.env.INIT_CWD ? process.env.INIT_CWD.slice(HTTP_ROOT.length+1) : '.');
const DEMO_ROOT: string = path.join(HTTP_ROOT, DEMO_PATH);
const DEFAULT_FILE: string = path.join(DEMO_PATH, 'app.html');
const ROOT_URL: string = 'http://127.0.0.1:'+HTTP_PORT;

const MimeTypes: StringDict = {
    '.js': 'application/javascript',
    '.ts': 'application/typescript',
    '.map': 'application/json',
    '.html': 'text/html',
    '.css': 'text/css',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg'
}

interface StringDict {
    [ext: string] : string;
}

function listener(message: http.IncomingMessage, response: http.ServerResponse)
{
    let srvpath: string = url.parse(<string>message.url).pathname || '/';
    let relpath: string = srvpath.slice(1);
    let abspath: string = path.join(HTTP_ROOT, relpath);
    let extension: string = path.extname(relpath);
    let mimetype: string = MimeTypes[extension.toLowerCase()];

    // Redirect server root to our demo subdirectory
    if(!relpath) {
        response.writeHead(302, {'Location': DEFAULT_FILE, 'Content-Type': 'text/plain'});
        response.write("302 Found: ["+DEFAULT_FILE+"]");
        response.end();
        return;
    }

    // Make sure we know about this file
    //console.log('Request for ['+abspath+']');
    let fileexists: boolean = fs.existsSync(abspath);
    if(!fileexists || !mimetype) {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        if(!fileexists) {
            response.write("404 Not Found: ["+abspath+"]");
        } else {
            response.write("404 Not Found: unsupported MIME type ["+extension+"]");
        }
        response.end();
        return;
    }
    // Output file to browser at once
    response.writeHead(200, {'Content-Type': MimeTypes[extension]});
    fs.readFile(abspath, (err: any, data: Buffer) => {
        if (err) throw err;
        response.write(data, 'utf8');
        response.end();
    });
}

// TypeScript incremental watcher, from Microsoft github page
import * as ts from 'typescript';

const formatHost: ts.FormatDiagnosticsHost = {
    getCanonicalFileName: path => path,
    getCurrentDirectory: ts.sys.getCurrentDirectory,
    getNewLine: () => ts.sys.newLine
};

function reportDiagnostic(diagnostic: ts.Diagnostic) {
    console.error("Error", diagnostic.code, ":", ts.flattenDiagnosticMessageText( diagnostic.messageText, formatHost.getNewLine()));
}

function reportWatchStatusChanged(diagnostic: ts.Diagnostic) {
    console.info(ts.formatDiagnostic(diagnostic, formatHost));
}

function TypeScriptWatcher(rootdir: string)
{
    const configPath: string = path.join(rootdir, "tsconfig.json");
    const createProgram = ts.createEmitAndSemanticDiagnosticsBuilderProgram;
    const host = ts.createWatchCompilerHost(
        configPath,
        {},
        ts.sys,
        createProgram,
        reportDiagnostic,
        reportWatchStatusChanged
    );
    ts.createWatchProgram(host);
}

// Function to open an URL in the default browser, inspired from https://github.com/sindresorhus/open
function OpenBrowser(target: string)
{
    let command: string;
    let cliArguments: string[] = [];
    let childProcessOptions: any = {};
    if (process.platform === 'darwin') {
        command = 'open';
        cliArguments = [ '--background' ];
    } else if(process.platform == 'win32') {
        command = process.env.SYSTEMROOT+'\\System32\\WindowsPowerShell\\v1.0\\powershell';
        cliArguments = [ '-NoProfile','-NonInteractive','–ExecutionPolicy','Bypass','-Command','Start' ];
        childProcessOptions = { windowsVerbatimArguments: true };
    } else {
        command = 'xdg-open';
        childProcessOptions = {stdio: 'ignore', detached: true};
    }
    cliArguments.push(target);
    const subprocess = childProcess.spawn(command, cliArguments, childProcessOptions);
    subprocess.unref();
}

console.info('------------------------------------------------------------------------------------');
console.info('---         This is a small HTTP server to test your TypeScript HTML app');
console.info('---          (source code available in yoctolib-ts/bin/app-server.ts)');
console.info('---');
console.info('--- It will automatically transpile your "app.ts" file into "app.js" when changed');
console.info('---');
console.info('--- Serving files in '+DEMO_PATH+' on '+ROOT_URL);
console.info('------------------------------------------------------------------------------------');
TypeScriptWatcher(DEMO_ROOT);
http.createServer(listener).listen(HTTP_PORT);
OpenBrowser(ROOT_URL);
