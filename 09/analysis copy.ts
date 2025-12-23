import fs from 'fs';

function calcArea(a: [number, number], b: [number, number]): number {
    return (Math.abs(a[0] - b[0]) + 1) * (Math.abs(a[1] - b[1]) + 1);
}

function parseData(data: string) {
    const dataRows = data.split('\r\n');
    const coordData: [string, [number, number]][] = [];
    const outlineTileCoords: Set<string> = new Set();

    let prev: [number, number] | null = null;

    // parse data
    for (let box of dataRows) {
        const coords = box.split(',', 2).map(x => +x);
        const [x, y] = coords;
        coordData.push([box, [x, y]]);
    }

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
                outlineTileCoords.add(`${a_x},${y}`);
            }
        } else {
            // write x line values
            for (let x = Math.min(prev_x, a_x); x < Math.max(prev_y, a_y); x++) {
                outlineTileCoords.add(`${x},${a_y}`);
            }
        }
    }

    const distances = new Map<string, number>();
    for (let [keyA, valueA] of coordData) {
        for (let [keyB, valueB] of coordData) {
            if (valueA === valueB) {
                continue;
            }

            // TODO check if no lines in between
            for (let tile of outlineTileCoords) {
            }

            // TODO check if valueA + 1,1 (in direction of valueB) => all four direction vectors have odd edge intersections

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
