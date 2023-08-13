// ThemeContext.tsx
import React, { createContext, useContext } from 'react';
import { ITheme, defaultTheme } from '../models/props/ITheme';

const ThemeContext = createContext<ITheme>(defaultTheme);

export const useTheme = () => {
  return useContext(ThemeContext);
};

export default ThemeContext;
