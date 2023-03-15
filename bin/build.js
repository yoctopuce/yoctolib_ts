"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const fs = __importStar(require("fs"));
const semver = __importStar(require("semver"));
const ts = __importStar(require("typescript"));
const child_process_1 = require("child_process");
const Examples = {
    example_html: 'app.ts',
    example_nodejs: 'demo.ts'
};
function makeIndex() {
    // generate a source file index that includes support for all Yoctopuce functions
    let ts_index = 'export * from \'./yocto_api_nodejs.js\';\n';
    fs.readdirSync('src').forEach(function (mod) {
        if (mod.length > 3 && mod.slice(-3) == '.ts' && mod != 'index.ts' && mod.indexOf('yocto_api') < 0) {
            ts_index += 'export * from \'./' + mod.slice(0, -3) + '.js\';\n';
        }
    });
    fs.writeFileSync('src/index.ts', ts_index, 'utf-8');
    console.log('source index files have been updated');
}
function patchVersionInFile(newver, str_filename) {
    let pattern = '/* version number patched automatically */';
    let jsFile = fs.readFileSync(str_filename);
    let pos = jsFile.indexOf(pattern);
    if (pos < 0) {
        console.log('*** Warning, cannot patch ' + str_filename + ', pattern not found !');
    }
    else {
        pos += pattern.length;
        let endMark = jsFile.indexOf(';', pos);
        let patch = "'" + newver + "'";
        let res = Buffer.alloc(pos + patch.length + jsFile.length - endMark);
        jsFile.copy(res, 0, 0, pos);
        res.write(patch, pos);
        jsFile.copy(res, pos + patch.length, endMark);
        fs.writeFileSync(str_filename, res);
    }
}
function setVersion(str_newver) {
    // update version number is package.json
    let json = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    let newver;
    console.log('Was at version ' + json.version);
    if (str_newver) {
        // argument is new version number
        newver = semver.clean(str_newver);
    }
    else {
        // bump local revision number
        newver = semver.inc(json.version, 'prerelease', 'dev');
    }
    if (!newver) {
        console.log('Invalid version number: ' + process.argv[2]);
        process.exit(1);
    }
    console.log('Now at version ' + newver);
    json.version = newver;
    fs.writeFileSync("package.json", JSON.stringify(json, null, 2), 'utf-8');
    // Update ESM package.json as well
    let esmjson = JSON.parse(fs.readFileSync('dist/esm/package.json', 'utf8'));
    esmjson.version = newver;
    fs.writeFileSync('dist/esm/package.json', JSON.stringify(esmjson, null, 2), 'utf-8');
    // Update CJS package.json as well
    let cjsjson = JSON.parse(fs.readFileSync('dist/cjs/package.json', 'utf8'));
    cjsjson.version = newver;
    fs.writeFileSync('dist/cjs/package.json', JSON.stringify(cjsjson, null, 2), 'utf-8');
    // update version number in yocto_api.ts
    patchVersionInFile(newver, 'src/yocto_api.ts');
}
function checkExamples() {
    for (let dir in Examples) {
        fs.readdirSync(dir).forEach(function (exdir) {
            let file = dir + '/' + exdir + '/' + Examples[dir];
            if (fs.existsSync(file)) {
                console.log('Checking ' + file);
                let pkgjson = dir + '/' + exdir + '/package.json';
                let modules = dir + '/' + exdir + '/node_modules';
                if (fs.existsSync(pkgjson) && !fs.existsSync(modules)) {
                    child_process_1.execSync('cd ' + dir + '/' + exdir + ' && npm install', { stdio: [0, 1, 2] });
                }
                const options = {
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
                host.writeFile = ((fileName, contents) => { });
                let program = ts.createProgram([file], options, host);
                let emitResult = program.emit();
                let allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
                allDiagnostics.forEach(diagnostic => {
                    if (diagnostic.file) {
                        let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
                        let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
                        console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
                    }
                    else {
                        console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
                    }
                });
                if (emitResult.emitSkipped) {
                    console.error('ERROR: TypeScript example ' + exdir + ' failed to compile');
                }
            }
        });
    }
}
function cleanExamples() {
    for (let dir in Examples) {
        fs.readdirSync(dir).forEach(function (exdir) {
            let file = dir + '/' + exdir + '/' + Examples[dir];
            if (fs.existsSync(file)) {
                let jsfile = file.replace('.ts', '.js');
                let jsmapfile = file.replace('.ts', '.js.map');
                let pkglock = dir + '/' + exdir + '/package-lock.json';
                let modules = dir + '/' + exdir + '/node_modules';
                if (fs.existsSync(jsmapfile)) {
                    fs.unlinkSync(jsmapfile);
                }
                if (fs.existsSync(jsfile)) {
                    fs.unlinkSync(jsfile);
                }
                if (fs.existsSync(pkglock)) {
                    fs.unlinkSync(pkglock);
                }
                if (fs.existsSync(modules)) {
                    console.log('Cleaning ' + modules);
                    fs.rmSync(modules, { recursive: true });
                }
            }
        });
    }
}
let args = process.argv.slice(2);
if (args.length == 0) {
    console.log("argument expected: build");
}
else {
    switch (args[0]) {
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
//# sourceMappingURL=build.js.map