import RokoCalendar from "./app";
import materialColors from "./features/domain/data/colors.material";
import { tRange } from "./features/domain/types/t.range";
import { tTheme } from "./features/domain/types/t.theme";
import { eWeekDays } from "./features/domain/enums/e.weekDays";
import { defaults } from "./features/domain/constants";

export {
  RokoCalendar,
  materialColors,
  tTheme as CalendarTheme,
  tRange as CalendarRange,
  eWeekDays as CalendarWeekDays,
  defaults as CalendarDeafaults,
};
