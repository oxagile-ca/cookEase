import { useContext } from 'react';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { borderRadius, shadows, glassmorphism } from '../theme/utils';

export function useTheme() {
  return {
    colors,
    typography,
    spacing,
    borderRadius,
    shadows,
    glassmorphism,
  };
}
