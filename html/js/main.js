import {applyMiddleware, compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import rootReducer from './reducers';
import Routes from './routes';
import thunk from 'redux-thunk';

const app = document.getElementById('root');
const middleware = applyMiddleware(thunk);
const enhancer = compose(middleware);

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
	<Provider store={store}>
		<Routes />
	</Provider>,
	app
);
