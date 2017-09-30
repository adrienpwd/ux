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
		 rowCount: 1000,
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
			<div>
				<h1>List example</h1>
				<AutoSizer disableHeight>
            {({ width }) =>
              <Table
                ref="Table"
                disableHeader={false}
                headerClassName={styles.headerColumn}
                headerHeight={30}
                height={270}
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
                  cellDataGetter={({ rowData }) => rowData.get('index')}
                  dataKey="index"
                  width={60} />
								<Column
                  label="Name"
                  cellDataGetter={({ rowData }) => rowData.get('name')}
                  dataKey="name"
                  width={60} />
								<Column
                  label="Company"
                  cellDataGetter={({ rowData }) => rowData.get('company')}
                  dataKey="company"
                  width={60} />
              </Table>}
          </AutoSizer>
			</div>
		);
	}

	_getDatum(list, index) {
    return list.get(index % list.size);
  }

	_rowRenderer = ({ index, key, style }) => {
		const row = data.get(index);

		return (
			<div key={index} style={style}>
				{row.get('name')}
			</div>
		);
	};

	_sortList({ sortBy, sortDirection }) {
    return data;
  }
}
