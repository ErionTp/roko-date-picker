import { StyleSheet, View } from 'react-native';
import React, { FC } from 'react';
import MonthView from '../month';
import useMain from '../../features/hooks/useMain';
import YearView from '../year';
import DecadeView from '../decade';
import Header from '../header';

type Props = {};
const Container: FC<Props> = ({}) => {
  // #region Members
  const { calendarType } = useMain();
  // #endregion
  // #region Variables
  const renderItem = {
    0: <MonthView />,
    1: <YearView />,
    2: <DecadeView />,
  };
  // #endregion
  return (
    <View style={styles.root}>
      <Header />
      {renderItem[calendarType]}
    </View>
  );
};

export default Container;

Container.displayName = 'Container';

const styles = StyleSheet.create({ root: { flex: 1 } });
