import Styles from './style.module.css';
import type { IMarketInfo } from '@/api';
import { Button } from '@/components';
import { Link } from 'react-router';
import { getMessage } from '@/utils/translate';
import { renderNumber } from '@/utils/render';

interface Props {
  marketInfo: IMarketInfo;
}

export const TableRow = ({ marketInfo }: Props) => (
  <tr className={Styles.tableRow}>
    <td>
      <div className={Styles.currenyName}>
        <img src={marketInfo.currency1.image} loading="lazy" />

        <div>
          <div>{marketInfo.currency1.title_fa}</div>

          <div>
            {marketInfo.currency1.code}/{marketInfo.currency2.code}
          </div>
        </div>
      </div>
    </td>

    <td>{renderNumber(marketInfo.price)}</td>

    <td>{renderNumber(marketInfo.market_cap)}</td>

    <td>{renderNumber(marketInfo.volume_24h)}</td>

    <td>{renderNumber(marketInfo.circulating_supply)}</td>

    <td>
      <Link to={`/market/${marketInfo.id}`}>
        <Button>{getMessage('view_details')}</Button>
      </Link>
    </td>
  </tr>
);
