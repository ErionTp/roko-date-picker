import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { ComponentProps, FC, useMemo } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { tTheme } from '../../../features/domain/types/t.Theme';
import useMain from '../../../features/hooks/useMain';
import defaultTheme from '../../../features/domain/data/default.theme';

interface Props {
  icon: ComponentProps<typeof MaterialCommunityIcons>['name'];
  onPress: () => void;
}
const Pressable: FC<Props> = ({ icon, onPress }) => {
  // #region Hooks
  const { theme } = useMain();
  // #endregion
  // #region Variables
  const customStyles = useMemo(() => {
    const currentTheme: Partial<tTheme> = theme ?? defaultTheme;
    return styles(currentTheme);
  }, [theme]);
  // #endregion
  return (
    <TouchableOpacity style={customStyles.root} onPress={onPress}>
      <MaterialCommunityIcons name={icon} size={24} color={(theme ?? defaultTheme).onBackground} />
    </TouchableOpacity>
  );
};

export default Pressable;

const styles = (theme: Partial<tTheme>) => StyleSheet.create({ root: { alignItems: 'center', height: '100%', width: 40, justifyContent: 'center' } });
