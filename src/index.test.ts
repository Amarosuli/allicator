import { getFirstPath } from '$lib/helpers';
import { describe, it, expect } from 'vitest';

describe('Get first pathname', () => {
	const pathname = '/engine_family/create?id="abcdefg"';
	it('get the first pathname', () => {
		expect(getFirstPath(pathname)).equal('/engine_family');
	});
});
