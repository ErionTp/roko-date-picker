import { eType } from '../enums/e.Type';
import { tRange } from './t.Range';
import { tTheme } from './t.Theme';

export type tMain = {
  range: tRange;
  mode: 'range' | 'single';
  calendarType: eType;
  setCalendarType: React.Dispatch<React.SetStateAction<eType>>;
  onChange: (args: tRange) => void;
  currentDate: Date;
  handleSetCurrentDate: (args: Date) => void;
  theme?: Partial<tTheme>;
  cellSize?: number;
  setCellSize: React.Dispatch<React.SetStateAction<number | undefined>>;
};
