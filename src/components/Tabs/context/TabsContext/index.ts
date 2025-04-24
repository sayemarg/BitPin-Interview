import type { TabID } from '../../types';
import { createContext, useContext } from 'react';

export interface TabsContextValues {
  tabId?: TabID;
  onChange: (tabId: TabID) => void;
}

export const TabsContext = createContext<TabsContextValues>({
  onChange: () => {},
});

export const useTabs = () => useContext(TabsContext);
