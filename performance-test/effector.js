const { createStore, createEvent, createApi } = require("effector");

const iterations = process.argv.slice(2)[0];

if (!iterations) {
    process.exit(1);
}

const noIterations = Number(iterations);

const array = createStore([]);

const addElement = createEvent();

array.on(addElement, (state, element) => { state.push(element) });

console.time("effector");

for (let i = 0; i < noIterations; i++) {
    addElement({
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

console.timeEnd("effector");

const arrayWithApi = createStore([]);

const addElementWithApi = (state, element) => { state.push(element) };

const arrayApi = createApi(arrayWithApi, {
    addElementWithApi
});

console.time("effectorWithApi");

for (let i = 0; i < noIterations; i++) {
    arrayApi.addElementWithApi({
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

console.timeEnd("effectorWithApi");

arrayWithApi.watch(state => console.log(state.length));