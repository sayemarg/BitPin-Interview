import type { TabID } from './types';
import { TabsContext, type TabsContextValues } from './context';
import { type PropsWithChildren, useCallback, useMemo, useRef, useState } from 'react';

type Props = PropsWithChildren<{
  className?: string;
  defaultSelectedId?: TabID;
  onTabChange?: (tabId: TabID) => void;
}>;

export const Tabs = ({ className, defaultSelectedId, onTabChange, children }: Props) => {
  const tabIdList = useRef<TabID[]>([]);

  const [activeTabId, setActiveTabId] = useState(defaultSelectedId);

  const handleTabChange = useCallback<TabsContextValues['onChange']>(
    (tabId) => {
      setActiveTabId(tabId);

      if (onTabChange) {
        onTabChange(tabId);
      }
    },
    [onTabChange]
  );

  const setTabIdList = useCallback<TabsContextValues['setTabIdList']>((idList) => (tabIdList.current = idList), []);

  const changeTabBySwipe = useCallback<TabsContextValues['changeTabBySwipe']>((direction) => {
    setActiveTabId((activeTabId) => {
      const idList = tabIdList.current;

      const activeTabIndex = idList.findIndex((tabId) => tabId === activeTabId);

      if (activeTabIndex === -1) {
        return activeTabId;
      }

      let newActiveTabIndex: number;

      if (direction === 'left') {
        newActiveTabIndex = activeTabIndex - 1;

        if (newActiveTabIndex < 0) {
          newActiveTabIndex = idList.length - 1;
        }
      } else {
        newActiveTabIndex = activeTabIndex + 1;

        if (idList.length <= newActiveTabIndex) {
          newActiveTabIndex = 0;
        }
      }

      return tabIdList.current[newActiveTabIndex];
    });
  }, []);

  const contextValues = useMemo<TabsContextValues>(
    () => ({ activeTabId, onChange: handleTabChange, setTabIdList, changeTabBySwipe }),
    [activeTabId, handleTabChange, setTabIdList, changeTabBySwipe]
  );

  return (
    <div className={className} style={{ overflow: 'hidden' }}>
      <TabsContext value={contextValues}>{children}</TabsContext>
    </div>
  );
};
