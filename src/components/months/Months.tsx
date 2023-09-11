import React from 'react';
import { Text, StyleSheet, FlatList, TouchableOpacity, View } from 'react-native';
import { IMonth } from '../../models/IMonth';
import Constants from '../../utils/Constants';

interface Props {
  currentMonth: string;
  setSelectedMonth: (val: IMonth) => void;
  bodyType: (val: string) => void;
}
const monthData: IMonth[] = [
  { id: 1, name: 'January' },
  { id: 2, name: 'February' },
  { id: 3, name: 'March' },
  { id: 4, name: 'April' },
  { id: 5, name: 'May' },
  { id: 6, name: 'June' },
  { id: 7, name: 'July' },
  { id: 8, name: 'August' },
  { id: 9, name: 'September' },
  { id: 10, name: 'October' },
  { id: 11, name: 'November' },
  { id: 12, name: 'December' },
];

const Months = (props: Props) => {
  const { setSelectedMonth, bodyType, currentMonth } = props;

  const renderItem = ({ item }: { item: IMonth }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedMonth(item);
        bodyType('year');
      }}
      style={styles.mothItem}
    >
      <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }, currentMonth === item.name && styles.selectedMonthButton]}>
        <Text style={[currentMonth === item.name && styles.selectedMonthButton]}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        columnWrapperStyle={{ height: '25%', flexGrow: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        data={monthData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
      />
    </View>
  );
};

export default Months;

const styles = StyleSheet.create({
  mothItem: {
    flex: 1,
  },
  selectedMonthButton: {
    backgroundColor: 'lightblue',
  },
});
