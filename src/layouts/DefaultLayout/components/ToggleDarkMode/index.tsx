import Styles from './styles.module.css';
import { useId } from 'react';

enum THEME {
  DARK = 'dark',
  LIGHT = 'light',
}

const THEME_STORAGE_KEY = 'theme';

export const ToggleDarkMode = () => {
  const id = useId();

  const changeTheme = (theme: THEME) => {
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    document.documentElement.setAttribute('data-theme', theme);
  };

  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  const defaultDark = storedTheme === 'dark' || (storedTheme === null && prefersDark);

  if (defaultDark) {
    changeTheme(THEME.DARK);
  }

  return (
    <div className={Styles.toggleThemeWrapper}>
      <span>🌒</span>

      <label className={Styles.toggleTheme} htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          onChange={(event) => changeTheme(event.target.checked ? THEME.DARK : THEME.LIGHT)}
          defaultChecked={defaultDark}
          hidden
        />

        <div className={Styles.slider}></div>
      </label>

      <span>☀️</span>
    </div>
  );
};
