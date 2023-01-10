import { createMachine, assign, interpret } from 'xstate';
import type { SurveyData, SurveysState } from './types';

type Context = {
	surveys: SurveysState;
};

type Events =
	| { type: 'NEW_SURVEY'; survey: SurveyData }
	| { type: 'CLEAR' }
	| { type: 'DELETE_SURVEY'; id: number };

const surveysMachine = createMachine<Context, Events>({
	id: 'surveys',
	initial: 'idle',
	predictableActionArguments: true,
	context: {
		surveys: []
	},
	states: {
		empty: {
			entry: assign({
				surveys: []
			})
		},
		idle: {
			on: {
				NEW_SURVEY: {
					actions: assign({
						surveys: (context, event) => {
							return context.surveys.concat(event.survey);
						}
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
