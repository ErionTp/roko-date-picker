import { LayoutRectangle } from "react-native";
import { eCalendarPicker } from "../enums/e.calendar.picker";
import { tRange } from "./t.range";
import { tTheme } from "./t.theme";

export type tMain = {
  mode: "range" | "single";
  range: tRange;
  setRange: React.Dispatch<React.SetStateAction<tRange>>;
  onChange: (args: Date) => void;
  pickerType: eCalendarPicker;
  setPickerType: React.Dispatch<React.SetStateAction<eCalendarPicker>>;
  currentDate: Date;
  onSetCurrentDate: (args: Date) => void;
  containerMeasures: LayoutRectangle;
  setContainerMeasures: React.Dispatch<React.SetStateAction<LayoutRectangle>>;
  theme?: tTheme;
};
