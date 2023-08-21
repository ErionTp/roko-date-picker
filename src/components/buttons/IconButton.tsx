import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { ComponentProps, FC } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useMainContext } from '../../hooks/MainContext';

interface Props {
  icon: ComponentProps<typeof MaterialCommunityIcons>['name'];
  onPress: () => void;
}
const IconButton: FC<Props> = ({ icon, onPress }) => {
  const { theme } = useMainContext();
  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <MaterialCommunityIcons name={icon} size={24} color={theme?.primary} />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({ root: { alignItems: 'center', height: '100%', width: 40, justifyContent: 'center' } });
