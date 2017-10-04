import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import styles from './styles.less';

export default class Components extends PureComponent {
	static displayName = "Components";

	render () {
		return (
			<div className={styles.componentsContainer}>
				<h4>Avalaible components:</h4>
				<Link
					className={styles.componentsTitle}
					to="/components/list">List</Link>
				<Link
					className={styles.componentsTitle}
					to="/components/profilePicture">Profile Picture</Link>
			</div>
		);
	}
}
