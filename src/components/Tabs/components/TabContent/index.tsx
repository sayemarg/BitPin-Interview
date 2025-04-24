import Styles from './styles.module.css';
import type { PropsWithChildren } from 'react';
import type { TabID } from '../../types';
import { useTabs } from '../../context';

type Props = PropsWithChildren<{ value: TabID }>;

export const TabContent = ({ value, children }: Props) => {
  const { tabId } = useTabs();

  if (tabId !== value) return null;

  return <div className={Styles.tabContent}>{children}</div>;
};
