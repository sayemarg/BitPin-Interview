import { OrdersList, TransactionList } from './components';
import { TabContent, Tabs, TabsList, TabTrigger } from '../../components';
import { getMessage } from '../../utils/translate';
import { useParams } from 'react-router';

enum TAB_IDS {
  BUY_ORDERS = 'buy_orders',
  SELL_ORDERS = 'sell_orders',
  TRANSACTIONS = 'transactions',
}

export const MarketDetailPage = () => {
  const { id } = useParams();

  return (
    <Tabs defaultSelectedId={TAB_IDS.BUY_ORDERS}>
      <TabsList centered>
        <TabTrigger value={TAB_IDS.BUY_ORDERS}>{getMessage('buy_orders')}</TabTrigger>

        <TabTrigger value={TAB_IDS.SELL_ORDERS}>{getMessage('sell_orders')}</TabTrigger>

        <TabTrigger value={TAB_IDS.TRANSACTIONS}>{getMessage('transactions')}</TabTrigger>
      </TabsList>

      <TabContent value={TAB_IDS.BUY_ORDERS}>
        <OrdersList marketId={id!} type="buy" />
      </TabContent>

      <TabContent value={TAB_IDS.SELL_ORDERS}>
        <OrdersList marketId={id!} type="sell" />
      </TabContent>

      <TabContent value={TAB_IDS.TRANSACTIONS}>
        <TransactionList marketId={id!} />
      </TabContent>
    </Tabs>
  );
};
