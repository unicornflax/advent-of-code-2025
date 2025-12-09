import fs from 'fs';

const coordInnerSep = ',';
const coordSep = '|';

function calcDistance(a: number[], b: number[]): number {
    const [x1, y1, z1] = a;
    const [x2, y2, z2] = b;

    const diffVec = [x2 - x1, y2 - y1, z2 - z1];

    // TODO remove `sqrt`
    return Math.sqrt(diffVec.map(component => component ** 2).reduce((a, b) => a + b));
}

function parseData(data: string) {
    // TODO: optimize map/arr usage
    const rows = data.split('\r\n');
    const coordMap: Map<string, number[]> = new Map();
    const distances = new Map<string, number>();

    // parse data
    for (let box of rows) {
        const coords = box.split(coordInnerSep, 3).map(x => +x);
        coordMap.set(box, coords);
    }

    for (let [keyA, valueA] of coordMap) {
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

    const sortedDistances = [...distances]
        .sort(([_, distA], [__, distB]) => distA - distB)
        .map(([key, _]) => key);
    let circuits: Set<string>[] = [];

    let keyA;
    let keyB;

    while (true) {
        for (let i = 0; i < sortedDistances.length; i++) {
            if (circuits.length === 1 && circuits[0].size === coordMap.size) {
                return coordMap.get(keyA!)![0] * coordMap.get(keyB!)![0];
            }

            [keyA, keyB] = sortedDistances[i].split(coordSep);

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
            else if (circuitA === circuitB) {
                continue;
            }
            // both in circuits => merge circuits
            else if (circuitA && circuitB) {
                // merge into a, but keep reference
                circuitB.forEach(x => circuitA.add(x));

                // remove b
                circuits.splice(circuits.indexOf(circuitB), 1);
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

        console.log(circuits.length);
    }
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
