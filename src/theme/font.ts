import { TextStyle } from 'react-native/types';
import colors from './color';

interface FontTheme {
    [key: string]: TextStyle;
  }

const size: FontTheme = {
    xs: { fontSize: 12 },
    sm: { fontSize: 14 },
    lg: { fontSize: 18 },
    xl: { fontSize: 20 },
    xxxxxxxl: { fontSize: 72 }
}

const weight: FontTheme = {
    extralight: { fontWeight: '200' },
    medium: { fontWeight: '500' },
    bold: { fontWeight: '700' },
}

const decoration: FontTheme = {
    underlined: { textDecorationLine: 'underline' },
}

const style: FontTheme = {
    italic: { fontStyle: 'italic' },
}

const textTransform: FontTheme = {
    capitalize: { textTransform: 'capitalize' },
}

const color: FontTheme = {
    white: { color: colors.white },
    orange: { color: colors.orange },
}

export default {
    size,
    weight,
    decoration,
    color,
    textTransform,
    style,
}