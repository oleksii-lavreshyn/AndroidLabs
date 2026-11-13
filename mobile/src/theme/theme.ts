import type { ColorSchemeName } from 'react-native';

const shared = {
  primary: '#8B7DFF', primaryContainer: '#312D58', onPrimary: '#FFFFFF',
  success: '#6DD8A0', warning: '#F5C451', error: '#FFB4AB', star: '#F5C451',
};
export const lightColors = { ...shared, background: '#F9F7FF', surface: '#FFFFFF', surfaceVariant: '#E8E4F2', text: '#1B1B21', textMuted: '#62616B', border: '#CAC5D0', overlay: 'rgba(20,18,28,0.48)', shimmer: '#DDD8E6' } as const;
export const darkColors = { ...shared, background: '#121116', surface: '#1C1B21', surfaceVariant: '#2A282F', text: '#E8E1EC', textMuted: '#CAC4D0', border: '#48454E', overlay: 'rgba(0,0,0,0.6)', shimmer: '#35323B' } as const;
export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 } as const;
export const radius = { sm: 8, md: 14, lg: 22, pill: 999 } as const;
export const typography = { title: 28, heading: 22, body: 16, label: 14, caption: 12 } as const;
export type Theme = { colors: typeof lightColors | typeof darkColors; spacing: typeof spacing; radius: typeof radius; typography: typeof typography };
export function createTheme(scheme: ColorSchemeName): Theme { return { colors: scheme === 'dark' ? darkColors : lightColors, spacing, radius, typography }; }
