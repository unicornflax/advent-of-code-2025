import fs from 'fs';

function parseData(data: string): number {
    const rows = data.split('\r\n');

    // tracks the active beam indices + how many timelines run through
    let activeBeams = new Map<number, number>();

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const removeBeamIndices = new Set<number>();

        if (i % 2 === 1) {
            continue;
        }

        for (let j = 0; j < row.length; j++) {
            const char = row[j];

            if (!i) {
                if (char === 'S') {
                    activeBeams.set(j, 1);
                    break;
                }
                continue;
            }

            if (char === '.') {
                continue;
            }

            const currentColumnBeamAmount = activeBeams.get(j);

            if (!currentColumnBeamAmount) {
                continue;
            }

            removeBeamIndices.add(j);

            // TODO handle overlap?

            // keep inside range borders
            if (j) {
                activeBeams.set(j - 1, (activeBeams.get(j - 1) ?? 0) + currentColumnBeamAmount);
            }

            if (j < rows.length - 1) {
                activeBeams.set(j + 1, (activeBeams.get(j + 1) ?? 0) + currentColumnBeamAmount);
            }
        }

        activeBeams = new Map([...activeBeams].filter(([key, _]) => !removeBeamIndices.has(key)));
    }

    return [...activeBeams].map(([_, value]) => value).reduce((a, b) => a + b);
}

/*
RUNTIME ERROR => NEED TO FIND OTHER APPROACH
*/

function main() {
    const inputPath = 'input.txt';
    // const inputPath = 'input-test.txt';

    const data = fs.readFileSync(inputPath, 'utf8');
    const result = parseData(data);

    console.log(result);
}

main();
