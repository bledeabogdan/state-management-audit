import { createMachine, assign, interpret } from 'xstate';
import type { SurveyData, SurveysState } from './types';
import { fetchSurveys } from './utils';

type Context = {
	surveys: SurveysState;
};

type Events =
	| { type: 'NEW_SURVEY'; survey: SurveyData }
	| { type: 'CLEAR' }
	| { type: 'FETCH' }
	| { type: 'DELETE_SURVEY'; id: number };

export const surveysMachine = createMachine<Context, Events>({
	id: 'surveys',
	initial: 'empty',
	predictableActionArguments: true,
	context: {
		surveys: []
	},
	states: {
		empty: {
			entry: assign({
				surveys: []
			}),
			on: {
				FETCH: {
					target: 'loading'
				}
			}
		},
		loading: {
			invoke: {
				id: 'getSurveys',
				src: fetchSurveys,
				onDone: {
					target: 'idle',
					actions: assign({
						surveys: (context, event) => [...context.surveys, ...event.data]
					})
				}
			}
		},
		idle: {
			on: {
				NEW_SURVEY: {
					actions: assign({
						surveys: (context, event) => [...context.surveys, event.survey]
					})
				},
				CLEAR: {
					target: 'empty'
				},
				DELETE_SURVEY: {
					actions: assign({
						surveys: (context, event) => {
							const { id } = event;

							return context.surveys.filter((s) => s.id !== id);
						}
					})
				}
			}
		}
	}
});

export const surveysService = interpret(surveysMachine).start();
