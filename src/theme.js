import { Platform } from 'react-native';

const theme = {
  colors: {
    appBarBg: '#24292e',
    mainBg: '#e1e4e8',
    white: '#ffffff',
    redError: '#d73a4a',
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    gray: 'gray',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  //Reusable styles
  styles: {
    container: {
      flexGrow: 1,
      flexShrink: 1,
    },
  },
};

export default theme;
