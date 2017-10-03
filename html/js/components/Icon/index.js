import React, {PureComponent} from 'react';
import classnames from 'classnames';
import styles from './Icon.less';

export default class Icon extends PureComponent {
	static displayName = "Icon";

	render () {
		const {
			className,
			name
		} = this.props;

		console.log(className);

		const classes = classnames(
			styles.main,
			className
		);

		const IconSvg = require(`!!babel-loader!svg-react-loader!./../../icons/${name}.svg`);

		return <IconSvg className={classes} />;
	}
}
