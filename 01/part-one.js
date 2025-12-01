const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf8');

let value = 50;
let counter = 0;

let start = Date.now();

for (let spin of data.split('\r\n')) {
    let sign = spin[0];
    let amount = +spin.split(sign)[1];

    if (sign == 'R') {
        sign = 1;
    } else {
        sign = -1;
    }

    const pre = value;

    value += sign * amount;
    value %= 100;

    if (value < 0) {
        value += 100;
    }

    if (Math.abs(value) === 0) {
        counter += 1;
    }

    console.log(
        `'${spin.padEnd(8, ' ')}'${String(sign).padEnd(2, ' ')}*${String(amount).padEnd(
            7,
            ' '
        )}\t${String(pre).padEnd(2, ' ')} to ${String(value).padEnd(2, ' ')}\t${String(counter)}`
    );
}

console.log(counter);

console.log(Date.now() - start);
