import fs from 'fs';

function parseData(data: string, numbersRowAmount: number) {
    const rows = data.split('\r\n');

    const beamIndices = new Set();
    let counter = 0;

    const visualRows = [];

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];

        for (let j = 0; j < row.length; j++) {
            const char = row[j];

            if (char === 'S') {
                beamIndices.add(j);
                break;
            }

            if (!(beamIndices.has(j) && char === '^')) {
                continue;
            }

            beamIndices.delete(j);

            // keep inside range borders
            if (j) {
                beamIndices.add(j - 1);
            }

            if (j < rows.length - 1) {
                beamIndices.add(j + 1);
            }
        }

        if (i && i % 2 === 0) {
            counter += beamIndices.size;
        }

        let temp = '';
        for (let x = 0; x < row.length; x++) {
            if (beamIndices.has(x)) {
                temp += '|';
            } else {
                temp += row[x];
            }
        }

        visualRows.push(temp + '' + beamIndices.size + ' ' + counter);
    }

    return visualRows;
}

function main() {
    // const inputPath = 'input.txt';
    const inputPath = 'input-test.txt';

    const data = fs.readFileSync(inputPath, 'utf8');
    const result = parseData(data, 4);

    console.log(result.join('\r\n'));
}

main();
