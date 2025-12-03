const fs = require('fs');

function getAllMaxDigitPairs(data) {
    const gather = [];

    for (let bank of data.split('\r\n')) {
        gather.push(getMaxTwelveDigits(bank));
    }

    return gather;
}

function getMaxTwelveDigits(bank) {
    const arr = Array.from(bank).map(x => +x);

    const maxArr = [];

    for (let i = 0; i < arr.length; i++) {
        digit = arr[i];
        let hasBeenAssigned = false;

        if (!maxArr.length) {
            maxArr.push(digit);
            continue;
        }

        const howManyDigitsComeAfter = Math.min(12 - 1, arr.length - (i + 1));
        const startIndex = 12 - 1 - howManyDigitsComeAfter;

        for (let j = startIndex; j < maxArr.length; j++) {
            const maxDigit = maxArr[j];

            if (digit > maxDigit) {
                // delete all max digits after the current index + itself
                maxArr.splice(j, maxArr.length);

                // replace with new value
                maxArr.push(digit);

                hasBeenAssigned = true;
                break;
            }
        }

        if (maxArr.length < 12 && !hasBeenAssigned) {
            maxArr.push(digit);
        }
    }

    return maxArr.join('');
}

function main() {
    const data = fs.readFileSync('input.txt', 'utf8');
    const testData = fs.readFileSync('input-test.txt', 'utf8');

    const r = getAllMaxDigitPairs(data);

    // const r = getMaxTwelveDigits('234234234234278');

    console.log(r.reduce((a, b) => Number(a) + Number(b)));
}

main();
