// ThemeContext.tsx
import { createContext, useContext } from 'react';
import { ITheme } from '../models/ITheme';

type IContextProps = {
  value: Date[];
  onChange: (value: any) => void;
  multiple?: boolean;
  theme: ITheme;
};

const DEFAULT_CONTEXT: IContextProps = { value: [], onChange: () => Function.prototype, multiple: false, theme: {} };

const MainContext = createContext<IContextProps>(DEFAULT_CONTEXT);

export const useMainContext = () => {
  return useContext(MainContext);
};

export default MainContext;
