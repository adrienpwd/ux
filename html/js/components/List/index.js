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
									className={styles.column}
									dataKey="name"
									label="Name"
									width={200} />
								<Column
									className={styles.column}
									dataKey="company"
									label="Company"
									width={200} />
								<Column
									className={styles.column}
									dataKey="email"
									label="E-mail"
									width={250} />
								<Column
									className={styles.column}
									dataKey="phone"
									label="Phone"
									width={250} />
								<Column
									className={styles.column}
									dataKey="age"
									label="Age"
									width={60} />
						</Table>}
				</AutoSizer>
			</div>
		);
	}

	handleInputChange = (event) => {
		const {setQueryString} = this.props;

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
