const fs = require('fs');

function getSet(data) {
    const set = new Set();

    dataLines = data.split('\r\n');

    for (let y = 0; y < dataLines.length; y++) {
        const arr = Array.from(dataLines[y]);

        for (let x = 0; x < arr.length; x++) {
            if (arr[x] === '@') {
                set.add(tuple(x, y));
            }
        }
    }

    return set;
}

function lessThanFourAdjacent(data, set) {
    let amount = 0;

    dataLines = data.split('\r\n');

    for (let y = 0; y < dataLines.length; y++) {
        const arr = Array.from(dataLines[y]);

        for (let x = 0; x < arr.length; x++) {
            // self is not a roll
            if (!set.has(tuple(x, y))) continue;

            let adjacent = 0;

            // check all adjacent
            for (let y_Offset = -1; y_Offset <= 1; y_Offset++) {
                for (let x_Offset = -1; x_Offset <= 1; x_Offset++) {
                    // filter self
                    if (!y_Offset && !x_Offset) continue;

                    if (set.has(tuple(x + x_Offset, y + y_Offset))) adjacent++;
                }
            }

            if (adjacent < 4) amount++;
        }
    }

    return amount;
}

tuple = (a, b) => `${a},${b}`;

function main() {
    const data = fs.readFileSync('input.txt', 'utf8');
    // const data = fs.readFileSync('input-test.txt', 'utf8');

    const set = getSet(data);
    const result = lessThanFourAdjacent(data, set);
    console.log(result);
}

main();
