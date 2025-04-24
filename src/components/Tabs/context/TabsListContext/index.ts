import type { TabID } from '../../types';
import { createContext, useContext } from 'react';

export interface TabsListContextValues {
  setTriggerRef: (tabId: TabID, element: HTMLDivElement | null) => void;
}

export const TabsListContext = createContext<TabsListContextValues>({
  setTriggerRef: () => {},
});

export const useTabsList = () => useContext(TabsListContext);
