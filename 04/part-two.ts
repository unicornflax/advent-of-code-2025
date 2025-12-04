import fs from 'fs';

function getSet(data: string): Set<string> {
    const set = new Set<string>();

    const dataLines: string[] = data.split('\r\n');

    for (let y = 0; y < dataLines.length; y++) {
        const arr = [...dataLines[y]];

        for (let x = 0; x < arr.length; x++) {
            if (arr[x] === '@') {
                set.add(tuple(x, y));
            }
        }
    }

    return set;
}

function removeUntilDepleted(data: string, rollSet: Set<string>) {
    let total = 0;
    let amount = 0;

    while (true) {
        [rollSet, amount] = removeValidRolls(data, rollSet);
        if (!amount) break;

        total += amount;
    }

    return total;
}

function removeValidRolls(data: string, rollSet: Set<string>): [Set<string>, number] {
    const toBeRemoved = new Set();

    const dataLines = data.split('\r\n');

    for (let y = 0; y < dataLines.length; y++) {
        const arr = [...dataLines[y]];

        for (let x = 0; x < arr.length; x++) {
            // self is not a roll
            if (!rollSet.has(tuple(x, y))) continue;

            let adjacent = 0;

            // check adjacent with offset
            for (let y_Offset = -1; y_Offset <= 1; y_Offset++) {
                for (let x_Offset = -1; x_Offset <= 1; x_Offset++) {
                    // filter self
                    if (!y_Offset && !x_Offset) continue;

                    if (rollSet.has(tuple(x + x_Offset, y + y_Offset))) adjacent++;
                }
            }

            if (adjacent < 4) toBeRemoved.add(tuple(x, y));
        }
    }

    return [new Set([...rollSet].filter(x => !toBeRemoved.has(x))), toBeRemoved.size];
}

// we need non-reference key for unique set values
const tuple = (a: number, b: number) => `${a},${b}`;

function main() {
    const data = fs.readFileSync('input.txt', 'utf8');
    // const data = fs.readFileSync('input-test.txt', 'utf8');

    const set = getSet(data);
    const result = removeUntilDepleted(data, set);
    console.log(result);
}

main();
