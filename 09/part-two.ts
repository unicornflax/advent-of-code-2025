import fs from 'fs';

function calcArea(a: [number, number], b: [number, number]): number {
    return (Math.abs(a[0] - b[0]) + 1) * (Math.abs(a[1] - b[1]) + 1);
}

function parseData(data: string) {
    const dataRows = data.split('\r\n');
    const coordMap: [string, [number, number]][] = [];
    const distances = new Map<string, number>();

    // parse data
    for (let box of dataRows) {
        const coords = box.split(',', 2).map(x => +x);
        const [x, y] = coords;
        coordMap.push([box, [x, y]]);
    }

    for (let [keyA, valueA] of coordMap) {
        for (let [keyB, valueB] of [...coordMap]) {
            if (valueA === valueB) {
                continue;
            }

            const combinedKey = [keyA, keyB].sort().join('|');

            if (distances.has(combinedKey)) {
                continue;
            }

            distances.set(combinedKey, calcArea(valueA, valueB));
        }
    }

    const sortedDistances = [...distances]
        .sort(([_, distA], [__, distB]) => distB - distA)
        .map(([_, dist]) => dist);

    return sortedDistances[0];
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
