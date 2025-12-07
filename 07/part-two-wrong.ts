import fs from 'fs';

function parseData(data: string): number {
    const rows = data.split('\r\n');

    const beamIndices = new Set();
    let counter = 0;

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
    }

    return counter;
}

function main() {
    // const inputPath = 'input.txt';
    const inputPath = 'input-test.txt';

    const data = fs.readFileSync(inputPath, 'utf8');
    const result = parseData(data);

    console.log(result);
}

main();
