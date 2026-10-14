// A grape bunch in the variety's own berry colour (Grape.berryColour), used wherever a
// grape needs a picture. Ten berries in rows of 4-3-2-1 under a stem and leaf.
import Svg, { Circle, Path } from 'react-native-svg';

/** Mixes a #RRGGBB colour towards black (amount < 0) or white (amount > 0). */
function shade(hex: string, amount: number): string {
  const n = parseInt(hex.slice(1), 16);
  const mix = (c: number) => Math.round(amount < 0 ? c * (1 + amount) : c + (255 - c) * amount);
  const r = mix((n >> 16) & 255);
  const g = mix((n >> 8) & 255);
  const b = mix(n & 255);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

const BERRIES: [number, number][] = [
  [12, 17], [20, 17], [28, 17], [36, 17],
  [16, 24.5], [24, 24.5], [32, 24.5],
  [20, 32], [28, 32],
  [24, 39.5],
];

export function GrapeIcon({ colour, size = 34 }: { colour: string; size?: number }) {
  const rim = shade(colour, -0.35);
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <Path d="M24 13 V6 M24 8 C21 5 17 5 14 7" fill="none" stroke="#6B4A2E" strokeWidth={2} strokeLinecap="round" />
      <Path d="M25 7 C29 2 36 3 39 7 C35 10 29 10 25 7 Z" fill="#6E8B3D" />
      {BERRIES.map(([cx, cy]) => (
        <Circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={4.6} fill={colour} stroke={rim} strokeWidth={0.8} />
      ))}
      {BERRIES.map(([cx, cy]) => (
        <Circle key={`h${cx}-${cy}`} cx={cx - 1.5} cy={cy - 1.5} r={1.2} fill="#FFFFFF" opacity={0.5} />
      ))}
    </Svg>
  );
}
