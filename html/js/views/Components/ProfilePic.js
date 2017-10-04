import React, {PureComponent} from 'react';
import ProfilePic from './../../components/ProfilePic';
import styles from './styles.less';

export default class MyProfilePic extends PureComponent {
	static displayName = "MyProfilePic";

	render () {

		return (
			<div className={styles.picturesContainer}>
				<ProfilePic
					circle={true}
					src="https://randomuser.me/api/portraits/med/men/3.jpg"
					height={"68"}
					width={"68"} />

				<ProfilePic
					src="https://randomuser.me/api/portraits/med/men/79.jpg"
					height={"68"}
					width={"68"} />

				<ProfilePic
					circle={true}
					src="https://randomuser.me/api/portraits/women/83.jpg"
					height={"150"}
					width={"150"} />

			</div>
		);
	}

}
