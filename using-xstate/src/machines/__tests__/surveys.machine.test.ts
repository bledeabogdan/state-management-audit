import { surveysMachine } from '../surveys.machine';
import { describe, expect, it } from 'vitest';

describe('SurveysMachine', () => {
	describe('initial state', () => {
		it('should be in empty state', () => {
			expect(surveysMachine.initialState.value).toBe('empty');
		});
	});

	describe('when `empty` state', () => {
		describe('and `ADD_SURVEY` event occurs', () => {
			it('should be in `idle` state', () => {
				const nextState = surveysMachine.transition('empty', {
					type: 'NEW_SURVEY',
					survey: { id: 0, name: 'Name' }
				});

				expect(nextState.matches('idle')).toBe(true);
			});

			it('should add the `payload` survey to the context', () => {
				const nextState = surveysMachine.transition('empty', {
					type: 'NEW_SURVEY',
					survey: { id: 0, name: 'Name' }
				});

				expect(nextState.context.surveys.length).toBe(1);
			});
		});
	});

	describe('when `idle` state', () => {
		describe('and `ADD_SURVEY` event occurs', () => {
			it('should be in `idle` state', () => {
				const nextState = surveysMachine.transition('empty', {
					type: 'NEW_SURVEY',
					survey: { id: 0, name: 'Name' }
				});

				expect(nextState.matches('idle')).toBe(true);
			});

			it('should add the `payload` survey to the context', () => {
				const nextState = surveysMachine.transition('empty', {
					type: 'NEW_SURVEY',
					survey: { id: 0, name: 'Name' }
				});

				expect(nextState.context.surveys.length).toBe(1);
			});
		});

		describe('and `CLEAR` event occurs', () => {
			it('should be in `empty` state', () => {
				surveysMachine.context.surveys = [
					{ id: 1, name: 'Name' },
					{ id: 2, name: 'name' }
				];

				const nextState = surveysMachine.transition('idle', {
					type: 'CLEAR'
				});

				expect(nextState.matches('empty')).toBe(true);
			});

			it('should contain empty array context', () => {
				const nextState = surveysMachine.transition('idle', {
					type: 'CLEAR'
				});

				expect(nextState.matches('empty')).toBe(true);
			});
		});

		describe('and `DELETE_SURVEY` event occurs', () => {
			it('should be in `idle` state', () => {
				const nextState = surveysMachine.transition('idle', {
					type: 'DELETE_SURVEY',
					id: 0
				});

				expect(nextState.matches('idle')).toBe(true);
			});

			it('should delete the survey with `payload` id from context', () => {
				surveysMachine.context.surveys = [
					{ id: 1, name: 'Name' },
					{ id: 2, name: 'name' }
				];

				const nextState = surveysMachine.transition('idle', {
					type: 'DELETE_SURVEY',
					id: 1
				});

				expect(nextState.context.surveys.length).toBe(1);
			});
		});
	});
});
