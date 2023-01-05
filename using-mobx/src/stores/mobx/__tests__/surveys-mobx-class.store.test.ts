import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { store } from '../surveys-mobx-class.store';

afterEach(() => {
	store.clear();
});

describe('SurveysStore(Class)', () => {
	describe('when is empty', () => {
		describe('and `addSurvey` action is called', () => {
			it('should contain the survey', () => {
				store.addSurvey({ id: 1, name: 'Name' });

				expect(store.surveys.length).toBe(1);
			});
		});
	});

	describe('when is not empty', () => {
		beforeEach(() => {
			store.addSurvey({ id: 1, name: 'Name' });
		});

		describe('and `addSurvey` is called', () => {
			it('should contain the survey', () => {
				store.addSurvey({ id: 2, name: 'Name2' });

				expect(store.surveys.length).toBe(2);
			});
		});

		describe('and `deleteSurvey` is called with `id` param equals to 1', () => {
			beforeEach(() => {
				store.deleteSurvey(1);
			});
			it('should remove the survey with id 1', () => {
				expect(store.surveys.find((x) => x.id === 1)).toBe(undefined);
			});

			it('should be empty', () => {
				expect(store.surveys.length).toBe(0);
			});
		});

		describe('and `clear` action is called', () => {
			it('should contain 0 surveys', () => {
				store.clear();

				expect(store.surveys.length).toBe(0);
			});
		});
	});
});
