import type { TabID } from '../../types';
import { createContext, useContext } from 'react';

export interface TabsContextValues {
  activeTabId?: TabID;
  onChange: (tabId: TabID) => void;
  setTabIdList: (tabIdList: TabID[]) => void;
  changeTabBySwipe: (direction: 'left' | 'right') => void;
}

export const TabsContext = createContext<TabsContextValues>({
  onChange: () => {},
  setTabIdList: () => {},
  changeTabBySwipe: () => {},
});

export const useTabs = () => useContext(TabsContext);
