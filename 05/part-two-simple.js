"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function getAllIds(data) {
    var ranges = data.split('\r\n').map(function (x) { return x.split('-', 2).map(function (x) { return +x; }); });
    var gather = new Set();
    for (var _i = 0, ranges_1 = ranges; _i < ranges_1.length; _i++) {
        var range = ranges_1[_i];
        var start = range[0];
        var stop_ = range[1];
        for (var i = start; i <= stop_; i++) {
            gather.add(i);
        }
    }
    return gather;
}
function main() {
    var data = fs.readFileSync('input.txt', 'utf8').split('\r\n\r\n')[0];
    // const data = fs.readFileSync('input-test.txt', 'utf8');
    var result = getAllIds(data);
    console.log(result.size);
}
main();
//# sourceMappingURL=part-two-simple.js.map