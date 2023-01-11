// Get iterations param

const iterations = process.argv.slice(2)[0];

if (!iterations) {
    process.exit(1);
}

const noIterations = Number(iterations);

// vanilla

let array = [];

console.time("vanilla-spread");

for (let i = 0; i < noIterations; i++) {
    array = [...array, {
        id: Math.random(),
        one: i,
        two: '2',
        three: 3,
        x: 'xxxxx',
        y: 'yyyyy',
        z: 'zzzzz',
        z1: 'zzzzz',
        z2: 'zzzzz',
        z3: 'zzzzz',
        z4: {
            nested: true
        }
    }];
}

console.timeEnd("vanilla-spread");

array = [];

console.time("vanilla-push");

for (let i = 0; i < noIterations; i++) {
    array.push({
        id: Math.random(),
        one: i,
        two: '2',
        three: 3,
        x: 'xxxxx',
        y: 'yyyyy',
        z: 'zzzzz',
        z1: 'zzzzz',
        z2: 'zzzzz',
        z3: 'zzzzz',
        z4: {
            nested: true
        }
    });
}

console.timeEnd("vanilla-push");