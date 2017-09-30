import {
	AutoSizer,
	Column,
	Table
} from 'react-virtualized';
import React, {PureComponent} from 'react';
import data from './../../../../data';
import styles from './List.less';

export default class MyList extends PureComponent {
	static displayName = "List";

	constructor(props, context) {
	 super(props, context);

	 const sortBy = "index";
	 const sortDirection = "ASC";
	 const sortedList = this._sortList({ sortBy, sortDirection });

	 this.state = {
		 disableHeader: false,
		 headerHeight: 30,
		 height: 270,
		 hideIndexRow: false,
		 overscanRowCount: 10,
		 rowHeight: 40,
		 scrollToIndex: undefined,
		 sortBy,
		 sortDirection,
		 sortedList,
		 useDynamicRowHeight: false
	 };

 }

	render () {
		const {sortedList} = this.state;
		const rowGetter = ({ index }) => this._getDatum(sortedList, index);

		return (
			<div className={styles.badass}>
				<h1>List example</h1>
				<div className={styles.listContainer}>
					<AutoSizer disableHeight={true}>
							{({width}) =>
								<Table
									ref="Table"
									disableHeader={false}
									headerClassName={styles.headerColumn}
									headerHeight={30}
									height={400}
									overscanRowCount={10}
									rowClassName={this._rowClassName}
									rowHeight={30}
									rowGetter={rowGetter}
									rowCount={data.size}
									sort={this._sort}
									sortBy={"index"}
									sortDirection={"ASC"}
									width={width} >
									<Column
										label="Index"
										dataKey="index"
										width={80} />
									<Column
										dataKey="name"
										label="Name"
										width={200} />
									<Column
										dataKey="company"
										label="Company"
										flexGrow={1}
										width={200} />
							</Table>}
					</AutoSizer>
				</div>
			</div>
		);
	}

	_rowClassName({ index }) {
    if (index < 0) {
      return [styles.row, styles.headerRow];
    } else {
      return index % 2 === 0 ? [styles.row, styles.evenRow] : [styles.row, styles.oddRow];
    }
  }

	_getDatum(list, index) {
    return list.get(index % list.size);
  }

	_sortList({ sortBy, sortDirection }) {
    return data;
  }
}
