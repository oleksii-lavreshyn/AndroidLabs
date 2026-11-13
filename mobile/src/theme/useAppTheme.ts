import { useColorScheme } from 'react-native';
import { createTheme } from './theme';
export function useAppTheme() { return createTheme(useColorScheme()); }
