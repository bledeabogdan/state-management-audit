import { createMachine, assign } from 'xstate';

export const surveysMachine = createMachine({
	id: 'surveys',
	initial: 'idle',
	predictableActionArguments: true,
	context: {
		surveys: []
	},
	states: {
		idle: {
			on: {
				NEW_SURVEY: {
					actions: assign({
						surveys: (context, event) => {
							return context.surveys.concat(event.value);
						}
					})
				},
				CLEAR: {
					actions: assign({
						surveys: []
					})
				}
			}
		}
	}
});
