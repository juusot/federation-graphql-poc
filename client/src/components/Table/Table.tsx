import React from 'react';
import styled from 'styled-components';

export interface TableProps<Data> {
  /** Array of strings which matches to data keys. */
  columns: Array<keyof Data>;
  /** Array of objects. */
  data: Data[];
  /** Object where property matches data propery and value is a function. */
  onClick?: {
    [Property in keyof Data]?: (data: Data) => void;
  };
}

const Cell = styled.td<{ clickable: boolean }>`
  cursor: ${props => (props.clickable ? 'pointer' : 'initial')};
`;

export default function Table<Data>({
  data,
  columns,
  onClick,
}: TableProps<Data>): React.ReactElement {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((c, i) => (
            <th key={i}>{c}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {columns.map((col, index) => (
              <Cell key={index} clickable={onClick?.[col]} onClick={() => onClick?.[col]?.(row)}>
                {row[col]}
              </Cell>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
