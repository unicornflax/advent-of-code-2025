import fs from 'fs';

function calcArea(a: [number, number], b: [number, number]): number {
    return (Math.abs(a[0] - b[0]) + 1) * (Math.abs(a[1] - b[1]) + 1);
}

function parseData(data: string) {
    const dataRows = data.split('\r\n');
    const coordData: [string, [number, number]][] = [];
    const tileCoords = [];

    let prev: [number, number] | null = null;

    // parse data
    for (let box of dataRows) {
        const coords = box.split(',', 2).map(x => +x);
        const [x, y] = coords;
        coordData.push([box, [x, y]]);
    }

    // create lines
    for (let [keyA, valueA] of coordData) {
        if (!prev) {
            prev = coordData[coordData.length - 1][1];
        }

        const [prev_x, prev_y] = prev;
        const [a_x, a_y] = valueA;

        if (prev_x === a_x) {
            // write y line values
            // TODO check index issues
            for (let y = Math.min(prev_y, a_y); y < Math.max(prev_y, a_y); y++) {
                tileCoords.push([a_x, y]);
            }
        } else {
            // write x line values
            for (let x = Math.min(prev_x, a_x); x < Math.max(prev_y, a_y); x++) {
                tileCoords.push([x, a_y]);
            }
        }
    }

    // draw picture
    const minX = Math.min(...tileCoords.map(x => x[0]));
    const minY = Math.min(...tileCoords.map(x => x[1]));
    const maxX = Math.max(...tileCoords.map(x => x[0]));
    const maxY = Math.max(...tileCoords.map(x => x[1]));
}

function main() {
    // const inputPath = 'input.txt';
    const inputPath = 'input-test.txt';

    const data = fs.readFileSync(inputPath, 'utf8');
    // const result = parseData(data);
    const result = parseData(data);

    console.log(result);
}

main();
