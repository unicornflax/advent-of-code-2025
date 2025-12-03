const fs = require('fs');

function getAllMaxDigitPairs(data) {
    maxDigitPairs = [];
    for (let bank of data.split('\r\n')) {
        maxDigitPairs.push(getMaxDigitPair(bank));
    }

    return maxDigitPairs;
}

function getMaxDigitPair(bank) {
    const bankArr = Array.from(bank).map(x => +x);

    const maxDigit = Math.max(...bankArr);

    // this only matches the first (which is what we want, because the most left is the most max max number)
    const index = bankArr.indexOf(maxDigit);

    const left = bankArr.slice(0, index);
    const right = bankArr.slice(index + 1);

    if (right.length) {
        const maxRight = Math.max(...right);
        const maxDigitPair = +(String(maxDigit) + String(maxRight));
        return maxDigitPair;
    }

    const maxLeft = Math.max(...left);
    const maxDigitPair = +(String(maxLeft) + String(maxDigit));
    return maxDigitPair;
}

function main() {
    const data = fs.readFileSync('input.txt', 'utf8');
    const testData = fs.readFileSync('input-test.txt', 'utf8');

    const r = getAllMaxDigitPairs(data);

    console.log(r.reduce((a, b) => a + b));
}

main();
