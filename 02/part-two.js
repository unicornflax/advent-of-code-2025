const fs = require('fs');

function getAllInvalidIdsFrom(data) {
    validPatterns = [];
    for (let idRange of data.split(',')) {
        const dataArr = idRange.split('-', 2);

        const first = +dataArr[0];
        const last = +dataArr[1];

        for (let id = first; id < last + 1; id++) {
            if (isRepeatingId(id)) {
                console.log(id);
                validPatterns.push(id);
            }
        }
    }

    return validPatterns;
}

function isRepeatingId(id) {
    const buffer = [];

    id = String(id);
    const idArr = Array.from(id);

    for (let digit of idArr) {
        if (buffer.length === 0) {
            buffer.push(digit);
            continue;
        }
        if (buffer[0] === digit) {
            // check if buffer is valid pattern
            const doublePattern = buffer.join('') + buffer.join('');

            if (doublePattern === id) {
                return true;
            }
        }
        buffer.push(digit);
    }

    return false;
}

function main() {
    const data = fs.readFileSync('input.txt', 'utf8');
    const testData = fs.readFileSync('input-test.txt', 'utf8');

    // const result = isRepeatingId('11');
    // const result = isRepeatingId('1188511885');
    const result = getAllInvalidIdsFrom(data);

    console.log(result);
    console.log(result.reduce((prev, curr) => prev + curr));
}

main();
