import { Text } from './Text';
import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import Alert from './Alert';
import Radio from './Radio';
import Switch from './Switch';
const config = {
  colors: {
    primary: '#111',
    secondary: 'linear-gradient(180deg, #181A29 0%, #1D2331 100%)',
    whiteCard: '#F5F7F9',
    cardBg: 'linear-gradient(90deg, #181A29 0%, #1D2331 100%)',
    cardBg2: 'linear-gradient(133deg, #1D2331 45.83%, #181A29 100%)',
    modalBg: '#F5F5F5',
    modalText: '#1E1E1E',
    blueBg: '#409EFF',
    errorText: 'rgba(255, 58, 58, 0.75)',
    signinBg:
      'linear-gradient(135deg, rgba(239, 239, 239, 0.60) 0%, rgba(239, 239, 239, 0.10) 100%)',
    btn: 'linear-gradient(180deg, #FFDA3A 0%, #CD3214 100%)',
    inputGlassBg:
      'linear-gradient(133deg, rgba(255, 255, 255, 0.60) 0%, rgba(255, 255, 255, 0.30) 100%)',
    placeholder: '#181A29',

    yellowBg: '#FFDA3A',
    crossIcon: '#FEEAB5',
    miniCard: '#3C415A',
    searchBg: '#1D2331',
    textMain: 'rgba(255, 255, 255, 0.55)',
    grayText: 'rgba(27, 32, 46, 0.75)',
    placeHolder: 'rgba(255, 255, 255, 0.75)',
    activeSubMenu: '#F4E9CB',
    grayGrad:
      'linear-gradient(180deg, #3C415A 0%, rgba(60, 65, 90, 0.00) 100%)',
  },

  components: {
    Text,
    Alert,
    Switch,
    Radio,
  },
};
const theme = extendTheme(config);

export default theme;
