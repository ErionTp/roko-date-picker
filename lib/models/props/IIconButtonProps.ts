import { ComponentProps } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export interface IIconButtonProps {
  icon: ComponentProps<typeof MaterialCommunityIcons>['name'];
  onPress: () => void;
}
