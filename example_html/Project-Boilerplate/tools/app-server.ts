/*********************************************************************
 *
 *  Yoctopuce trivial HTTP server for testing a TypeScript/HTML app
 *  Also runs a TypeScript watcher in background
 *
 *  You can run it using 'npm run app-server'
 *
 *********************************************************************/

import 'process';
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';
import * as http from 'http';
import * as childProcess from 'child_process';
import esbuild from 'esbuild';
import ts from 'typescript';

const HTTP_PORT: number = 3000;
const PROJECT_ROOT: string = process.cwd();
const DEFAULT_FILE: string = '/dist/app.html';
const ROOT_URL: string = 'http://127.0.0.1:'+HTTP_PORT;

const MimeTypes: StringDict = {
    '.js': 'application/javascript',
    '.ts': 'application/typescript',
    '.json': 'application/json',
    '.xml': 'application/xml',
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
    let srvpath: string = url.parse(message.url as string).pathname || '/';
    let relpath: string = srvpath.slice(1);
    let abspath: string = path.join(PROJECT_ROOT, relpath);
    let extension: string = path.extname(relpath);
    let mimetype: string = MimeTypes[extension.toLowerCase()];
    let headers: http.OutgoingHttpHeaders = { 'Content-Type': mimetype };

    // Redirect server root to the application entry point (HTML file)
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
        if(!mimetype) {
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.write("404 Not Found: unsupported MIME type ["+extension+"]");
        } else {
            response.writeHead(404, { 'Content-Type': mimetype });
            response.write("// 404 Not Found: ["+abspath+"]");
        }
        response.end();
        return;
    }
    // Output file to browser at once
    fs.readFile(abspath, (err: any, data: Buffer):void => {
        if (err) throw err;
        headers['Content-Length'] = data.length;
        response.writeHead(200, headers);
        response.write(data, 'utf8');
        response.end();
    });
}

// TypeScript incremental watcher, from Microsoft GitHub page
const formatHost: ts.FormatDiagnosticsHost = {
    getCanonicalFileName: (path:string):string => path,
    getCurrentDirectory: ts.sys.getCurrentDirectory,
    getNewLine: ():string => ts.sys.newLine
};

function reportDiagnostic(diagnostic: ts.Diagnostic): void
{
    let origin: string = 'Error';
    if(diagnostic.file) {
        const filename: string = diagnostic.file.fileName;
        origin = filename.slice(filename.indexOf('src/'));
        if(diagnostic.start) {
            const { line } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
            origin += ':' + line;
        }
    }
    console.error(origin, "-", ts.flattenDiagnosticMessageText(diagnostic.messageText, formatHost.getNewLine()));
}

function reportWatchStatusChanged(diagnostic: ts.Diagnostic): void
{
    console.log(`[build] ` + diagnostic.messageText);
}

function TypeScriptWatcher(rootdir: string): void
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
    host.afterProgramCreate = (program) => {
        const tsProgram = program.getProgram();
        const allDiagnostics = [
            ...program.getConfigFileParsingDiagnostics(),
            ...program.getGlobalDiagnostics(),
            ...tsProgram.getSourceFiles()
                .filter(f => !f.fileName.includes('.d.ts'))
                .flatMap(f => [
                    ...tsProgram.getSyntacticDiagnostics(f),
                    ...tsProgram.getSemanticDiagnostics(f),
                ])
        ];
        program.emit();
        if (allDiagnostics.length > 0) {
            allDiagnostics.forEach(reportDiagnostic);
            console.warn(`[build] Skipping bundler — ${allDiagnostics.length} TypeScript error(s) found.`);
            return;
        }
        esbuild.build({
            entryPoints: [ 'obj/app.js' ],
            bundle: true,
            minify: true,
            outfile: 'dist/app.min.js',
            target: 'es2017',
            format: 'esm',
            keepNames: true,
            sourcemap: true
        }).then(() => {
            console.log(`[build] Bundle ready.`);
        });
    };
    ts.createWatchProgram(host);
}

// Function to open a URL in the default browser, inspired from https://github.com/sindresorhus/open
function OpenBrowser(target: string): void
{
    let command: string;
    let cliArguments: string[] = [];
    let childProcessOptions: any = {};
    if (process.platform === 'darwin') {
        command = 'open';
        cliArguments = [ '--background' ];
    } else if(process.platform === 'win32') {
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
console.info('---                   (source code available in bin/app-server.ts)');
console.info('---');
console.info('--- Serving files in '+PROJECT_ROOT+' on '+ROOT_URL);
console.info('------------------------------------------------------------------------------------');
TypeScriptWatcher(PROJECT_ROOT);
http.createServer(listener).listen(HTTP_PORT);
let args: string[] = process.argv.slice(2);
if(args.length == 0) {
    OpenBrowser(ROOT_URL);
} else {
    OpenBrowser(ROOT_URL + '/' + args[0]);
}
