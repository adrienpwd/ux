import React, {PureComponent} from 'react';
import classnames from 'classnames';
import styles from './styles.less';

export default class ProfilePic extends PureComponent {
	static displayName = "ProfilePic";

	render () {
		const {
			circle,
			className,
			height,
			src,
			style,
			width
		} = this.props;

		const pictureProfileClasses = classnames(
			styles.profilePic,
			circle ? styles.profilePicCircle : null
		);

		return (
			<img
				className={pictureProfileClasses}
				src={src}
				height={height}
				width={width} />
		);
	}

}
