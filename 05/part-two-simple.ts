import fs = require('fs');

function getAllIds(data: string): Set<number> {
    const ranges = data.split('\r\n').map(x => x.split('-', 2).map(x => +x));

    const gather = new Set<number>();

    for (let range of ranges) {
        const start = range[0]!;
        const stop_ = range[1]!;

        for (let i = start; i <= stop_; i++) {
            gather.add(i);
        }
    }

    return gather;
}

function main() {
    const data = fs.readFileSync('input.txt', 'utf8').split('\r\n\r\n')[0]!;

    // const data = fs.readFileSync('input-test.txt', 'utf8');

    const result = getAllIds(data);
    console.log(result.size);
}

main();
