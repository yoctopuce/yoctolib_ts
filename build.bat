rem log node version
node -v
rem install build dependencies
call npm install
rem compile build scripts
call npm run build_tools
rem patch build/release version
call npm run newbuild 2.0.PATCH_WITH_BUILD
rem transpile as ECMAScript module
call npm run build_esm
rem transpile as CommonJS module
call npm run build_cjs
rem check compilation of all examples
call npm run check_examples
call npm run clean_examples

