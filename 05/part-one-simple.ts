import fs = require('fs');

function getAllValidIds(data: string) {
    let temp = data.split('\r\n\r\n', 2);
    const probes = temp[1]!.split('\r\n').map(x => +x);
    const ranges = temp[0]!.split('\r\n').map(x => x.split('-', 2).map(x => +x));

    const gather: number[] = [];

    for (let id of probes) {
        for (let range of ranges) {
            const start = range[0]!;
            const stop_ = range[1]!;

            if (id >= start && id <= stop_) {
                gather.push(id);
                break;
            }
        }
    }

    return gather;
}

function main() {
    const data = fs.readFileSync('input.txt', 'utf8');
    // const data = fs.readFileSync('input-test.txt', 'utf8');
    const result = getAllValidIds(data);

    console.log(result.length);
}

main();
