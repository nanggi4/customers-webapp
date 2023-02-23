/* global  */
import { createTheme } from '@material-ui/core/styles';
export default createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1600,
      xl: 1920,
    }
  },
  smallfont: 'skew(-0.05deg)',
  palette: {
    primary: {
      main: '#0075FF'
    },
    secondary: {
      main: '#f73838'
    },
  },
  typography: {
    fontFamily: [
      'Pretendard',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Apple SD Gothic Neo"',
      '"Helvetica"',
      'Arial',
      '"Noto Sans KR"',
      'sans-serif',
    ].join(','),
  },
  overrides: {
  },
});