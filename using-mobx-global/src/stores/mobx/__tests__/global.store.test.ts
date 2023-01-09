import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { appStore } from '../global.store';

afterEach(() => {
	appStore.clear();
});

describe('AppStore', () => {
	describe('surveys substore', () => {
		describe('when is empty', () => {
			it('should add a new survey on `addSurvey` action', () => {
				appStore.surveysStore.addSurvey({ id: 1, name: 'Name' });

				expect(appStore.surveysStore.surveys.length).toBe(1);
			});
		});
	});
});
