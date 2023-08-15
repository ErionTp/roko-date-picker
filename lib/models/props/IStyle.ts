import { ITheme } from '../ITheme';

// Theme.ts
type IStyle = {
  primary?: string;
  onPrimary?: string;
  secondary?: string;
  primaryVariant?: string;
  onPrimaryVariant?: string;
  background?: string;
  onBackground?: string;
};

const defaultTheme: ITheme = {
  colors: {
    primary: '#757575',
    onPrimary: '#F5F5F5',
    secondary: '#BDBDBD',
    primaryVariant: '#F5F5F5',
    onPrimaryVariant: '#9E9E9E',
    background: '#FAFAFA',
    onBackground: '#212121',
  },
  spacing: {
    weekHeight: undefined,
  },
};

export type { IStyle };
export { defaultTheme };
