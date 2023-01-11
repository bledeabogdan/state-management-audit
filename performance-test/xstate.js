const { createMachine, assign, interpret } = require("xstate");

const iterations = process.argv.slice(2)[0];

if (!iterations) {
    process.exit(1);
}

const noIterations = Number(iterations);

const machine = createMachine({
    id: "machine",
    predictableActionArguments: true,
    initial: "idle",
    context: {
        array: []
    },
    states: {
        idle: {
            on: {
                ADD: {
                    actions: assign({
                        array: (context, event) => [...context.array].concat(event.payload)
                    })
                }
            }
        }
    }
})

const machineService = interpret(machine).start();

console.time("xstate");

for (let i = 0; i < noIterations; i++) {
    machineService.send("ADD", {
        payload: {
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
        }
    })
}

console.timeEnd("xstate");