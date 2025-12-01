const { time } = require('console');
const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf8');

let value = 50;
let counter = 0;

let start = Date.now();

for (let spin of data.split('\r\n')) {
    let sign = spin[0];
    let amount = +spin.split(sign)[1];
    const pre = value;

    if (sign == 'R') {
        sign = 1;
    } else {
        sign = -1;
    }

    for (let i = 0; i < Math.abs(amount); i++) {
        value = value + sign;

        if (value == -1) {
            value = 99;
        } else if (value == 100) {
            value = 0;
        }

        if (value === 0) {
            counter++;
        }
    }

    while (value >= 100) {
        alreadyCountedZero = true;
        value -= 100;
        counter++;
    }

    console.log(
        `${spin.padEnd(8, ' ')}${String(sign).padEnd(2, ' ')}* ${String(amount).padEnd(
            7,
            ' '
        )}${String(pre).padEnd(2, ' ')} to ${String(value).padEnd(2, ' ')}\t${String(counter)}`
    );
}

console.log(counter);

console.log(Date.now() - start);
