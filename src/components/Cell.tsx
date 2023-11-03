import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC, memo, useMemo } from 'react';
import { format } from 'date-fns';
import TodayIndicator from './TodayIndicator';
import { Theme } from '../models/Theme';
import { useMainContext } from '../hooks/MainContext';

interface Props {
  item: Date;
  setDate: (date: Date) => void;
  isSelected: boolean;
  isDifferentMonth: boolean;
  isBlocked: boolean;
}
const TestDay: FC<Props> = ({ item, setDate, isSelected, isDifferentMonth, isBlocked }) => {
  const { theme } = useMainContext();
  const themedStyle = useMemo(() => styles(theme), []);

  return (
    <TouchableOpacity disabled={isBlocked} activeOpacity={1} style={themedStyle.root} onPress={() => setDate(item)}>
      <View style={[isSelected && themedStyle.selectedBackground, themedStyle.container]}>
        <Text
          style={[
            themedStyle.defaultText,
            isSelected && themedStyle.selectedText,
            isDifferentMonth && !isSelected && themedStyle.differentMonthText,
            isBlocked && !isSelected && themedStyle.differentMonthText,
          ]}
        >
          {format(item, 'dd')}
        </Text>
        <TodayIndicator {...{ isSelected, item }} />
      </View>
    </TouchableOpacity>
  );
};

export default memo(TestDay);

const styles = (theme?: Partial<Theme>) =>
  StyleSheet.create({
    root: { flex: 1, alignItems: 'center' },
    defaultText: { color: theme?.onBackground, fontSize: 12 },
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    selectedBackground: {
      borderRadius: 100,
      aspectRatio: 1,
      backgroundColor: theme?.primary,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      borderWidth: 3,
      borderColor: 'white',
    },
    selectedText: {
      color: theme?.onPrimary,
    },
    differentMonthText: {
      color: theme?.onSecondary,
    },
  });
