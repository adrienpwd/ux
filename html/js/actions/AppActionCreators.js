export const toggleSettings = (isOpen) => (
	{
		type: 'LIST_TOGGLE_SETTINGS',
		payload: {isOpen}
	}
);

export const setSortBy = (sortBy, sortDirection) => (
	{
		type: 'LIST_SET_SORT_BY',
		payload: {
			sortBy,
			sortDirection
		}
	}
);

export const setQueryString = (queryString) => (
	{
		type: 'LIST_SET_QUERY_STRING',
		payload: {queryString}
	}
);

export const setActiveColumn = (field) => (
	{
		type: 'LIST_SET_ACTIVE_COLUMN',
		payload: {field}
	}
);


const fetchUsersRequest = (number) => fetch(`https://randomuser.me/api/?results=${number}`);

export const fetchUsers = (number) => {
	return (dispatch) => {
		dispatch({
			type: 'LIST_FETCH_USERS',
		});
		return fetchUsersRequest(number)
		.then((response) => {
				return response.json()
				.then((json) => dispatch({
					type: 'LIST_FETCH_USERS_SUCCESS',
					payload: {users: json.results}
				}))
			},
      error => dispatch(() => ({
				type: 'LIST_FETCH_USERS_ERROR',
				error
			}))
    );
	};
};
