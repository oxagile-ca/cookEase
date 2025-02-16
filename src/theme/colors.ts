export const colors = {
  // Primary Colors
  primary: '#FF6B6B', // Soft Coral Red
  secondary: '#2ECC71', // Mint Green

  // Background Colors
  background: '#F9F9F9', // Soft Off-White
  backgroundElevated: '#FFFFFF', // Pure White for cards
  backgroundSecondary: '#F0F0F0', // Slightly darker for inputs

  // Text Colors
  text: '#34495E', // Deep Navy Blue
  textSecondary: '#5D6D7E', // Lighter Navy
  textTertiary: '#95A5A6', // Muted Text

  // Accent Colors
  accent: '#F1C40F', // Bright Yellow
  accentHover: '#F4D03F', // Lighter Yellow for hover

  // Status Colors
  success: '#2ECC71', // Mint Green (same as secondary)
  error: '#E74C3C', // Soft Red
  warning: '#F1C40F', // Bright Yellow (same as accent)
  info: '#3498DB', // Sky Blue

  // Border Colors
  border: '#E0E0E0',
  borderLight: '#F0F0F0',

  // Utility Colors
  white: '#FFFFFF',
  black: '#34495E', // Using Deep Navy as black
  transparent: 'transparent',

  // Overlay Colors
  overlay: 'rgba(52, 73, 94, 0.5)', // Navy overlay
  glassOverlay: 'rgba(249, 249, 249, 0.8)', // Off-white overlay
};

// Type definitions for better TypeScript support
export type ColorScheme = typeof colors;
export type ColorName = keyof typeof colors;

