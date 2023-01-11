import type { SurveyData } from './types';

export const surveysDataToFetch: SurveyData[] = [...Array(20).keys()].map((x) => ({
	id: x,
	name: `Name${x}`
}));
