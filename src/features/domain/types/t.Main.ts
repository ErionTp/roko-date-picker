import { eType } from '../enums/e.Type';
import { tRange } from './t.Range';

export type tMain = {
  range: tRange;
  mode: 'range' | 'single';
  dateList: Date[][];
  calendarType: eType;
  setCalendarType: React.Dispatch<React.SetStateAction<eType>>;
};
