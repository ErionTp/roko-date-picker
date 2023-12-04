import { LayoutRectangle } from "react-native";
import { eCalendarPicker } from "../enums/e.calendar.picker";
import { tRange } from "./t.range";
import { tTheme } from "./t.theme";
import { eWeekDays } from "../enums/e.weekDays";

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
  containerMeasures: LayoutRectangle;
  setContainerMeasures: React.Dispatch<React.SetStateAction<LayoutRectangle>>;
  onAdjustDate: (args: boolean) => void;
};
