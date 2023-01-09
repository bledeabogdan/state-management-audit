import { error } from '@sveltejs/kit';

/** @type {import('../$types').PageLoad} */
export function load({ params }: any) {
	if (params.slug) {
		return {
			id: params.slug
		};
	}

	throw error(404, 'Not found');
}
