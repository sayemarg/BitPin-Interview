import { MarketTable, Tabs, TabsList, TabSwipeContainer, TabTrigger } from '@/components';
import { getMarkets } from '@/api';
import { getMessage } from '@/utils/translate';
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const PAGE_SIZE = 20;

enum BASE_SYMBOLS {
  IRT = 'IRT',
  USDT = 'USDT',
}

export const HomePage = () => {
  const [sliceSize, setSliceSize] = useState(PAGE_SIZE);

  const [baseSymbol, setBaseSymbol] = useState<BASE_SYMBOLS>(BASE_SYMBOLS.IRT);

  const { data, isPending } = useQuery({
    queryKey: ['markets'],
    queryFn: ({ signal }) => getMarkets({ signal }),
  });

  const baseSymbolMarkets = useMemo(
    () => data?.data.results.filter((marketInfo) => marketInfo.currency2.code === baseSymbol),
    [data, baseSymbol]
  );

  const tableData = useMemo(() => baseSymbolMarkets?.slice(0, sliceSize), [baseSymbolMarkets, sliceSize]);

  const handleFetchNextPage = () => {
    if (isPending) return;

    if (baseSymbolMarkets?.length && baseSymbolMarkets.length <= sliceSize) return;

    setSliceSize(sliceSize + PAGE_SIZE);
  };

  return (
    <Tabs
      onTabChange={(tabId) => {
        setBaseSymbol(tabId as BASE_SYMBOLS);
        setSliceSize(PAGE_SIZE);
      }}
      defaultSelectedId={BASE_SYMBOLS.IRT}
    >
      <TabsList centered>
        <TabTrigger value={BASE_SYMBOLS.IRT}>{getMessage('base_irt')}</TabTrigger>

        <TabTrigger value={BASE_SYMBOLS.USDT}>{getMessage('base_usdt')}</TabTrigger>
      </TabsList>

      <TabSwipeContainer>
        <MarketTable data={tableData} isLoading={isPending} onFetchNextPage={handleFetchNextPage} />
      </TabSwipeContainer>
    </Tabs>
  );
};
