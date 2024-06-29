import { Client, createPageFile } from '$lib/helpers';
import { describe, it, expect } from 'vitest';

describe('class PageFile', () => {
	it('should be an instance of class Client', () => {
		expect(createPageFile()).instanceof(Client);
	});

	it('should be an instance of class Client', () => {
		let pageFile = createPageFile().init('customers');
		expect(pageFile.getState());
	});
});
