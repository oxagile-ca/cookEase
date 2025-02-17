import React, { createContext, useContext } from 'react';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { borderRadius, shadows, glassmorphism } from '../theme/utils';

type ThemeContextType = {
  colors: typeof colors;
  typography: typeof typography;
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
  shadows: typeof shadows;
  glassmorphism: typeof glassmorphism;
};

const ThemeContext = createContext<ThemeContextType>({
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  glassmorphism,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = {
    colors,
    typography,
    spacing,
    borderRadius,
    shadows,
    glassmorphism,
  };

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
