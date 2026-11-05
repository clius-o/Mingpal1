import { Text, type TextProps, type TextStyle } from 'react-native';
import { colors, type } from '../theme';

type Props = TextProps & {
  v: keyof typeof type;
  color?: keyof typeof colors;
};

/** Text with a Figma text style + colour token. */
export function Txt({ v, color = 'ink', style, ...rest }: Props) {
  const base: TextStyle = { ...type[v], color: colors[color] };
  return <Text {...rest} style={[base, style]} />;
}
