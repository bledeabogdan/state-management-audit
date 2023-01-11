const { createStore, createEvent, createApi } = require("effector");

// Get iterations param
const iterations = process.argv.slice(2)[0];

if (!iterations) {
    process.exit(1);
}

const noIterations = Number(iterations);

// effector: createStore, createEvent

const array = createStore([]);
const addElement = createEvent();

array.on(addElement, (state, element) => [...state, element]);

console.time("effector-on-spread");

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

console.timeEnd("effector-on-spread");

const arrayPush = createStore([]);
const addElementPush = createEvent();

arrayPush.on(addElementPush, (state, element) => {
    state.push(element);
    return state;
});

console.time("effector-on-push");

for (let i = 0; i < noIterations; i++) {
    addElementPush({
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

console.timeEnd("effector-on-push");

// effector: createStore, createApi

const arrayWithApi = createStore([]);

const addElementWithApi = (state, element) => [...state, element];

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
