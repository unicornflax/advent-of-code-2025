import fs from 'fs';

function parseGroup(currentOp: string, buffer: number[]) {
    if (currentOp == '+') {
        const temp = buffer.reduce((a, b) => a + b);
        buffer.splice(0, buffer.length);
        return temp;
    } else {
        const temp = buffer.reduce((a, b) => a * b);
        buffer.splice(0, buffer.length);
        return temp;
    }
}

function parseData(data: string, opRowIndex: number) {
    const rows = data.split('\r\n');

    let currentOp = '';
    let buffer: number[] = [];

    let gather = 0;

    for (let i = 0; i < rows[0].length; i++) {
        currentOp = [' ', undefined].includes(rows[opRowIndex][i])
            ? currentOp
            : rows[opRowIndex][i];

        const vertical = rows.slice(0, opRowIndex).map(x => x[i]);

        // case end of group => calculate
        if (vertical.every(x => x === ' ')) {
            gather += parseGroup(currentOp, buffer);
        } else {
            buffer.push(+vertical.join(''));
        }
    }

    // at the end calc group
    gather += parseGroup(currentOp, buffer);

    return gather;
}

function main() {
    const inputPath = 'input.txt';
    // const inputPath = 'input-test.txt';

    const data = fs.readFileSync(inputPath, 'utf8');

    const result = parseData(data, 4);
    // const result = parseData(data, 3);

    console.log(result);
}

main();
