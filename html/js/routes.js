import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import React, {PureComponent} from 'react';
import App from './App';
import Home from './views/Home';

export const routeCodes = {
	ROOT: "/",
	HOME: "/home"
};

class Routes extends PureComponent {

	static displayName="Routes";

	render () {
		return (
			<Router>
				<Route component={App} path={routeCodes.ROOT} />
			</Router>
		);
	}
}

export default Routes;
