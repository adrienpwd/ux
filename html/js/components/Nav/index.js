import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {routeCodes} from '../../routes';
import styles from './style.less';

export default class Bar extends PureComponent {
	static displayName = "AppBar";

	render () {

		return (
			<div className={styles.bar}>
				<Link className={styles.link} to={routeCodes.ROOT}>Home</Link>
				<Link className={styles.link} to={routeCodes.COMPONENTS}>Components</Link>
			</div>
		);
	}

}
