import Styles from './styles.module.css';
import type { ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';

export const Button = ({ className, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className={clsx(Styles.button, className)} {...rest} />
);
