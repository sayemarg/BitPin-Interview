import type { TabID } from './types';
import { TabsContext, type TabsContextValues } from './context';
import { type PropsWithChildren, useCallback, useMemo, useState } from 'react';

type Props = PropsWithChildren<{
  className?: string;
  defaultSelectedId?: TabID;
  onTabChange?: (tabId: TabID) => void;
}>;

export const Tabs = ({ className, defaultSelectedId, onTabChange, children }: Props) => {
  const [activeTabId, setActiveTabId] = useState(defaultSelectedId);

  const handleTabChange = useCallback(
    (tabId: TabID) => {
      setActiveTabId(tabId);

      if (onTabChange) {
        onTabChange(tabId);
      }
    },
    [onTabChange]
  );

  const contextValues = useMemo<TabsContextValues>(
    () => ({ tabId: activeTabId, onChange: handleTabChange }),
    [activeTabId, handleTabChange]
  );

  return (
    <div className={className}>
      <TabsContext value={contextValues}>{children}</TabsContext>
    </div>
  );
};
