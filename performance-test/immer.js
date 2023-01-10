const { default: produce } = require("immer");

const iterations = process.argv.slice(2)[0];

if (!iterations) {
    process.exit(1);
}

const noIterations = Number(iterations);

const baseState = [];
console.time("immer");

const nextState = produce(baseState, d => {

    for (let i = 0; i < noIterations; i++) {
        d.push({
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
        })
    }
})

console.timeEnd("immer");

console.log(nextState.length);