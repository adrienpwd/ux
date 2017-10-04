import React, {PureComponent} from 'react';
import ProfilePic from './ProfilePic';

export default class MyProfilePic extends PureComponent {
	static displayName = "MyProfilePic";

	render () {

		return (
			<ProfilePic
				src="https://randomuser.me/api/portraits/med/men/3.jpg"
				height={"68"}
				width={"68"} />
		);
	}

}
