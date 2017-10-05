import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import {routeCodes} from '../../routes';
import styles from './style.less';

export default class Bar extends PureComponent {
	static displayName = "AppBar";

	render () {
		// <Link className={styles.link} to={routeCodes.ROOT}>Home</Link>
		// <Link className={styles.link} to={"/components/list"}>Components</Link>

		return (
			<div className={styles.bar}>
			</div>
		);
	}

}
