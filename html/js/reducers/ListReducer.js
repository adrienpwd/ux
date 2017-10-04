import {
	fromJS,
	List,
	Map
} from 'immutable';

const INITIAL_STATE = fromJS({
	data: Map(),
	fetchUsersError: null,
	isFetchingUsers: false,
	isFetchedUsers: false,
	activeColumns: {
		picture: true,
		name: true,
		nat: false,
		email: true,
		cell: true,
		phone: false,
		dob: false,
		location: true,
		gender: false
	},
	originalData: Map(),
	queryString: "",
	isSettingsOpen: false,
	sortBy: "name",
	sortDirection: "ASC"
});

const lookupFields = [
	"name",
	"nat",
	"email",
	"cell",
	"phone",
	"dob",
	"location"
];

const filterList = (list, queryString) => {
	let filteredList = List();

	if (queryString && queryString.length === 0) return state.get('originalData');

	if (queryString && queryString.length) {
		list.forEach((record) => {
			lookupFields.some((field) => {
				const node = record.get(field);

				if (lookup(queryString, node).length) {
					filteredList = filteredList.push(record)
					return true;
				}

				if (node && node.size) {
					node.some((childNode) => {
						if (lookup(queryString, childNode).length) {
							filteredList = filteredList.push(record)
							return true;
						}
					});
				};

			});
		});
	} else {
		filteredList = list;
	}

	return filteredList;
};

const lookup = (test, record) => {
	const regex = new RegExp(test.toLowerCase(), "g");
	return String(record).match(regex) || [];
};

const sortList = (list, sortBy, sortDirection) => {
	let sortedList;

	switch(sortBy) {
		case "name":
			sortedList = list.sortBy(record => record.getIn(['name', 'last']));
			return updateList(sortedList, sortDirection);
		case "gender":
			sortedList = list.sortBy(record => record.get('gender'));
			return updateList(sortedList, sortDirection);
		case "email":
			sortedList = list.sortBy(record => record.get('email'));
			return updateList(sortedList, sortDirection);
		case "cell":
			sortedList = list.sortBy(record => record.get('cell'));
			return updateList(sortedList, sortDirection);
		case "phone":
			sortedList = list.sortBy(record => record.get('phone'));
			return updateList(sortedList, sortDirection);
		case "location":
			sortedList = list.sortBy(record => record.getIn(['location', 'city']));
			return updateList(sortedList, sortDirection);
		case "dob":
			sortedList = list.sortBy(record => record.get('dob'));
			return updateList(sortedList, sortDirection);
		default:
			return list;
	};
};

const updateList = (list, sortDirection) => {
	return list.update((myList) => (sortDirection === "DESC" ? myList.reverse() : myList));
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

const onSetActiveColumn = (state, {field}) => {
	const currentValue = state.getIn(['activeColumns', field]);

	return state.setIn(['activeColumns', field], !currentValue);
};

const onToggleSettings = (state) => {
	const currentValue = state.get('isSettingsOpen');

	return state.set('isSettingsOpen', !currentValue);
};

const onFetchUsers = (state) => state.set('isFetchingUsers', true);

const onFetchUsersSuccess = (state, {users}) => {
	console.log(users);
	return state.merge({
		data: sortList(fromJS(users), "name", "ASC"),
		originalData: fromJS(users),
		isFetchingUsers: false,
		isFetchedUsers: true
	});
};

const onFetchUsersError = (state) => state.set('fetchUsersError', error);

export const ListReducer = (state = INITIAL_STATE, action = {}) => {
	const {payload, type} = action;

	switch (type) {
		case 'LIST_TOGGLE_SETTINGS':
			return onToggleSettings(state, payload);

		case 'LIST_SET_QUERY_STRING':
			return onSetQueryString(state, payload);

		case 'LIST_SET_SORT_BY':
			return onSetSortBy(state, payload);

		case 'LIST_SET_ACTIVE_COLUMN':
			return onSetActiveColumn(state, payload);

		case 'LIST_FETCH_USERS':
			return onFetchUsers(state);

		case 'LIST_FETCH_USERS_SUCCESS':
			return onFetchUsersSuccess(state, payload);

		default:
			return state;
	}
};

export default ListReducer;
