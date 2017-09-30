import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';

export default class Components extends PureComponent {
	static displayName = "Components";

	render () {
		return (
			<div>
				<h1>Some components:</h1>
				<Link to="/components/list">List</Link>
			</div>
		);
	}
}
