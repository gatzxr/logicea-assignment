import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const useTheme = (): { toggleTheme: () => void; theme: Theme } => {
  const [theme, setTheme] = useState<Theme | null>(null);
  const toggleTheme = () => {
    const newTheme: Theme = localStorage.theme === 'light' ? 'dark' : 'light';
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setTheme('light');
    }
  }, []);

  return { toggleTheme, theme: theme as Theme };
};

export default useTheme;
