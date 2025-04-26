import Styles from './styles.module.css';
import type { InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';

export const TextInput = ({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) => (
  <input className={clsx(Styles.textInput, className)} {...rest} />
);
