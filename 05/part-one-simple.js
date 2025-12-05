"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function getAllValidIds(data) {
    var temp = data.split('\r\n\r\n', 2);
    var probes = temp[1].split('\r\n').map(function (x) { return +x; });
    var ranges = temp[0].split('\r\n').map(function (x) { return x.split('-', 2).map(function (x) { return +x; }); });
    var gather = [];
    for (var _i = 0, probes_1 = probes; _i < probes_1.length; _i++) {
        var id = probes_1[_i];
        for (var _a = 0, ranges_1 = ranges; _a < ranges_1.length; _a++) {
            var range = ranges_1[_a];
            var start = range[0];
            var stop_ = range[1];
            if (id >= start && id <= stop_) {
                gather.push(id);
                break;
            }
        }
    }
    return gather;
}
function main() {
    var data = fs.readFileSync('input.txt', 'utf8');
    // const data = fs.readFileSync('input-test.txt', 'utf8');
    var result = getAllValidIds(data);
    console.log(result.length);
}
main();
//# sourceMappingURL=part-one-simple.js.map