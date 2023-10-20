// ThemeContext.tsx
import { createContext, useContext } from 'react';
import { Theme } from '../models/Theme';
import { defaultTheme } from '../utils/Common';

type IContextProps = {
  value: Date[];
  onChange: (value: any) => void;
  multiple?: boolean;
  blockedDates?: Date[];
  theme: Partial<Theme>;
};

const DEFAULT_CONTEXT: IContextProps = { value: [], onChange: () => Function.prototype, multiple: false, blockedDates: [], theme: defaultTheme };

const MainContext = createContext<IContextProps>(DEFAULT_CONTEXT);

export const useMainContext = () => {
  return useContext(MainContext);
};

export default MainContext;
