export const getFirstPath = (s: string): string => {
	const pattern = /\/(\w+)\/\w+/;
	const result = s.match(pattern);
	return result ? `/${result[1]}` : '/';
};
