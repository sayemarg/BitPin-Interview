import { MarketList, type IMarketListColumn } from '@/components';
import { getMarketTransactions, type IMarketTransaction } from '@/api';
import { getMessage } from '@/utils/translate';
import { renderNumber, renderTime } from '@/utils/render';
import { useQuery } from '@tanstack/react-query';

interface Props {
  marketId: string;
}

const columns: IMarketListColumn<IMarketTransaction>[] = [
  { title: getMessage('price'), render: (row) => renderNumber(row.price) },
  { title: getMessage('amount'), render: (row) => row.match_amount },
  { title: getMessage('time'), render: (row) => renderTime(row.time) },
];

const UPDATE_INTERVAL = 3 * 1000;

export const TransactionList = ({ marketId }: Props) => {
  const { data, isPending } = useQuery({
    queryKey: ['transactions', marketId],
    queryFn: ({ signal }) => getMarketTransactions({ marketId }, { signal }),
    refetchInterval: UPDATE_INTERVAL,
  });

  const transactions = data?.data.slice(0, 10);

  return (
    <MarketList<IMarketTransaction> data={transactions} rowKey="match_id" columns={columns} isLoading={isPending} />
  );
};
