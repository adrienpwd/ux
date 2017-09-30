import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import React, {PureComponent} from 'react';
import Components from './views/Components';
import Home from './views/Home';
import MyList from './components/List';
import Nav from './components/Nav';
import styles from './AppStyles.less'

export const routeCodes = {
	ROOT: "/",
	COMPONENTS: "/components",
	LIST: "/components/list"
};

class Routes extends PureComponent {

	static displayName="Routes";

	render () {
		return (
			<Router>
				<div className={styles.appContainer}>
					<Nav />
					<div className={styles.bodyContainer}>
						<Route component={Home} exact path={routeCodes.ROOT} />
						<Route component={Components} path={routeCodes.COMPONENTS} />
						<Route component={MyList} path={routeCodes.LIST} />
					</div>
				</div>
			</Router>
		);
	}
}

export default Routes;
