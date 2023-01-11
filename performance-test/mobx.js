const { makeObservable, observable, action } = require("mobx");

// Get iterations param

const iterations = process.argv.slice(2)[0];

if (!iterations) {
    process.exit(1);
}

const noIterations = Number(iterations);

// mobx: using `array.push`

class ArrPush {
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

const arrPushStore = new ArrPush([]);

console.time("mobx-push");

for (let i = 0; i < noIterations; i++) {
    arrPushStore.addValue({
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

console.timeEnd("mobx-push");

// mobx: using spread operator

class ArrSpread {
    values = [];

    constructor(initialState) {
        makeObservable(this, {
            values: observable,
            addValue: action
        })

        this.values = initialState;
    }

    addValue(value) {
        this.values = [...this.values, value];
    }
}

const arrSpreadStore = new ArrSpread([]);

console.time("mobx-spread");

for (let i = 0; i < noIterations; i++) {
    arrSpreadStore.addValue({
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

console.timeEnd("mobx-spread");