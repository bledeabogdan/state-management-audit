const { makeObservable, observable, action } = require("mobx");

const iterations = process.argv.slice(2)[0];

if (!iterations) {
    process.exit(1);
}

const noIterations = Number(iterations);

class Arr {
    values = [];

    constructor(initialState) {
        makeObservable(this, {
            values: observable,
            addValue: action
        })

        this.values = initialState;
    }

    addValue(value) {
        this.values.push(value);
    }
}

const arrStore = new Arr([]);

console.time("mobx");

for (let i = 0; i < noIterations; i++) {
    arrStore.addValue({
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

console.timeEnd("mobx");
