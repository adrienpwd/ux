import {
	fromJS,
	List,
	Map
} from 'immutable';
import data from './../../../data.js';

const INITIAL_STATE = fromJS({
	data: fromJS(data),
	isFetchingUsers: false,
	isFetchedUsers: false,
	originalData: fromJS(data),
	queryString: "",
	sortBy: "name",
	sortDirection: "ASC"
});

const filterList = (list, queryString) => {
	let filteredList = List();

	if (queryString && queryString.length === 0) return state.get('originalData');

	if (queryString && queryString.length) {
		list.forEach((record) => {
			let match = false;
			record.some((info) => {
				if (String(info).indexOf(queryString) > -1) {
					match = true;
					return true;
				}
			});
			if (match) {
				filteredList = filteredList.push(record)
			};
		});
	} else {
		filteredList = list;
	}

	return filteredList;
};

const sortList = (list, sortBy, sortDirection) => {
	return list
		.sortBy(record => record.get(sortBy))
		.update(list => (sortDirection === "DESC" ? list.reverse() : list));
};


const onSetQueryString = (state, {queryString}) => {
	return state.merge({
		data: filterList(state.get('originalData'), queryString),
		queryString
	});
};

const onSetSortBy = (state, {sortBy, sortDirection}) => {
	return state.merge({
		data: sortList(state.get('data'), sortBy, sortDirection),
		sortBy,
		sortDirection
	});
};

const onFetchUsers = (state) => state.set('isFetchingUsers', true);

const onFetchUsersSuccess = (state, {users}) => {
	console.log(fromJS(users).flatten(true).toJS());
	return state;
	// return state.merge({
	// 	data: fromJS(users),
	// 	originalData: fromJS(users),
	// 	isFetchingUsers: false,
	// 	isFetchedUsers: true
	// });
};

export const ListReducer = (state = INITIAL_STATE, action = {}) => {
	const {payload, type} = action;

	switch (type) {
		case 'LIST_SET_QUERY_STRING':
			return onSetQueryString(state, payload);

		case 'LIST_SET_SORT_BY':
			return onSetSortBy(state, payload);

		case 'LIST_FETCH_USERS':
			return onFetchUsers(state);

		case 'LIST_FETCH_USERS_SUCCESS':
			return onFetchUsersSuccess(state, payload);

		default:
			return state;
	}
};

export default ListReducer;
