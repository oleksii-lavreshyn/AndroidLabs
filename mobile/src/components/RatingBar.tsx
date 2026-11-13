import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import { useAppTheme } from '@/theme/useAppTheme';
import { calculateStars } from '@/utils/rating';
export { calculateStars } from '@/utils/rating';
export function RatingBar({value,size=20}:{value:number;size?:number}){const {colors}=useAppTheme();return <View accessible accessibilityRole="image" accessibilityLabel={`Оцінка ${value.toFixed(1)} з 5`} style={{flexDirection:'row'}}>{calculateStars(value).map((fill,index)=><MaterialCommunityIcons key={index} name={fill==='full'?'star':fill==='half'?'star-half-full':'star-outline'} size={size} color={colors.star}/>)}</View>;}
