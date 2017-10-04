import React, {PureComponent} from 'react';
import Icon from './../../components/Icon';
import styles from './styles.less';

export default class MyIcons extends PureComponent {
	static displayName = "MyIcons";

	render () {

		return (
			<div className={styles.iconsContainer}>
				<Icon
					className={styles.iconBlack}
					name="people" />
				<Icon
					className={styles.iconBlack}
					name="cell" />
			</div>
		);
	}

}
