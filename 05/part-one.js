"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function getAllValidIds(data) {
    var temp = data.split('\r\n\r\n', 2);
    var ranges = temp[0];
    var probes = temp[1];
    var gather = [];
    for (var _i = 0, _a = probes.split('\r\n').map(function (x) { return +x; }); _i < _a.length; _i++) {
        var id = _a[_i];
        for (var _b = 0, _c = ranges.split('\r\n'); _b < _c.length; _b++) {
            var range = _c[_b];
            // TODO do once (not each iter)
            var temp_1 = range.split('-', 2).map(function (x) { return +x; });
            var start = temp_1[0];
            var stop_ = temp_1[1];
            if (id >= start && id <= stop) {
                gather.push(id);
                break;
            }
        }
    }
    return gather;
}
function main() {
    // const data = fs.readFileSync('input.txt')
    var data = fs.readFileSync('input-test.txt', 'utf8');
    var result = getAllValidIds(data);
    console.log(result);
}
main();
//# sourceMappingURL=part-one.js.map