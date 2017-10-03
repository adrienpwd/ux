import {
	AutoSizer,
	Column,
	Table
} from 'react-virtualized';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import {
	fetchUsers,
	setActiveColumn,
	setQueryString,
	setSortBy
} from './../../actions/AppActionCreators'
import MDSpinner from "react-md-spinner";
import moment from 'moment';
import styles from './List.less';

const HEADER_HEIGHT = 40;
const ROW_HEIGHT = 80;
const NUMBER_OF_ROWS = 8;
const LIST_HEIGHT = ROW_HEIGHT * NUMBER_OF_ROWS;
const OVER_SCAN = 4;

export class MyList extends PureComponent {
	static displayName = "List";

	componentDidMount () {
		const {
			fetchUsers,
			isFetchedUsers,
			isFetchingUsers
		} = this.props;

		if (!isFetchingUsers && !isFetchedUsers) {
			fetchUsers(15);
		};
	}

	render () {
		const {
			activeColumns,
			data,
			fetchUsersError,
			isFetchedUsers,
			isFetchingUsers,
			sortBy,
			sortDirection
		} = this.props;

		const isActivePicture = activeColumns.get('picture');
		const isActiveName = activeColumns.get('name');
		const isActiveGender = activeColumns.get('gender');
		const isActiveNat = activeColumns.get('nat');
		const isActiveEmail = activeColumns.get('email');
		const isActiveCell = activeColumns.get('cell');
		const isActivePhone = activeColumns.get('phone');
		const isActiveLocation = activeColumns.get('location');
		const isActiveDob = activeColumns.get('dob');

		if (fetchUsersError && fetchUsersError.length) {
			return (
				<div className={styles.listContainer}>
					{error}
				</div>
			);
		};

		if (!isFetchedUsers || isFetchingUsers) {
			return (
				<div className={styles.listContainer}>
					<MDSpinner
						className={styles.spinner}
						size={150} />
				</div>
			);
		};

		return (
			<div className={styles.listContainer}>
				<div className={styles.checkboxesContainer}>
					{this._renderFilter()}
					{this._renderCheckboxes()}
				</div>
				<AutoSizer disableHeight={true}>
						{({width}) =>
							<Table
								ref="Table"
								disableHeader={false}
								headerClassName={styles.headerColumn}
								headerHeight={HEADER_HEIGHT}
								height={LIST_HEIGHT}
								overscanRowCount={OVER_SCAN}
								rowClassName={this._setRowClassName}
								rowHeight={ROW_HEIGHT}
								rowGetter={({index}) => this._getRow(data, index)}
								rowCount={data.size}
								sort={this._sort}
								sortBy={sortBy}
								sortDirection={sortDirection}
								width={width} >
								{isActivePicture && <Column
									cellRenderer={this._renderFullProfilePic}
									className={styles.column}
									dataKey="picture"
									label="Picture"
									width={100} />}
								{isActiveName && <Column
									cellRenderer={this._renderFullName}
									className={styles.column}
									dataKey="name"
									label="Name"
									width={200} />}
								{isActiveGender && <Column
									className={styles.column}
									dataKey="gender"
									label="Gender"
									width={90} />}
								{isActiveNat && <Column
									className={styles.column}
									dataKey="nat"
									disableSort={true}
									label="Nat."
									width={80} />}
								{isActiveEmail && <Column
									className={styles.column}
									dataKey="email"
									label="E-mail"
									width={260} />}
								{isActiveCell && <Column
									className={styles.column}
									dataKey="cell"
									label="Cell"
									width={150} />}
								{isActivePhone && <Column
									className={styles.column}
									dataKey="phone"
									label="Phone"
									width={150} />}
								{isActiveLocation && <Column
									cellRenderer={this._renderFullLocation}
									className={styles.column}
									dataKey="location"
									label="Location"
									width={450} />}
								{isActiveDob && <Column
									cellRenderer={this._renderDob}
									className={styles.column}
									dataKey="dob"
									label="Born"
									width={120} />}
						</Table>}
				</AutoSizer>
			</div>
		);
	}

	_renderFilter = () => {
		const {
			data,
			queryString
		} = this.props;

		return (
			<div>
				<input
					className={styles.filterInput}
					type="text"
					name="name"
					onChange={this._handleInputChange}
					placeholder="Filter List"
					value={queryString} />
				<span>
					{data.size} result(s)
				</span>
			</div>
		);
	};

	_renderCheckboxes = () => {
		const {activeColumns} = this.props;
		const fields = ["picture", "name", "nat", "email", "cell", "phone", "location", "dob"];

		return fields.map((field) => {
			return (
				<div key={field}>
					<input
						checked={activeColumns.get(field)}
						name={field}
						onChange={this._handleCheckboxeChange}
						type="checkbox"
						value={field} />
					{field}
				</div>
			);
		});
	};

	_renderFullProfilePic = ({cellData}) => {
		return (
				<img
					className={styles.profilePic}
					src={`${cellData.get('medium')}`}
					alt="profile picture"
					height={"68"}
					width={"68"} />
		);
	};

	_renderFullName = ({cellData}) => `${cellData.get('title')} ${cellData.get('first')} ${cellData.get('last')}`

	_renderFullLocation = ({cellData}) => {
		const street = this._getStreet(cellData);
		const city = this._getCity(cellData);
		const postalCode = this._getPostCode(cellData);
		const state = this._getState(cellData);

		return `${street} ${city} ${postalCode} ${state}`;
	};

	_getStreet = (cellData) => cellData.get('street');

	_getCity = (cellData) => cellData.get('city');

	_getPostCode = (cellData) => cellData.get('postcode');

	_getState = (cellData) => cellData.get('state');

	_renderDob = ({cellData}) => moment(cellData).format('YYYY-MM-DD');

	_handleInputChange = (event) => {
		const {setQueryString} = this.props;

		setQueryString(event.target.value);
	};

	_handleCheckboxeChange = (event) => {
		const {setActiveColumn} = this.props;
		setActiveColumn(event.target.value);
	};

	_filterList = (queryString) => {
		const {filterList} = this.props;

		filterList(queryString);
	};

	_setRowClassName({index}) {
    if (index < 0) {
      return [styles.row, styles.headerRow];
    } else {
      return index % 2 === 0 ? [styles.row, styles.evenRow] : [styles.row, styles.oddRow];
    }
  };

	_getRow = (list, index) => list.get(index % list.size);

	_sort = ({sortBy, sortDirection}) => this.props.setSortBy(sortBy, sortDirection);

}

// Setting up the props that come from reducers through connect
const mapStateToProps = (state) => ({
		data: state.ListReducer.get('data', Map()),
		fetchUsersError: state.ListReducer.get('fetchUsersError'),
		isFetchedUsers: state.ListReducer.get('isFetchedUsers'),
		isFetchingUsers: state.ListReducer.get('isFetchingUsers'),
		activeColumns: state.ListReducer.get('activeColumns'),
		queryString: state.ListReducer.get('queryString', ''),
		sortBy: state.ListReducer.get('sortBy', 'name'),
		sortDirection: state.ListReducer.get('sortDirection', 'ASC')
});

// All the Actions
const mapDispatchToProps = {
	fetchUsers,
	setActiveColumn,
	setQueryString,
	setSortBy
};

export default connect(mapStateToProps, mapDispatchToProps)(MyList);
