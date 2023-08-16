import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC, memo, useMemo } from 'react';
import { format, isToday } from 'date-fns';
import { useTheme } from '../hooks/ThemeContext';
import { ITheme } from '../models/ITheme';

interface Props {
  item: Date;
  selected: boolean;
  isCurrentMonth: boolean;
  onChange: (value: Date) => void;
}
const DayCell: FC<Props> = ({ item, selected, isCurrentMonth, onChange }) => {
  // #region HOOKS
  const theme = useTheme();
  // #endregion
  // #region FUNCTIONS
  const themedStyles = useMemo(() => styles(theme), [theme]);
  // #endregion
  return (
    <TouchableOpacity activeOpacity={1} style={[themedStyles.root]} onPress={() => onChange(item)}>
      <View style={[selected && themedStyles.selectedBackground, themedStyles.container]}>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={[themedStyles.text, selected && themedStyles.selectedText, !isCurrentMonth && !selected && themedStyles.differentMonthText]}
        >
          {format(item, 'dd')}
        </Text>

        {isToday(item) && (
          <View
            style={{
              height: 3,
              width: 3,
              borderRadius: 3,
              backgroundColor: selected ? theme.colors.onPrimary : theme.colors.primary,
              position: 'absolute',
              alignSelf: 'center',
              bottom: 6,
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default memo(DayCell);

const styles = (theme: ITheme) =>
  StyleSheet.create({
    root: { flex: 1, alignItems: 'center' },
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    selectedBackground: {
      borderRadius: 100,
      aspectRatio: 1,
      backgroundColor: theme.colors.primary,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      borderWidth: 3,
      borderColor: theme.colors.onPrimary,
    },
    selectedText: { color: theme.colors.onPrimary },
    differentMonthText: { color: theme.colors.onPrimaryVariant },
    text: { fontSize: 14 },
  });
