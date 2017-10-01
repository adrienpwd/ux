import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import styles from './styles.less';

export default class Components extends PureComponent {
	static displayName = "Components";

	render () {
		return (
			<div className={styles.componentsContainer}>
				<Link to="/components/list">List</Link>
			</div>
		);
	}
}
