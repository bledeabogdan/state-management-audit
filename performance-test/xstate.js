const { createMachine, assign, interpret } = require("xstate");

// Get iterations param

const iterations = process.argv.slice(2)[0];

if (!iterations) {
    process.exit(1);
}

const noIterations = Number(iterations);

// xstate

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
                    actions: "update"
                }
            }
        }
    }
})

const machineService = interpret(machine.withConfig({
    actions: {
        update: assign({
            array: (context, event) => [...context.array, event.payload]
        })
    }
})).start();

console.time("xstate-spread");

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

console.timeEnd("xstate-spread");

const machineServicePush = interpret(machine.withConfig({
    actions: {
        update: assign({
            array: (context, event) => {
                context.array.push(event.payload)
                return context.array;
            }
        })
    }
})).start();

console.time("xstate-push");

for (let i = 0; i < noIterations; i++) {
    machineServicePush.send("ADD", {
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

console.timeEnd("xstate-push");