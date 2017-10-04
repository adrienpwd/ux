import React, {PureComponent} from 'react';
import classnames from 'classnames';
import styles from './Icon.less';

export default class Icon extends PureComponent {
	static displayName = "Icon";

	render () {
		const {
			className,
			name,
			onClick
		} = this.props;

		const classes = classnames(
			styles.main,
			className
		);

		if (!name) return <span>empty</span>;
		const IconSvg = require(`!!babel-loader!svg-react-loader!./../../icons/${name}.svg`);

		return (
			<IconSvg
				className={classes}
				onClick={this._handleClick} />
		);
	}

	_handleClick = () => {
		const {onClick} = this.props;
		if (typeof onClick !== 'function') return;
		onClick();
	};
}
