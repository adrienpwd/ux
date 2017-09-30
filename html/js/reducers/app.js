import {Map} from 'immutable';

const INITIAL_STATE = Map({
	listExpanded: true,
	currentElement: "",
	search: ""
});

const onToggleList = (state, {expanded}) => state.set('listExpanded', expanded);

const onSetElement = (state, {element}) => state.set('currentElement', element);

const onSearch = (state, {value}) => state.set('search', value);


export const AppReducer = (state = INITIAL_STATE, action = {}) => {
	const {payload, type} = action;

	switch (type) {
		case 'SET_ELEMENT':
			return onSetElement(state, payload);
		case 'TOGGLE_LIST':
			return onToggleList(state, payload);
		case 'SET_SEARCH':
			return onSearch(state, payload);
		default:
			return state;
	}
};

export default AppReducer;