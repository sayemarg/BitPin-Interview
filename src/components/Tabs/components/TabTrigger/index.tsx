import Styles from './styles.module.css';
import type { TabID } from '../../types';
import { clsx } from 'clsx';
import { type PropsWithChildren, type RefCallback, useCallback } from 'react';
import { useTabs, useTabsList } from '../../context';

type Props = PropsWithChildren<{ value: TabID }>;

export const TabTrigger = ({ value, children }: Props) => {
  const { activeTabId, onChange } = useTabs();

  const { setTriggerRef } = useTabsList();

  const refCallback = useCallback<RefCallback<HTMLDivElement>>(
    (element) => setTriggerRef(value, element),
    [setTriggerRef, value]
  );

  return (
    <div
      ref={refCallback}
      onClick={() => onChange(value)}
      className={clsx(Styles.tabTrigger, activeTabId === value && Styles.active)}
    >
      {children}
    </div>
  );
};
