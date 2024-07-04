import { eCalendarPicker } from "../enums/e.calendar.picker";
import { tRange } from "./t.range";
import { tTheme } from "./t.theme";
import { eWeekDays } from "../enums/e.weekDays";
import { tLayoutRectangle } from "./t.layout.rectangle";

export type tMain = {
  mode: "range" | "single";
  range: tRange;
  setRange: (args: tRange) => void;
  blockedDates?: Date[];
  blockPast?: boolean;
  blockedWeekDay?: eWeekDays[];
  theme?: tTheme;
  onChange: (args: Date) => void;
  pickerType: eCalendarPicker;
  setPickerType: React.Dispatch<React.SetStateAction<eCalendarPicker>>;
  currentDate: Date;
  onSetCurrentDate: (args: Date) => void;
  layoutProps: tLayoutRectangle;
  onAdjustDate: (args: boolean) => void;
};
