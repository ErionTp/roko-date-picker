import React, { useMemo } from 'react';
import { Text, StyleSheet, FlatList, TouchableOpacity, View } from 'react-native';
import { Month } from '../models/Month';
import { CalendarType } from '../utils/Enums';
import { useMainContext } from '../features/hooks/MainContext';
import { Theme } from '../models/Theme';
import { monthData } from '../utils/Common';

interface Props {
  currentMonth: string;
  setSelectedMonth: (val: Month) => void;
  bodyType: (val: string) => void;
}

const Months = (props: Props) => {
  // #region Properties
  const { setSelectedMonth, bodyType, currentMonth } = props;
  // #endregion
  // #region Hooks
  const context = useMainContext();
  // #endregion
  // #region Functions
  const themedStyles = useMemo(() => styles(context.theme), []);
  // #endregion
  // #region Variables
  const ListItem = ({ item }: { item: Month }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedMonth(item);
        bodyType(CalendarType.Calendar);
      }}
      style={themedStyles.mothItem}
    >
      <View style={[themedStyles.listItemRoot, currentMonth === item.name && themedStyles.selectedMonthButton]}>
        <Text style={[currentMonth === item.name && themedStyles.selectedMonthText]}>{item.name.slice(0, 3)}</Text>
      </View>
    </TouchableOpacity>
  );
  // #endregion
  return (
    <View style={themedStyles.root}>
      <FlatList
        columnWrapperStyle={{ height: '25%', flexGrow: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        data={monthData}
        renderItem={ListItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
      />
    </View>
  );
};

export default Months;

const styles = (theme: Partial<Theme>) =>
  StyleSheet.create({
    root: { flex: 1 },
    mothItem: {
      flex: 1,
    },
    selectedMonthButton: {
      backgroundColor: theme.primary,
    },
    selectedMonthText: {
      color: theme.onPrimary,
    },
    listItemRoot: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  });
