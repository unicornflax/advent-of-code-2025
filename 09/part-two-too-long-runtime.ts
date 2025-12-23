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
            for (let y = Math.min(prev_y, a_y); y <= Math.max(prev_y, a_y); y++) {
                outlineTileCoords.add(`${a_x},${y}`);
            }
        } else if (prev_y === a_y) {
            // write x line values
            for (let x = Math.min(prev_x, a_x); x <= Math.max(prev_x, a_x); x++) {
                outlineTileCoords.add(`${x},${a_y}`);
            }
        } else {
            throw new Error('Invalid Operation.');
        }

        prev = valueA;
    }

    // TODO need key?
    const outlineTileCoordsArr: [string, [number, number]][] = [...outlineTileCoords].map(x => [
        x,
        x.split(',').map(n => +n) as [number, number]
    ]);

    // TODO tile check is too expensive
    const distances = new Map<string, number>();
    for (let [keyA, valueA] of coordData) {
        for (let [keyB, valueB] of coordData) {
            if (keyA === keyB) {
                continue;
            }

            const [aX, aY] = valueA;
            const [bX, bY] = valueB;

            const minX = Math.min(aX, bX);
            const minY = Math.min(aY, bY);
            const maxX = Math.max(aX, bX);
            const maxY = Math.max(aY, bY);

            let isValid = true;

            // check if area has no tile lines in between
            for (let [keyTile, valueTile] of outlineTileCoordsArr) {
                const [tileX, tileY] = valueTile;
                let isValidX = true;
                let isValidY = true;

                // filter self coords
                if (aX === tileX && aY === tileY) continue;
                if (bX === tileX && bY === tileY) continue;

                // check if x is between a, b

                if (minX < tileX && tileX < maxX) {
                    isValidX = false;
                }

                if (minY < tileY && tileY < maxY) {
                    isValidY = false;
                }

                if (!isValidX && !isValidY) {
                    isValid = false;
                    break;
                }
            }

            if (!isValid) continue;

            // TODO check if valueA + 1,1 (in direction of valueB) => all four direction vectors have odd edge intersections

            if (!(aX === bX || aY === bY)) {
                const insideX = Math.floor((aX + bX) / 2);
                const insideY = Math.floor((aY + bY) / 2);

                let countLowerX = 0;
                let countHigherX = 0;
                let countLowerY = 0;
                let countHigherY = 0;

                outlineTileCoordsArr.forEach(([_, [x, y]]) => {
                    // filter self coords
                    if (x === aX && y === aY) return;
                    if (x === bX && y === bY) return;

                    if (x === insideX) {
                        if (y < insideY) {
                            countLowerX++;
                        } else {
                            countHigherX++;
                        }
                    } else if (y === insideY) {
                        if (x < insideX) {
                            countLowerY++;
                        } else {
                            countHigherY++;
                        }
                    }
                });

                // intersections in all directions need to be odd
                if (!(countLowerX % 2 && countHigherX % 2 && countLowerY % 2 && countHigherY % 2))
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

    console.log(result);
}

main();
