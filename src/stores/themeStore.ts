import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'system' | 'dark' | 'light';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDarkMode: boolean;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      theme: 'system',
      setTheme: (theme: Theme) => {
        set({ theme });
        const isDark =
          theme === 'dark' ||
          (theme === 'system' &&
            window.matchMedia('(prefers-color-scheme: dark)').matches);
        document.documentElement.classList.toggle('dark', isDark);
        document.documentElement.setAttribute(
          'data-theme',
          isDark ? 'dark' : 'light'
        );
      },
      isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
    }),
    { name: 'theme-storage' }
  )
);

const handleSystemThemeChange = (e: MediaQueryListEvent) => {
  const { theme } = useThemeStore.getState();
  if (theme === 'system') {
    const isDark = e.matches;
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.setAttribute(
      'data-theme',
      isDark ? 'dark' : 'light'
    );
    useThemeStore.setState({ isDarkMode: isDark });
  }
};

window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', handleSystemThemeChange);

useThemeStore.getState().setTheme(useThemeStore.getState().theme);
