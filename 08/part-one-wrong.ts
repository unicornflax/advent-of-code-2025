import fs from 'fs';

const coordInnerSep = ',';
const coordSep = '|';

function calcDistance(a: number[], b: number[]): number {
    const [x1, y1, z1] = a;
    const [x2, y2, z2] = b;

    const diff = [x2 - x1, y2 - x1, z2 - z1];

    return Math.sqrt(diff.map(num => num ** 2).reduce((a, b) => a + b));
}

function coordToString(c: number[]) {
    return c.join();
}

function stringToCoord(s: string) {
    return s.split(coordInnerSep);
}

function parseData(data: string) {
    // TODO: optimize map/arr usage
    const rows = data.split('\r\n');
    const coordMap: Map<string, number[]> = new Map();
    const distances = new Map<string, number>();

    // parse data
    for (let box of rows) {
        const coords = box.split(',', 3).map(x => +x);
        coordMap.set(box, coords);
    }

    for (let [keyA, valueA] of [...coordMap]) {
        for (let [keyB, valueB] of [...coordMap]) {
            if (valueA === valueB) {
                continue;
            }

            const combinedKey = [keyA, keyB].sort().join(coordSep);

            if (distances.has(combinedKey)) {
                continue;
            }

            distances.set(combinedKey, calcDistance(valueA, valueB));
        }
    }

    const sortedDistances = [...distances].sort(([_, distA], [__, distB]) => distA - distB);
    let circuits: Set<string>[] = [];

    for (let i = 0; i < 1000; i++) {
        const [key, dist] = sortedDistances[i];

        const [keyA, keyB] = key.split(coordSep);

        let circuitA;
        let circuitB;

        // find circuit of a,b
        for (let circuit of circuits) {
            if (!circuitA && circuit.has(keyA)) circuitA = circuit;
            if (!circuitB && circuit.has(keyB)) circuitB = circuit;

            if (circuitA && circuitB) break;
        }

        // none in circuit => new circuit with both
        if (!circuitA && !circuitB) {
            circuits.push(new Set([keyA, keyB]));
        }

        // same circuit
        else if (circuitA === circuitB) continue;
        // both in circuits => merge circuits
        else if (circuitA && circuitB) {
            const temp: Set<string> = new Set([...circuitA, ...circuitB]);
            circuitA = temp;
        }

        // only a in circuit
        else if (circuitA) {
            circuitA.add(keyB);
        }

        // only b in circuit
        else if (circuitB) {
            circuitB.add(keyA);
        } else {
            console.error(circuitA, circuitB);
        }
    }

    circuits = circuits.sort((a, b) => b.size - a.size);

    const temp = circuits.slice(0, 3);

    console.log(temp);

    return temp.map(x => x.size).reduce((a, b) => a + b);
}

function main() {
    const inputPath = 'input.txt';
    // const inputPath = 'input-test.txt';

    const data = fs.readFileSync(inputPath, 'utf8');
    const result = parseData(data);

    console.log(result);
}

main();
