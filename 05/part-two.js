"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function reduceRangesOnce(ranges) {
    var reduced = [];
    var merged = [];
    for (var _i = 0, ranges_1 = ranges; _i < ranges_1.length; _i++) {
        var rangeA = ranges_1[_i];
        if (merged.includes(rangeA))
            continue;
        if (merged.includes(rangeA))
            continue;
        for (var _a = 0, ranges_2 = ranges; _a < ranges_2.length; _a++) {
            var rangeB = ranges_2[_a];
            if (rangeA === rangeB)
                continue;
            if (merged.includes(rangeB))
                continue;
            var startA = rangeA[0];
            var endA = rangeA[1];
            var startB = rangeB[0];
            var endB = rangeB[1];
            var newStart = null;
            var newEnd = null;
            // a start between range b
            if (startB <= startA && startA <= endB) {
                newStart = startB;
            }
            // a end between range b
            if (startB <= endA && endA <= endB) {
                newEnd = endB;
            }
            if (newStart !== null || newEnd !== null) {
                // remove a, b => add combined
                reduced.push([newStart !== null && newStart !== void 0 ? newStart : startA, newEnd !== null && newEnd !== void 0 ? newEnd : endA]);
                merged.push(rangeA, rangeB);
                break;
            }
        }
        if (!merged.includes(rangeA))
            reduced.push(rangeA);
    }
    return reduced;
}
function getRangeSizes(ranges) {
    var gather = 0;
    for (var _i = 0, ranges_3 = ranges; _i < ranges_3.length; _i++) {
        var range = ranges_3[_i];
        var start = range[0];
        var end_ = range[1];
        // TODO `+1` or `+2`?
        gather += end_ - start + 1;
    }
    return gather;
}
function main() {
    var inputPath = 'input.txt';
    // const inputPath = 'input-test.txt';
    // const inputPath = 'input-test2.txt';
    var data = fs.readFileSync(inputPath, 'utf8').split('\r\n\r\n')[0];
    var ranges = data.split('\r\n').map(function (x) { return x.split('-', 2).map(function (x) { return +x; }); });
    while (true) {
        var nextRanges = reduceRangesOnce(ranges);
        if (nextRanges.length === ranges.length)
            break;
        ranges = nextRanges;
    }
    var size = getRangeSizes(ranges);
    console.log(size);
}
main();
//# sourceMappingURL=part-two.js.map