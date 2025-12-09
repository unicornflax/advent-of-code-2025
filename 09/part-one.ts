import fs from 'fs';

function calcArea(a: [number, number], b: [number, number]): number {
    return (Math.abs(a[0] - b[0]) + 1) * (Math.abs(a[1] - b[1]) + 1);
}

function parseData(data: string) {
    const rows = data.split('\r\n');

    let minX: [number, number] = [Infinity, 0];
    let maxX: [number, number] = [-Infinity, 0];
    let minY: [number, number] = [0, Infinity];
    let maxY: [number, number] = [0, -Infinity];

    for (let row of rows) {
        const [x, y] = row.split(',').map(n => +n);
        const pair: [number, number] = [x, y];

        if (x < minX[0]) {
            minX = pair;
        }
        if (x > maxX[0]) {
            maxX = pair;
        }
        if (y < minY[1]) {
            minY = pair;
        }
        if (y > maxY[1]) {
            maxY = pair;
        }
    }

    return Math.max(
        calcArea(minX, maxX),
        calcArea(minX, maxY),
        calcArea(maxX, minY),
        calcArea(maxX, maxY)
    );
}

function main() {
    const inputPath = 'input.txt';
    // const inputPath = 'input-test.txt';

    const data = fs.readFileSync(inputPath, 'utf8');
    const result = parseData(data);
    // const result = parseData(data);

    console.log(result);
}

main();
