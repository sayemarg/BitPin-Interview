import Styles from './styles.module.css';
import type { TabID } from '../../types';
import { TabsListContext, type TabsListContextValues, useTabs } from '../../context';
import { clsx } from 'clsx';
import { type PropsWithChildren, useCallback, useEffect, useMemo, useRef } from 'react';

type Props = PropsWithChildren<{ centered?: boolean }>;

export const TabsList = ({ centered, children }: Props) => {
  const { tabId } = useTabs();

  const tabsListRef = useRef<HTMLDivElement>(null);

  const indicatorRef = useRef<HTMLDivElement>(null);

  const tabTriggerRefList = useRef<Record<TabID, HTMLDivElement | null>>({});

  const setTriggerRef = useCallback<TabsListContextValues['setTriggerRef']>((tabId, element) => {
    tabTriggerRefList.current[tabId] = element;
  }, []);

  const contextValues = useMemo<TabsListContextValues>(() => ({ setTriggerRef }), [setTriggerRef]);

  useEffect(() => {
    const setIndicatorStyle = () => {
      if (!tabId || !tabsListRef.current || !indicatorRef.current) return;

      const tabTrigger = tabTriggerRefList.current[tabId];

      if (!tabTrigger) return;

      const { left, width } = tabTrigger.getBoundingClientRect();

      const { left: containerLeft } = tabsListRef.current.getBoundingClientRect();

      indicatorRef.current.style.left = `${left - containerLeft}px`;

      indicatorRef.current.style.width = `${width}px`;
    };

    setIndicatorStyle();

    window.addEventListener('resize', setIndicatorStyle);

    return () => {
      window.removeEventListener('resize', setIndicatorStyle);
    };
  }, [tabId]);

  return (
    <div ref={tabsListRef} className={clsx(Styles.tabsList, centered && Styles.centered)}>
      <TabsListContext value={contextValues}>{children}</TabsListContext>

      <div ref={indicatorRef} className={Styles.tabsIndicator} />
    </div>
  );
};
