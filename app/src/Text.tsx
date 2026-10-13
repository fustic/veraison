// Text and TextInput that use the bundled IBM Plex Sans. Custom fonts need one file per
// weight, so the fontWeight in a style is translated into the matching font family.
// A style that sets its own fontFamily (display or mono) is left as it is.
import { StyleSheet, Text as RNText, TextInput as RNTextInput, type TextInputProps, type TextProps, type TextStyle } from 'react-native';
import { fonts } from './theme';

function familyFor(style: TextProps['style']): TextStyle | null {
  const flat = (StyleSheet.flatten(style) ?? {}) as TextStyle;
  if (flat.fontFamily) return null;
  const w = String(flat.fontWeight ?? '400');
  const fontFamily = w === '700' || w === '800' || w === '900' || w === 'bold' ? fonts.bold : w === '600' ? fonts.semibold : w === '500' ? fonts.medium : fonts.regular;
  return { fontFamily, fontWeight: 'normal' };
}

export function Text(props: TextProps) {
  const f = familyFor(props.style);
  return <RNText {...props} style={f ? [props.style, f] : props.style} />;
}

export function TextInput(props: TextInputProps) {
  const f = familyFor(props.style);
  return <RNTextInput {...props} style={f ? [props.style, f] : props.style} />;
}
