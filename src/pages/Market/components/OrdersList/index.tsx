import { MarketList, type IMarketListColumn } from '../../../../components';
import { OrderForm } from './components';
import { getMarketOrders, type IMarketOrder } from '../../../../api';
import { getMessage } from '../../../../utils/translate';
import { renderNumber } from '../../../../utils/render';
import { useQuery } from '@tanstack/react-query';

interface Props {
  marketId: string;
  type: 'buy' | 'sell';
}

const columns: IMarketListColumn<IMarketOrder>[] = [
  { title: getMessage('price'), render: (row) => renderNumber(row.price) },
  { title: getMessage('amount'), render: (row) => row.remain },
  { title: getMessage('total_price'), render: (row) => renderNumber(row.value) },
];

const UPDATE_INTERVAL = 3 * 1000;

export const OrdersList = ({ marketId, type }: Props) => {
  const { data, isPending } = useQuery({
    queryKey: ['orders', marketId, type],
    queryFn: ({ signal }) => getMarketOrders({ marketId, type }, { signal }),
    refetchInterval: UPDATE_INTERVAL,
  });

  const orders = data?.data.orders.slice(0, 10);

  const totalRemain = orders?.reduce((total, order) => Number(total) + Number(order.remain), 0);

  const totalValue = orders?.reduce((total, order) => Number(total) + Number(order.value), 0);

  const averagePrice = totalValue && totalRemain ? totalValue / totalRemain : 0;

  return (
    <>
      <MarketList<IMarketOrder> data={orders} columns={columns} isLoading={isPending} />

      {!isPending && <OrderForm totalRemain={totalRemain} totalValue={totalValue} averagePrice={averagePrice} />}
    </>
  );
};
