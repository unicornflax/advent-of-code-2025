const fs = require('fs');

function getAllValidPatterns(data) {
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
    let buffer = '';

    id = String(id);

    const idArr = Array.from(id);

    for (const digit of idArr) {
        buffer += digit;

        if (checkPattern(buffer, id)) {
            return true;
        }
    }

    return false;
}

function checkPattern(pattern, id) {
    if (pattern === id) {
        return false;
    }

    const patternArr = Array.from(pattern);

    let cycleCounter = 0;

    while (id !== '') {
        cycleCounter++;
        for (const digit of patternArr) {
            if (id == '') {
                return false;
            }

            const idDigit = id.charAt(0);

            if (digit === idDigit) {
                id = id.slice(1);
                continue;
            }

            return false;
        }
    }

    return cycleCounter === 2;
}

function main() {
    const data = fs.readFileSync('input.txt', 'utf8');
    const testData = fs.readFileSync('input-test.txt', 'utf8');

    // const result = getAllValidPatterns(testData);

    const result = getAllValidPatterns(data);

    // const result = isRepeatingId('001001');

    console.log(result);

    console.log(result.reduce((prev, curr) => prev + curr));
}

main();
