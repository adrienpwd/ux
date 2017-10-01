import {
	fromJS,
	Map
} from 'immutable';
import data from './../../../data.js';

const INITIAL_STATE = fromJS({
	data: fromJS(data),
	sortBy: "name",
	sortDirection: "ASC"
});

const sortList = (list, sortBy, sortDirection) => {
	let sortedData = list.sortBy(item => item.get(sortBy));

	sortedData = sortedData.update(
		list => (sortDirection === "DESC" ? sortedData.reverse() : sortedData)
	);

	return sortedData;
};

const onSetSortBy = (state, {sortBy, sortDirection}) => {
	return state.merge({
		data: sortList(state.get('data'), sortBy, sortDirection),
		sortBy,
		sortDirection
	});
};

export const ListReducer = (state = INITIAL_STATE, action = {}) => {
	const {payload, type} = action;

	switch (type) {
		case 'LIST_SET_SORT_BY':
			return onSetSortBy(state, payload);
		default:
			return state;
	}
};

export default ListReducer;
