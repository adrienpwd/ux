export const setSortBy = (sortBy, sortDirection) => (
	{
		type: 'LIST_SET_SORT_BY',
		payload: {
			sortBy,
			sortDirection
		}
	}
);

export default {
	setSortBy
};
