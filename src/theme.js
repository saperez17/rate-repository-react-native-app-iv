import { Platform } from 'react-native';

const theme = {
    colors: {
      textPrimary: '#212121',
      textSecondary: '#424242',
      primary: '#0366d6',
      backgroundDark: '#24292e',
      white: '#fff',
      whiteShadow1: '#949494'
    },
    fontSizes: {
      body: 14,
      subheading: 16,
    },
    fonts: {
      main: Platform.select({
        android: 'Roboto',
        ios: 'Arial',
        default: 'System'
      }),
    },
    fontWeights: {
      normal: '400',
      bold: '700',
    },
  };
  
  export default theme;