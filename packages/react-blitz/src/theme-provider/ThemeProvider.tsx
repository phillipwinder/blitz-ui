'use client';

import * as React from 'react';

export type IconLibraryName = 'lucide' | 'tabler' | 'hugeicons' | 'phosphor' | 'remixicon';

type ThemeProviderContextValue = {
  iconLibrary: IconLibraryName | null;
};

const ThemeContext = React.createContext<ThemeProviderContextValue | null>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
  iconLibrary?: IconLibraryName | null;
}

export function ThemeProvider({ children, iconLibrary }: ThemeProviderProps) {
  const contextValue = React.useMemo(
    () => ({ iconLibrary: iconLibrary || 'lucide' }),
    [iconLibrary],
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('Blitz UI: useTheme must be used within a ThemeProvider');
  }
  return context;
}
