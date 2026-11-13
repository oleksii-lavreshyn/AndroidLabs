import type { PropsWithChildren } from 'react';import { SafeAreaView } from 'react-native-safe-area-context';import { useAppTheme } from '@/theme/useAppTheme';
export function Screen({children}:{children:PropsWithChildren['children']}){const t=useAppTheme();return <SafeAreaView edges={['top','left','right']} style={{flex:1,backgroundColor:t.colors.background}}>{children}</SafeAreaView>}
