import { Button } from './Button';
import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,

  colors: {
    primary: '#111',
    secondary: 'linear-gradient(180deg, #181A29 0%, #1D2331 100%)',
    cardBg: 'linear-gradient(90deg, #181A29 0%, #1D2331 100%)',
    yellowBg: '#FFDA3A',
    btn: 'linear-gradient(180deg, #FFDA3A 0%, #CD3214 100%)',
    miniCard: '#3C415A',
    searchBg: '#1D2331',
    textMain: 'rgba(255, 255, 255, 0.55)',
    grayGrad:
      'linear-gradient(180deg, #3C415A 0%, rgba(60, 65, 90, 0.00) 100%)',
  },
};
const theme = extendTheme(config);

export default theme;
