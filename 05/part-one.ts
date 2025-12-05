import * as fs from 'fs';

function getAllValidIds(data: string) {
    let temp = data.split('\r\n\r\n', 2);
    const ranges = temp[0];
    const probes = temp[1];

    const gather: number[] = [];

    for (let id of probes.split('\r\n').map(x => +x)) {
        for (let range of ranges.split('\r\n')) {
            // TODO do once (not each iter)
            const temp = range.split('-', 2).map(x => +x);
            const start = temp[0];
            const stop_ = temp[1];

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
