import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC, useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import IconButton from '../buttons/IconButton';
import Layout from '../../utils/Sizes';
import { tTheme } from '../../features/domain/types/t.Theme';
import useMain from '../../features/hooks/useMain';
import Constants from '../../utils/Constants';
import { eType } from '../../features/domain/enums/e.Type';
import defaultTheme from '../../features/domain/data/default.theme';

interface Props {
  onPreviousMonthClick: () => void;
  onNextMonthClick: () => void;
}

const CalendarHeader: FC<Props> = ({ onPreviousMonthClick, onNextMonthClick }) => {
  // #region Hooks
  const { theme, setCalendarType, calendarType, currentDate, setCurrentDate } = useMain();
  // #endregion
  // #region Functions
  const handleOnCalendarTypeChange = () => {
    setCalendarType((prevType) => {
      const nextType = (prevType + 1) % (Object.keys(eType).length / 2);
      return nextType;
    });
  };

  const handleOnPrevious = useCallback(() => {
    const newDate = new Date(currentDate);

    switch (calendarType) {
      case eType.YEAR:
        newDate.setFullYear(newDate.getFullYear() - 1);
        break;
      case eType.DECADE:
        newDate.setFullYear(newDate.getFullYear() - 12);
        break;
      case eType.MONTH:
      default:
        newDate.setMonth(newDate.getMonth() - 1);
        break;
    }

    setCurrentDate(newDate);
  }, [currentDate, calendarType]);

  const handleOnNext = useCallback(() => {
    const newDate = new Date(currentDate);

    switch (calendarType) {
      case eType.YEAR:
        newDate.setFullYear(newDate.getFullYear() + 1);
        break;
      case eType.DECADE:
        newDate.setFullYear(newDate.getFullYear() + 12);
        break;
      case eType.MONTH:
      default:
        newDate.setMonth(newDate.getMonth() + 1);
        break;
    }

    setCurrentDate(newDate);
  }, [currentDate, calendarType]);

  // #endregion
  // #region Variables
  const TextFormat = {
    0: format(currentDate, 'MMMM, yyyy'),
    1: format(currentDate, 'yyyy'),
    2: format(currentDate, 'yyyy'),
  };

  const customStyles = useMemo(() => {
    const currentTheme: Partial<tTheme> = theme ?? defaultTheme;
    return styles(currentTheme);
  }, [theme]);
  // #endregion
  return (
    <View style={customStyles.root}>
      <IconButton icon={'chevron-left'} onPress={handleOnPrevious} />
      <TouchableOpacity onPress={handleOnCalendarTypeChange} activeOpacity={1} style={customStyles.textContainer}>
        <Text style={customStyles.text}>{TextFormat[calendarType]}</Text>
      </TouchableOpacity>
      <IconButton icon={'chevron-right'} onPress={handleOnNext} />
    </View>
  );
};

export default CalendarHeader;

const styles = (theme: Partial<tTheme>) =>
  StyleSheet.create({
    root: { height: Layout.headerHeight, flexDirection: 'row' },
    textContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    text: { fontSize: Constants.spacing.regular, color: theme.onBackground, textTransform: 'capitalize' },
  });
