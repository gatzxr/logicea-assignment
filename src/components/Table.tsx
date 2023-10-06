import clsx from 'clsx';
import { ReactNode } from 'react';

// eslint-disable-next-line
type RenderCellFunction<T> = (row: T) => ReactNode;

export type ColumnOption<T> = { columnTitle: string } & (
  | {
      fieldSelector: string;
      renderCell?: never;
    }
  | { renderCell: RenderCellFunction<T>; fieldSelector?: never }
);

interface ITable<T> {
  columns: ColumnOption<T>[];
  data: T[];
}

export default function Table<T>({ columns, data }: ITable<T>) {
  const renderCell = (row: T, column: ColumnOption<T>) => {
    if (column.renderCell) return column.renderCell(row);

    return column.fieldSelector && (row as any)[column.fieldSelector] // eslint-disable-line
      ? (row as any)[column.fieldSelector] // eslint-disable-line
      : '-';
  };

  const renderRow = (row: T, index: number) => (
    <tr key={index}>
      {columns.map((column: ColumnOption<T>, colIndex: number) => (
        <th
          key={colIndex}
          scope="row"
          style={{
            width: `${100 / columns.length}%`
          }}
          className={clsx({
            'truncate border-black px-6 py-4 font-medium text-gray-900 transition duration-200  dark:border-white dark:text-white':
              true,
            'border-r': colIndex < columns.length - 1
          })}
        >
          {renderCell(row, column)}
        </th>
      ))}
    </tr>
  );

  return (
    <table className="w-full table-fixed">
      <thead className="text-sm text-gray-700 transition duration-200 dark:text-gray-400">
        <tr>
          {columns.map((column: ColumnOption<T>, index: number) => (
            <th scope="col" className="px-6 py-3" key={index}>
              {column.columnTitle}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map(renderRow)}</tbody>
    </table>
  );
}
