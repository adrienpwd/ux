import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import React, {PureComponent} from 'react';
import Components from './views/Components';
import Home from './views/Home';
import MyList from './components/List';
import MyProfilePic from './views/Components/ProfilePic';
import MyIcons from './views/Components/Icons';
import Nav from './views/Nav';
import styles from './AppStyles.less'

export const routeCodes = {
	ROOT: "/",
	COMPONENTS: "/",
	LIST: "/list",
	PROFILEPIC: "/profilePicture",
	ICONS: "/icons"
};

class Routes extends PureComponent {

	static displayName="Routes";

	render () {
		// <Route component={Home} exact path={routeCodes.ROOT} />
		return (
			<Router>
				<div className={styles.appContainer}>
					<Nav />
					<div className={styles.bodyContainer}>
						<Route component={MyList} path={routeCodes.ROOT} />
					</div>
				</div>
			</Router>
		);
	}
}

export default Routes;
