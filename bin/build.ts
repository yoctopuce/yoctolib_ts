// This script is intended to be used from the package root (lib directory), from npm scripts.
//
// Usage:
//
//   npm run build
//   => bump version number to next pre-release suffix and update index.js
//
//   npm run build -- 1.10.21818
//   => set official version number and update index.js
//
import * as fs from 'fs';
import * as semver from 'semver';
import * as ts from 'typescript';
import { execSync } from 'child_process';

const Examples: {[dir:string]:string} = {
    example_html: 'app.ts',
    example_nodejs: 'demo.ts'
};

function makeIndex()
{
    // generate a source file index that includes support for all Yoctopuce functions
    let ts_index: string = 'export * from \'./yocto_api_nodejs.js\';\n';
    fs.readdirSync('src').forEach(function (mod: string) {
        if (mod.length > 3 && mod.slice(-3) == '.ts' && mod != 'index.ts' && mod.indexOf('yocto_api') < 0) {
            ts_index += 'export * from \'./' + mod.slice(0, -3) + '.js\';\n';
        }
    });
    fs.writeFileSync('src/index.ts', ts_index, 'utf-8');
    console.log('source index files have been updated')
}

function patchVersionInFile(newver: string, str_filename: string)
{
    let pattern: string = '/* version number patched automatically */';
    let jsFile: Buffer = fs.readFileSync(str_filename);
    let pos: number = jsFile.indexOf(pattern);
    if(pos < 0) {
        console.log('*** Warning, cannot patch '+ str_filename+', pattern not found !');
    } else {
        pos += pattern.length;
        let endMark: number = jsFile.indexOf(';', pos);
        let patch: string = "'" + newver + "'";
        let res: Buffer = Buffer.alloc(pos + patch.length + jsFile.length-endMark);
        jsFile.copy(res, 0, 0, pos);
        res.write(patch, pos);
        jsFile.copy(res, pos + patch.length, endMark);
        fs.writeFileSync(str_filename, res);
    }
}

function setVersion(str_newver: string)
{
    // update version number is package.json
    let json: { version: string } = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    let newver: string | null;
    console.log('Was at version ' + json.version);
    if (str_newver) {
        // argument is new version number
        newver = semver.clean(str_newver);
    } else {
        // bump local revision number
        newver = <string>semver.inc(json.version, 'prerelease', 'dev');
    }
    if (!newver) {
        console.log('Invalid version number: ' + process.argv[2]);
        process.exit(1);
    }
    console.log('Now at version ' + newver);
    json.version = newver;
    fs.writeFileSync("package.json", JSON.stringify(json, null, 2), 'utf-8');

    // Update ESM package.json as well
    let esmjson: { version: string } = JSON.parse(fs.readFileSync('dist/esm/package.json', 'utf8'));
    esmjson.version = newver;
    fs.writeFileSync('dist/esm/package.json', JSON.stringify(esmjson, null, 2), 'utf-8');

    // Update CJS package.json as well
    let cjsjson: { version: string } = JSON.parse(fs.readFileSync('dist/cjs/package.json', 'utf8'));
    cjsjson.version = newver;
    fs.writeFileSync('dist/cjs/package.json', JSON.stringify(cjsjson, null, 2), 'utf-8');


    // update version number in yocto_api.ts
    patchVersionInFile(newver, 'src/yocto_api.ts');
}

function checkExamples()
{
    for(let dir in Examples) {
        fs.readdirSync(dir).forEach(function (exdir: string) {
            let file: string = dir+'/'+exdir+'/'+Examples[dir];
            if(fs.existsSync(file)) {
                console.log('Checking '+file);
                let pkgjson: string = dir+'/'+exdir+'/package.json';
                let modules: string = dir+'/'+exdir+'/node_modules';
                if(fs.existsSync(pkgjson) && !fs.existsSync(modules)) {
                    execSync('cd '+dir+'/'+exdir+' && npm install', {stdio:[0,1,2]});
                }
                const options: ts.CompilerOptions = {
                    noEmitOnError: true,
                    noImplicitAny: true,
                    target: ts.ScriptTarget.ES5,
                    module: ts.ModuleKind.CommonJS,
                    strict: true,
                    allowSyntheticDefaultImports: true,
                    esModuleInterop: true,
                    skipLibCheck: true
                };
                const host = ts.createCompilerHost(options);
                host.writeFile = ((fileName: string, contents: string) => {});
                let program = ts.createProgram([file], options, host);
                let emitResult = program.emit();
                let allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
                allDiagnostics.forEach(diagnostic => {
                    if (diagnostic.file) {
                        let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
                        let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
                        console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
                    } else {
                        console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
                    }
                });
                if(emitResult.emitSkipped) {
                    console.error('ERROR: TypeScript example '+exdir+' failed to compile')
                }
            }
        });
    }
}

function cleanExamples()
{
    for(let dir in Examples) {
        fs.readdirSync(dir).forEach(function (exdir: string) {
            let file: string = dir+'/'+exdir+'/'+Examples[dir];
            if(fs.existsSync(file)) {
                let jsfile: string = file.replace('.ts','.js');
                let jsmapfile: string = file.replace('.ts','.js.map');
                let pkglock: string = dir+'/'+exdir+'/package-lock.json';
                let modules: string = dir+'/'+exdir+'/node_modules';
                if(fs.existsSync(jsmapfile)) {
                    fs.unlinkSync(jsmapfile);
                }
                if(fs.existsSync(jsfile)) {
                    fs.unlinkSync(jsfile);
                }
                if(fs.existsSync(pkglock)) {
                    fs.unlinkSync(pkglock);
                }
                if(fs.existsSync(modules)) {
                    console.log('Cleaning '+modules);
                    fs.rmSync(modules, { recursive: true });
                }
            }
        });
    }
}

let args: string[] = process.argv.slice(2);
if(args.length == 0) {
    console.log("argument expected: build")
} else {
    switch(args[0]) {
        case "newbuild":
            setVersion(args[1]);
            makeIndex();
            break;
        case "checkExamples":
            checkExamples();
            break;
        case "cleanExamples":
            cleanExamples();
            break;
    }
}

