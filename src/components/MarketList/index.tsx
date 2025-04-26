import Styles from './styles.module.css';
import type { Key, ReactNode } from 'react';
import { SkeletonLoading } from '../SkeletonLoading';
import { clsx } from 'clsx';

export interface IMarketListColumn<TData> {
  title: string;
  render: (row: TData, index: number) => ReactNode;
}

interface Props<TData> {
  data?: TData[];
  rowKey?: keyof TData;
  columns: IMarketListColumn<TData>[];
  isLoading?: boolean;
}

export const MarketList = <TData,>({ data, rowKey, columns, isLoading }: Props<TData>) => {
  let rows: ReactNode[] | undefined;

  if (isLoading) {
    rows = Array.from({ length: 10 }).map((_, index) => (
      <li key={index}>
        <SkeletonLoading style={{ height: '2rem' }} />
      </li>
    ));
  } else {
    rows = data?.map((row, rowIndex) => (
      <li key={rowKey ? (row[rowKey] as Key) : rowIndex} className={clsx(Styles.gridContainer, Styles.dataRow)}>
        {columns.map((column, columnIndex) => (
          <span key={columnIndex}>{column.render(row, rowIndex)}</span>
        ))}
      </li>
    ));
  }

  return (
    <div className={Styles.marketList}>
      <div className={Styles.gridContainer}>
        {columns.map((column) => (
          <span>{column.title}</span>
        ))}
      </div>

      <ul>{rows}</ul>
    </div>
  );
};
