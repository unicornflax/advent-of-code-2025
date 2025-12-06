import * as fs from 'fs';

function reduceRangesOnce(ranges: number[][]): number[][] {
    const reduced: number[][] = [];
    const merged: number[][] = [];

    for (let rangeA of ranges) {
        if (merged.includes(rangeA)) continue;

        if (merged.includes(rangeA)) continue;

        for (let rangeB of ranges) {
            if (rangeA === rangeB) continue;

            if (merged.includes(rangeB)) continue;

            const startA = rangeA[0];
            const endA = rangeA[1];

            const startB = rangeB[0];
            const endB = rangeB[1];

            let newStart = null;
            let newEnd = null;

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
                reduced.push([newStart ?? startA, newEnd ?? endA]);
                merged.push(rangeA, rangeB);
                break;
            }
        }

        if (!merged.includes(rangeA)) reduced.push(rangeA);
    }

    return reduced;
}

function getRangeSizes(ranges: number[][]): number {
    let gather = 0;

    for (let range of ranges) {
        const start = range[0];
        const end_ = range[1];

        // TODO `+1` or `+2`?
        gather += end_ - start + 1;
    }

    return gather;
}

function main() {
    const inputPath = 'input.txt';
    // const inputPath = 'input-test.txt';
    // const inputPath = 'input-test2.txt';

    const data = fs.readFileSync(inputPath, 'utf8').split('\r\n\r\n')[0];

    let ranges = data.split('\r\n').map(x => x.split('-', 2).map(x => +x));

    while (true) {
        let nextRanges = reduceRangesOnce(ranges);
        if (nextRanges.length === ranges.length) break;

        ranges = nextRanges;
    }

    const size = getRangeSizes(ranges);

    console.log(size);
}

main();
