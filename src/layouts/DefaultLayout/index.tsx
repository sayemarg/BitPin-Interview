import Styles from './styles.module.css';
import { Outlet } from 'react-router';
import { ToggleDarkMode } from './components';
import { clsx } from 'clsx';

export const DefaultLayout = () => (
  <>
    <nav className={clsx(Styles.container, Styles.navbar)}>
      <ToggleDarkMode />
    </nav>

    <main className={Styles.container}>
      <Outlet />
    </main>
  </>
);
