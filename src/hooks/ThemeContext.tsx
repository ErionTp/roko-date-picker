// ThemeContext.tsx
import { createContext, useContext } from 'react';
import { defaultTheme } from '../models/props/IStyle';
import { ITheme } from '../models/ITheme';

const ThemeContext = createContext<ITheme>(defaultTheme);

export const useTheme = () => {
  return useContext(ThemeContext);
};

export default ThemeContext;
