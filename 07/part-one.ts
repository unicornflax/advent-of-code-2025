import fs from 'fs';

function parseData(data: string): number {
    const rows = data.split('\r\n');

    const beamIndices = new Set();
    let counter = 0;

    for (let row of rows) {
        for (let i = 0; i < row.length; i++) {
            const char = row[i];

            if (char === 'S') {
                beamIndices.add(i);
                break;
            }

            if (!(beamIndices.has(i) && char === '^')) {
                continue;
            }

            beamIndices.delete(i);

            // keep inside range borders
            if (i) {
                beamIndices.add(i - 1);
            }

            if (i < rows.length - 1) {
                beamIndices.add(i + 1);
            }
        }

        counter++;
    }

    return counter;
}

function main() {
    const inputPath = 'input.txt';
    // const inputPath = 'input-test.txt';

    const data = fs.readFileSync(inputPath, 'utf8');
    const result = parseData(data);

    console.log(result);
}

main();
