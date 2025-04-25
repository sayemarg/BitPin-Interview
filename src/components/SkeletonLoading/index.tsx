import Styles from './styles.module.css';
import type { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

export const SkeletonLoading = ({ className, ...rest }: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx(Styles.skeleton, className)} {...rest} />
);
