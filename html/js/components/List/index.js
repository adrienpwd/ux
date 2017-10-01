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
	setQueryString,
	setSortBy
} from './../../actions/AppActionCreators'
import moment from 'moment';
import styles from './List.less';

const HEADER_HEIGHT = 30;
const ROW_HEIGHT = 30;
const NUMBER_OF_ROWS = 15;
const LIST_HEIGHT = ROW_HEIGHT * NUMBER_OF_ROWS;
const OVER_SCAN = 4;

export class MyList extends PureComponent {
	static displayName = "List";

	componentDidMount () {
		const {fetchUsers} = this.props;
		fetchUsers(1000);
	}

	render () {
		const {
			data,
			queryString,
			sortBy,
			sortDirection
		} = this.props;

		return (
			<div>
				<label>
					Filter
					<input
						type="text"
						name="name"
						onChange={this.handleInputChange}
						value={queryString} />
				</label>

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
								<Column
									cellRenderer={this._renderFullName}
									className={styles.column}
									dataKey="name"
									label="Name (sort by lastname)"
									width={200} />
								<Column
									className={styles.column}
									dataKey="nat"
									disableSort={true}
									label="Nat."
									width={80} />
								<Column
									className={styles.column}
									dataKey="email"
									label="E-mail"
									width={260} />
								<Column
									className={styles.column}
									dataKey="cell"
									label="Phone"
									width={150} />
								<Column
									cellRenderer={this._renderFullLocation}
									className={styles.column}
									dataKey="location"
									label="Location (sort by city)"
									width={450} />
								<Column
									cellRenderer={this._renderDob}
									className={styles.column}
									dataKey="dob"
									label="Born"
									width={120} />
						</Table>}
				</AutoSizer>
			</div>
		);
	}

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

	handleInputChange = (event) => {
		const {
			setQueryString
		} = this.props;

		setQueryString(event.target.value);
	};

	_filterList = (queryString) => {
		const {
			filterList
		} = this.props;

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
		queryString: state.ListReducer.get('queryString', ''),
		sortBy: state.ListReducer.get('sortBy', 'name'),
		sortDirection: state.ListReducer.get('sortDirection', 'ASC')
});

// All the Actions
const mapDispatchToProps = {
	fetchUsers,
	setQueryString,
	setSortBy
};

export default connect(mapStateToProps, mapDispatchToProps)(MyList);
