import fs from 'fs';

function parseRow(row: string): string[] {
    while (row.includes('  ')) {
        row = row.replace('  ', ' ');
    }

    const operatorArr = row.split(' ').filter(x => x !== '');
    return operatorArr;
}

function parseData(data: string, numbersRowAmount: number): number {
    const rows = data.split('\r\n');
    let rawNumbers = rows.slice(0, numbersRowAmount);
    let rawOperators = rows.slice(numbersRowAmount)[0]!;

    const operators = parseRow(rawOperators);
    const numbers = rawNumbers.map(row => parseRow(row).map(x => +x));

    let gather = 0;

    for (let i = 0; i < operators.length; i++) {
        const op = operators[i];
        const relevant = numbers.map(row => row[i]!);

        if (op == '+') {
            gather += relevant.reduce((a, b) => a + b);
        } else {
            gather += relevant.reduce((a, b) => a * b);
        }
    }

    return gather;
}

function main() {
    const inputPath = 'input.txt';
    // const inputPath = 'input-test.txt';

    const data = fs.readFileSync(inputPath, 'utf8');
    const result = parseData(data, 4);

    console.log(result);
}

main();
