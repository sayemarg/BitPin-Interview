import Styles from './styles.module.css';
import type { PropsWithChildren } from 'react';
import type { TabID } from '../../types';
import { useTabs } from '../../context';

type Props = PropsWithChildren<{ value: TabID }>;

export const TabContent = ({ value, children }: Props) => {
  const { activeTabId } = useTabs();

  if (activeTabId !== value) return null;

  return <div className={Styles.tabContent}>{children}</div>;
};
