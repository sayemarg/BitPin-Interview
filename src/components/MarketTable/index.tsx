import Styles from './styles.module.css';
import usePreventSwipeOnScroll from '../../hooks/usePreventSwipeOnScroll';
import { IMarketInfo } from '@/api';
import { LoadingRow, TableRow } from './components';
import { getMessage } from '@/utils/translate';
import { type UIEventHandler } from 'react';

interface Props {
  data?: IMarketInfo[];
  isLoading?: boolean;
  onFetchNextPage?: () => void;
}

export const MarketTable = ({ data, isLoading, onFetchNextPage }: Props) => {
  const { handleScroll: handlePreventSwipeScroll, handleScrollEnd, handleTouchMove } = usePreventSwipeOnScroll();

  const handleScroll: UIEventHandler<HTMLDivElement> = (event) => {
    handlePreventSwipeScroll();

    if (!onFetchNextPage) return;

    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    if (scrollHeight * 0.95 <= scrollTop + clientHeight) {
      onFetchNextPage();
    }
  };

  return (
    <div
      className={Styles.tableContainer}
      onScroll={handleScroll}
      onScrollEnd={handleScrollEnd}
      onTouchMove={handleTouchMove}
    >
      <table className={Styles.table}>
        <colgroup>
          <col />

          <col />

          <col />

          <col />

          <col />

          <col />
        </colgroup>

        <thead>
          <tr>
            <th>{getMessage('curreny_name')}</th>

            <th>{getMessage('price')}</th>

            <th>{getMessage('market_cap')}</th>

            <th>{getMessage('volume_24_hours')}</th>

            <th>{getMessage('circulating_supply')}</th>

            <th></th>
          </tr>
        </thead>

        <tbody>{data?.map((marketInfo) => <TableRow key={marketInfo.id} marketInfo={marketInfo} />)}</tbody>

        {isLoading && (
          <tbody>
            {Array.from({ length: 20 }).map((_, index) => (
              <LoadingRow key={index} />
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};
