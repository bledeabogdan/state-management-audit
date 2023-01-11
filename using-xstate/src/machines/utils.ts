import type { SurveyData } from './types';

export const surveysDataToFetch: SurveyData[] = [...Array(20).keys()].map((x) => ({
	id: x,
	name: `Name${x}`
}));

export const fetchSurveys = async () => {
	const res = await new Promise((resolve) => {
		setTimeout(() => {
			resolve(surveysDataToFetch);
		}, 2000);
	});

	return res;
};
