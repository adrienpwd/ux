import {
	AutoSizer,
	Column,
	Table
} from 'react-virtualized';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Map} from 'immutable';
	import {setSortBy} from './../../actions/AppActionCreators'
import styles from './List.less';

export class MyList extends PureComponent {
	static displayName = "List";

	constructor(props, context) {
	 super(props, context);

	 const sortDirection = "ASC";
	 const rowHeight = 30;

	 this.state = {
		 disableHeader: false,
		 headerHeight: 30,
		 height: rowHeight * 15,
		 hideIndexRow: false,
		 overscanRowCount: 10,
		 rowHeight,
		 scrollToIndex: undefined,
		 sortDirection,
		 sortedList: props.data,
		 useDynamicRowHeight: false
	 };

 }

	render () {
		const {
			height,
			rowHeight
		} = this.state;

		const {
			data,
			sortBy,
			sortDirection
		} = this.props;

		return (
			<div>
				<AutoSizer disableHeight={true}>
						{({width}) =>
							<Table
								ref="Table"
								disableHeader={false}
								headerClassName={styles.headerColumn}
								headerHeight={30}
								height={height}
								overscanRowCount={10}
								rowClassName={this._rowClassName}
								rowHeight={rowHeight}
								rowGetter={({index}) => this._getDatum(data, index)}
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

	_rowClassName({ index }) {
    if (index < 0) {
      return [styles.row, styles.headerRow];
    } else {
      return index % 2 === 0 ? [styles.row, styles.evenRow] : [styles.row, styles.oddRow];
    }
  };

	_getDatum = (list, index) => list.get(index % list.size);

	_sort = ({sortBy, sortDirection}) => this.props.setSortBy(sortBy, sortDirection);

}

// Setting up the props that come from reducers through connect
const mapStateToProps = (state) => ({
		data: state.ListReducer.get('data', Map()),
		sortBy: state.ListReducer.get('sortBy', 'name'),
		sortDirection: state.ListReducer.get('sortDirection', 'ASC')
});

// All the Actions
const mapDispatchToProps = {
	setSortBy
};

export default connect(mapStateToProps, mapDispatchToProps)(MyList);
