"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
function main() {
    // const inputPath = 'input.txt'
    var inputPath = 'input-test.txt';
    var data = fs_1.default.readFileSync(inputPath);
}
main();
