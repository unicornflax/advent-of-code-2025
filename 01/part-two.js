const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf8');

let value = 50;
let counter = 0;

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

    while (value >= 100) {
        value -= 100;
        if (value !== 0) counter++;
    }

    while (value < 0) {
        value += 100;
        if (value !== 0 && pre !== 0) counter++;
    }

    if (Math.abs(value) === 0) {
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
