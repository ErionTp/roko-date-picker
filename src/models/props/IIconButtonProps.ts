import { ComponentProps } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export interface IIconButtonProps {
  icon: ComponentProps<typeof MaterialCommunityIcons>['name'];
  onPress: () => void;
}
