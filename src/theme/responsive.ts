import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const responsive = {
  isSmallScreen: width < 768,
  isMediumScreen: width >= 768 && width < 1024,
  isLargeScreen: width >= 1024,

  // Breakpoints
  sm: 768,
  md: 1024,
  lg: 1280,

  // Spacing scale based on screen size
  spacing: {
    xs: width < 768 ? 4 : 8,
    sm: width < 768 ? 8 : 16,
    md: width < 768 ? 16 : 24,
    lg: width < 768 ? 24 : 32,
    xl: width < 768 ? 32 : 48,
  },

  // Layout helpers
  getContentWidth: () => {
    if (width < 768) return '100%';
    if (width < 1024) return '90%';
    return '80%';
  },

  getSidebarWidth: () => {
    if (width < 768) return 0;
    if (width < 1024) return 240;
    return 300;
  },
};
