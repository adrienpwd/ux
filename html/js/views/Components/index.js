import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import styles from './styles.less';

export default class Components extends PureComponent {
	static displayName = "Components";

	render () {
		return (
			<div className={styles.componentsContainer}>
				<div className={styles.linksContainer}>
					<Link
						className={styles.componentsTitle}
						to="/profilePicture">
							Profile Picture
					</Link>
					<Link
						className={styles.componentsTitle}
						to="/list">
							List
					</Link>
					<Link
						className={styles.componentsTitle}
						to="/icons">
							Icons
					</Link>
				</div>
			</div>
		);
	}
}
