// Tab bar icons drawn with react-native-svg (24×24 outline style), so the app needs no icon font package.
import Svg, { Circle, Path, Rect } from 'react-native-svg';

type Props = { color: string; size: number };
const stroke = (color: string) => ({ stroke: color, strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' }) as const;

export function TodayIcon({ color, size }: Props) {
  const s = stroke(color);
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x={3.5} y={5} width={17} height={15.5} rx={2.5} {...s} />
      <Path d="M3.5 10h17M8 3v4M16 3v4" {...s} />
      <Circle cx={12} cy={15} r={1.6} fill={color} />
    </Svg>
  );
}

// A small grape bunch: three rows of berries under a stem and leaf.
export function GrapesIcon({ color, size }: Props) {
  const s = stroke(color);
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M12 6V3M12 4.5c1.5-1.5 3.5-1.8 5-1.2-.4 1.8-2.3 3-4.4 2.9" {...s} />
      <Circle cx={8.5} cy={9} r={2.3} {...s} />
      <Circle cx={12} cy={9} r={2.3} {...s} />
      <Circle cx={15.5} cy={9} r={2.3} {...s} />
      <Circle cx={10.2} cy={13.2} r={2.3} {...s} />
      <Circle cx={13.8} cy={13.2} r={2.3} {...s} />
      <Circle cx={12} cy={17.6} r={2.3} {...s} />
    </Svg>
  );
}

export function MapIcon({ color, size }: Props) {
  const s = stroke(color);
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M3.5 6.5 9 4.5l6 2 5.5-2v13l-5.5 2-6-2-5.5 2z" {...s} />
      <Path d="M9 4.5v13M15 6.5v13" {...s} />
    </Svg>
  );
}

export function TasteIcon({ color, size }: Props) {
  const s = stroke(color);
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M7 3h10l.6 5.5A5.6 5.6 0 0 1 12 14.6 5.6 5.6 0 0 1 6.4 8.5z" {...s} />
      <Path d="M6.7 8h10.6M12 14.6V20M8.5 20.5h7" {...s} />
    </Svg>
  );
}
