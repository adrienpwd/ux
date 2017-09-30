import React, {PureComponent} from 'react';
import styles from './App.less';

export default class App extends PureComponent {
	static displayName = "App";

	render () {
		return (
			<div className={styles.appContainer}>
				Test
			</div>
		);
	}

}
