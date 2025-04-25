import Styles from './styles.module.css';
import { IMarketInfo } from '../../api';
import { LoadingRow, TableRow } from './components';
import { getMessage } from '../../utils/translate';
import { useRef } from 'react';

interface Props {
  data?: IMarketInfo[];
  isLoading?: boolean;
  onFetchNextPage?: () => void;
}

export const MarketTable = ({ data, isLoading, onFetchNextPage }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!containerRef.current || !onFetchNextPage) return;

    const { scrollTop, clientHeight, scrollHeight } = containerRef.current;

    if (scrollHeight * 0.95 <= scrollTop + clientHeight) {
      onFetchNextPage();
    }
  };

  return (
    <div ref={containerRef} className={Styles.tableContainer} onScroll={handleScroll}>
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
