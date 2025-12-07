import fs from 'fs';

function parseData(data: string): number {
    const rows = data.split('\r\n');

    let paths: number[][] = [];
    let counter = 0;

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const newPaths: number[][] = [];
        const removePaths: number[][] = [];

        if (i % 2 === 1) {
            continue;
        }

        for (let j = 0; j < row.length; j++) {
            const char = row[j];

            if (!i) {
                if (char === 'S') {
                    newPaths.push([j]);
                    break;
                }
                continue;
            }

            if (char === '.') {
                continue;
            }

            const currentPaths = paths.filter(path => path[path.length - 1] === j);

            if (!currentPaths.length) {
                continue;
            }

            removePaths.push(...currentPaths);

            // keep inside range borders
            if (j) {
                for (let currentPath of currentPaths) {
                    const newPath = [...currentPath];
                    newPath.splice(currentPath.length, 0, j - 1);
                    newPaths.push(newPath);
                }
            }

            if (j < rows.length - 1) {
                for (let currentPath of currentPaths) {
                    const newPath = [...currentPath];
                    newPath.splice(currentPath.length, 0, j + 1);
                    newPaths.push(newPath);
                }
            }
        }

        paths = [...paths, ...newPaths].filter(x => !removePaths.find(y => x === y));
        const gather = new Map();
        const temp = paths
            .map(x => x[x.length - 1])
            .sort((a, b) => a - b)
            .forEach(x => gather.set(x, (gather.get(x) ?? 0) + 1));
        console.log([...gather]);
    }

    return paths.length;
}

/*
ANALYSIS FOR PART-TWO WITHOUT PATHS (WE WANT TO COMPARE THE PATH ENDINGS WITH THE MAP ENTRIES)
*/

function main() {
    // const inputPath = 'input.txt';
    const inputPath = 'input-test.txt';

    const data = fs.readFileSync(inputPath, 'utf8');
    const result = parseData(data);

    console.log(result);
}

main();
