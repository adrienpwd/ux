import {
	AutoSizer,
	Column,
	Table
} from 'react-virtualized';
import React, {PureComponent} from 'react';
import classnames from 'classnames';
import {capitalizeFirst} from './../../utils/strings';
import {connect} from 'react-redux';
import Icon from './../Icon';
import {Map} from 'immutable';
import {
	fetchUsers,
	setActiveColumn,
	setQueryString,
	setSortBy,
	toggleSettings
} from './../../actions/AppActionCreators'
import MDSpinner from "react-md-spinner";
import moment from 'moment';
import ProfilePic from './../ProfilePic'
import styles from './List.less';

const HEADER_HEIGHT = 40;
const ROW_HEIGHT = 80;
const NUMBER_OF_ROWS = 8;
const LIST_HEIGHT = ROW_HEIGHT * NUMBER_OF_ROWS + HEADER_HEIGHT;
const OVER_SCAN = 4;
const FIELDS = ["Picture", "Name", "Gender", "Nat", "Email", "Cell", "Phone", "Location", "Dob"];

export class MyList extends PureComponent {
	static displayName = "List";

	componentDidMount () {
		const {
			fetchUsers,
			isFetchedUsers,
			isFetchingUsers
		} = this.props;

		if (!isFetchingUsers && !isFetchedUsers) {
			fetchUsers(500);
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
				<div className={styles.controlsContainer}>
					{this._renderFilter()}
					{this._renderNbResults()}
					{this._renderCheckboxes()}
					{this._renderSettingsIcon()}
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
									disableSort={true}
									label=""
									minWidth={68}
									width={100} />}
								{isActiveName && <Column
									cellRenderer={this._renderFullName}
									className={styles.column}
									dataKey="name"
									headerRenderer={this._renderPeopleHeader}
									label="Name"
									minWidth={110}
									width={200} />}
								{isActiveGender && <Column
									className={styles.column}
									dataKey="gender"
									headerRenderer={this._renderGenderHeader}
									label="Gender"
									width={90} />}
								{isActiveNat && <Column
									className={styles.column}
									dataKey="nat"
									disableSort={true}
									headerRenderer={this._renderNatHeader}
									minWidth={60}
									width={60} />}
								{isActiveEmail && <Column
									className={styles.column}
									headerRenderer={this._renderEmailHeader}
									dataKey="email"
									label="E-mail"
									minWidth={200}
									width={260} />}
								{isActiveCell && <Column
									className={styles.column}
									dataKey="cell"
									headerRenderer={this._renderCellHeader}
									label="Cell"
									minWidth={120}
									width={120} />}
								{isActivePhone && <Column
									className={styles.column}
									dataKey="phone"
									headerRenderer={this._renderPhoneHeader}
									label="Phone"
									minWidth={120}
									width={120} />}
								{isActiveLocation && <Column
									cellRenderer={this._renderFullLocation}
									className={styles.column}
									dataKey="location"
									headerRenderer={this._renderLocationHeader}
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

	_renderPeopleHeader = () => (
		<div>
			<Icon className={styles.icon} name="people" />
			{this._getSortIcon("name")}
		</div>
	);

	_renderEmailHeader = () => (
		<div>
			<Icon className={styles.icon} name="email" />
			{this._getSortIcon("email")}
		</div>
	);

	_renderGenderHeader = () => {
		const {
			sortBy,
			sortDirection
		} = this.props;

		const isSorted = sortBy === "gender";
		if (!isSorted) return "M/F";

		return sortDirection === "ASC" ? "F->M" : "M->F";
	};

	_renderCellHeader = () => (
		<div>
			<Icon className={styles.icon} name="cell" />
			{this._getSortIcon("cell")}
		</div>
	);

	_renderNatHeader = () => (
		<div>
			<Icon className={styles.icon} name="flag" />
			{this._getSortIcon("nat")}
		</div>
	);

	_renderPhoneHeader = () => (
		<div>
			<Icon className={styles.icon} name="phone" />
			{this._getSortIcon("phone")}
		</div>
	);

	_renderLocationHeader = () => (
		<div>
			<Icon className={styles.icon} name="location" />
			{this._getSortIcon("location")}
		</div>
	);

	_getSortIcon = (header) => {
		const {
			queryString,
			sortBy,
			sortDirection
		} = this.props;

		const isSorted = sortBy === header;
		const arrow = sortDirection === "ASC" ? "arrow_up" : "arrow_down";

		if (!queryString && isSorted) {
			return <Icon className={styles.iconSorted} name={`${arrow}`} />;
		}

		return null;
	};

	_renderFilter = () => {
		const {queryString} = this.props;
		const filterInputClasses = classnames(
			styles.filterInput,
			queryString && queryString.length ? styles.filterInputActive : null
		);

		return (
			<div>
				<Icon
					className={styles.searchIcon}
					name="search" />
				<input
					className={filterInputClasses}
					type="text"
					name="name"
					onChange={this._handleInputChange}
					value={queryString} />
					{queryString && queryString.length && <Icon
						className={[styles.icon, styles.clearIcon]}
						name="clear"
						onClick={this._clearQueryString} />}
			</div>
		);
	};

	_renderCheckboxes = () => {
		const {
			activeColumns,
			isSettingsOpen
		} = this.props;

		const checkboxContainerClasses = classnames(
			styles.checkboxContainer,
			isSettingsOpen ? styles.checkboxContainerActive : null
		);

		const checkboxes = FIELDS.map((field) => {

			const checkboxContainerLabelClasses = classnames(
				styles.checkboxContainerLabel,
				activeColumns.get(field.toLowerCase()) ? styles.checkboxContainerLabelActive : null
			);

			return (
				<div
					className={styles.checkbox}
					key={field}>
					<input
						checked={activeColumns.get(field.toLowerCase())}
						className={styles.checkboxContainerInput}
						name={field}
						onChange={this._handleCheckboxeChange}
						type="checkbox"
						value={field} />
					<span className={checkboxContainerLabelClasses}>
						{field}
					</span>
				</div>
			);
		});

		return (
			<div className={checkboxContainerClasses}>
				{checkboxes}
			</div>
		);
	};

	_renderSettingsIcon = () => {
		const {
			activeColumns,
			isSettingsOpen,
			toggleSettings
		} = this.props;

		const iconClasses = classnames(
			styles.icon,
			styles.settingsIcon,
			isSettingsOpen ? styles.settingsIconActive : null
		);

		return (
			<Icon
				className={iconClasses}
				name="settings"
				onClick={toggleSettings} />
		);
	};

	_renderNbResults = () => {
		const {data} = this.props;
		const result = data && data.size > 1 ? "entries" : "entry";

		return (
			<span className={styles.nbResults}>
				{data.size} {result}
			</span>
		);
	};

	_renderFullProfilePic = ({cellData}) => {
		return (
			<ProfilePic
				src={`${cellData.get('medium')}`}
				alt="profile picture"
				height={"68"}
				width={"68"} />
		);
	};

	_renderFullName = ({cellData}) => {
		const title = capitalizeFirst(cellData.get('title'));
		const first = capitalizeFirst(cellData.get('first'));
		const last = capitalizeFirst(cellData.get('last'));
		const name = `${title} ${first} ${last}`;

		return name;
	}

	_renderFullLocation = ({cellData}) => {
		const street = capitalizeFirst(cellData.get('street', ""));
		const city = capitalizeFirst(cellData.get('city', ""));
		const postcode = capitalizeFirst(cellData.get('postcode', ""));
		const state = capitalizeFirst(cellData.get('state', ""));

		return `${street} ${city} ${postcode} ${state}`;
	};

	_renderDob = ({cellData}) => moment(cellData).format('YYYY-MM-DD');

	_handleInputChange = (event) => {
		const {setQueryString} = this.props;

		setQueryString(event.target.value);
	};

	_handleCheckboxeChange = (event) => {
		const {setActiveColumn} = this.props;

		setActiveColumn(event.target.value.toLowerCase());
	};

	_clearQueryString = () => {
		const {setQueryString} = this.props;

		setQueryString("");
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

const mapStateToProps = (state) => ({
	activeColumns: state.ListReducer.get('activeColumns'),
	data: state.ListReducer.get('data', Map()),
	fetchUsersError: state.ListReducer.get('fetchUsersError'),
	isFetchedUsers: state.ListReducer.get('isFetchedUsers'),
	isFetchingUsers: state.ListReducer.get('isFetchingUsers'),
	isSettingsOpen: state.ListReducer.get('isSettingsOpen'),
	queryString: state.ListReducer.get('queryString', ''),
	sortBy: state.ListReducer.get('sortBy', 'name'),
	sortDirection: state.ListReducer.get('sortDirection', 'ASC')
});

const mapDispatchToProps = {
	fetchUsers,
	setActiveColumn,
	setQueryString,
	setSortBy,
	toggleSettings
};

export default connect(mapStateToProps, mapDispatchToProps)(MyList);
