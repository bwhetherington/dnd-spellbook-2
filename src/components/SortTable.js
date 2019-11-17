import React from 'react';
import { iterator } from 'lazy-iters';

// Props are:
// head: array of headers
// body: array of arrays of columns

const id = x => x;

const computeColor = isFocus => isFocus
  ? 'rgba(0, 0, 0, 1)'
  : 'rgba(0, 0, 0, 0.5)';

const computeStyle = isFocus => ({
  color: computeColor(isFocus)
});

const computeWidth = (widths, index) => widths[index] || 'auto';

class SortTable extends React.Component {
  state = {
    sortColumn: 0
  };

  onClickHeader = index => () => this.setState({
    ...this.state,
    sortColumn: index
  });

  render() {
    const { head, body, onClickRow = id => id, tdRenderer = id, widths = [], ...props } = this.props;
    const { sortColumn } = this.state;

    const headComponents = iterator(head)
      .enumerate()
      .map(([header, index]) => (
        <td width={computeWidth(widths, index)} key={index} style={computeStyle(sortColumn === index)} onClick={this.onClickHeader(index)}>
          {header}
        </td>
      ))
      .collect();

    // Sort body according to the selected header
    const sortBody = [...body];
    sortBody.sort((a, b) => {
      return a[sortColumn].toString().localeCompare(b[sortColumn].toString());
    });

    console.log('onClick', onClickRow(["Fire Bolt", 0]))

    const bodyComponents = iterator(sortBody)
      .enumerate()
      .map(([row, rowIndex]) => {
        const columns = iterator(row).enumerate().map(([col, colIndex]) => {
          const colContent = tdRenderer(col, colIndex);
          return <td width={computeWidth(widths, colIndex)} style={{ textAlign: 'center' }} key={colIndex}>{colContent}</td>;
        }).collect();
        return (
          <tr key={rowIndex} onClick={onClickRow(row)}>
            {columns}
          </tr>
        );
      })
      .collect();

    return (
      <table {...props}>
        <thead>
          <tr>
            {headComponents}
          </tr>
        </thead>
        <tbody>
          {bodyComponents}
        </tbody>
      </table>
    );
  }
}

export default SortTable;