// Picture icons for aromas, ported from the AromaIcon component in the screen drafts.
// Generated from the design's SVG; each shape is drawn in a 48×48 box with one or two colours.
import type { JSX } from 'react';
import Svg, { Circle, Ellipse, G, Path, Rect } from 'react-native-svg';

type Draw = (c1: string, c2: string) => JSX.Element;

const SHAPES: Record<string, Draw> = {
  fruit: (c1, c2) => (
    <>
      <Path d="M24 15 C24 11 25 8 27 6" fill="none" stroke="#5B4A2E" strokeWidth={2} strokeLinecap="round" /><Path d="M26 10 C30 6 35 7 37 10 C33 12 29 12 26 10 Z" fill="#6E8B3D" /><Circle cx={24} cy={28} r={13} fill={c1} /><Ellipse cx={18.5} cy={23} rx={3} ry={4.5} fill="#FFFFFF" opacity={0.35} />
    </>
  ),
  pear: (c1, c2) => (
    <>
      <Path d="M24 12 C24 9 25 7 27 5" fill="none" stroke="#5B4A2E" strokeWidth={2} strokeLinecap="round" /><Path d="M24 12 C19 12 18 17 19 21 C14 25 12 31 13 35 C15 41 20 43 24 43 C28 43 33 41 35 35 C36 31 34 25 29 21 C30 17 29 12 24 12 Z" fill={c1} /><Ellipse cx={18} cy={31} rx={2.5} ry={4.5} fill="#FFFFFF" opacity={0.3} />
    </>
  ),
  citrus: (c1, c2) => (
    <>
      <Circle cx={24} cy={24} r={16} fill={c1} /><Circle cx={24} cy={24} r={12.5} fill={c2} /><Path d="M24 11.5 V36.5 M11.5 24 H36.5 M15.2 15.2 L32.8 32.8 M32.8 15.2 L15.2 32.8" fill="none" stroke="#FFFFFF" opacity={0.8} strokeWidth={1.5} /><Circle cx={24} cy={24} r={2} fill="#FFFFFF" />
    </>
  ),
  halved: (c1, c2) => (
    <>
      <Circle cx={24} cy={24} r={16} fill={c1} /><Circle cx={24} cy={24} r={11.5} fill={c2} /><Circle cx={21} cy={22} r={1.4} fill={c1} opacity={0.6} /><Circle cx={27} cy={24} r={1.4} fill={c1} opacity={0.6} /><Circle cx={23} cy={28} r={1.4} fill={c1} opacity={0.6} />
    </>
  ),
  berries: (c1, c2) => (
    <>
      <G fill={c1} stroke={c2} strokeWidth={1}><Circle cx={17} cy={20} r={5.5} /><Circle cx={27} cy={17} r={5.5} /><Circle cx={34} cy={25} r={5.5} /><Circle cx={23} cy={28} r={5.5} /><Circle cx={31} cy={34} r={5.5} /><Circle cx={15} cy={32} r={5.5} /><Circle cx={23} cy={39} r={5.5} /></G><G fill="#FFFFFF" opacity={0.55}><Circle cx={15.5} cy={18.5} r={1.4} /><Circle cx={25.5} cy={15.5} r={1.4} /><Circle cx={32.5} cy={23.5} r={1.4} /><Circle cx={21.5} cy={26.5} r={1.4} /><Circle cx={29.5} cy={32.5} r={1.4} /><Circle cx={13.5} cy={30.5} r={1.4} /><Circle cx={21.5} cy={37.5} r={1.4} /></G>
    </>
  ),
  cherry: (c1, c2) => (
    <>
      <Path d="M17 26 C18 17 21 12 25 8 M31 24 C29 17 27 12 25 8" fill="none" stroke="#5B6B2E" strokeWidth={2} strokeLinecap="round" /><Path d="M25 8 C29 5 34 6 36 9 C32 11 28 11 25 8 Z" fill="#6E8B3D" /><Circle cx={17} cy={32} r={8} fill={c1} /><Circle cx={31} cy={30} r={8} fill={c1} /><Circle cx={14.5} cy={29.5} r={2} fill="#FFFFFF" opacity={0.5} /><Circle cx={28.5} cy={27.5} r={2} fill="#FFFFFF" opacity={0.5} />
    </>
  ),
  strawberry: (c1, c2) => (
    <>
      <Path d="M24 43 C14 35 10 27 12 21 C14 15 20 14 24 17 C28 14 34 15 36 21 C38 27 34 35 24 43 Z" fill={c1} /><Path d="M15 15 L20 13 L24 9 L28 13 L33 15 L28 18 L24 16 L20 18 Z" fill="#4E8A3A" /><G fill="#F2D16B"><Circle cx={19} cy={23} r={1} /><Circle cx={25} cy={22} r={1} /><Circle cx={30} cy={24} r={1} /><Circle cx={17} cy={29} r={1} /><Circle cx={23} cy={28} r={1} /><Circle cx={29} cy={30} r={1} /><Circle cx={21} cy={34} r={1} /><Circle cx={26} cy={35} r={1} /></G>
    </>
  ),
  flower: (c1, c2) => (
    <>
      <Path d="M24 30 C24 36 23 40 21 45" fill="none" stroke="#4E8A3A" strokeWidth={2} strokeLinecap="round" /><G fill={c1} stroke="#CFCBC0" strokeWidth={1}><Circle cx={24} cy={11} r={6.5} /><Circle cx={13.5} cy={18.5} r={6.5} /><Circle cx={34.5} cy={18.5} r={6.5} /><Circle cx={17.5} cy={30} r={6.5} /><Circle cx={30.5} cy={30} r={6.5} /></G><Circle cx={24} cy={21.5} r={4.5} fill={c2} />
    </>
  ),
  leaf: (c1, c2) => (
    <>
      <Path d="M8 40 C10 22 24 10 40 8 C40 26 28 40 8 40 Z" fill={c1} /><Path d="M8 40 C17 31 28 20 40 8" fill="none" stroke="#FFFFFF" opacity={0.5} strokeWidth={1.5} /><Path d="M20 28 L18 21 M26 22 L25 15 M22 25 L29 27 M28 18 L34 20" fill="none" stroke="#FFFFFF" opacity={0.35} strokeWidth={1.2} strokeLinecap="round" />
    </>
  ),
  leaves: (c1, c2) => (
    <>
      <Path d="M6 41 H42" fill="none" stroke="#6B4A2E" strokeWidth={2} strokeLinecap="round" /><Path d="M8 38 C12 24 26 16 38 14 C36 27 26 36 8 38 Z" fill={c1} /><Path d="M8 38 C18 30 28 22 38 14" fill="none" stroke="#000000" opacity={0.2} strokeWidth={1.5} /><Path d="M22 39 C24 32 30 28 40 27 C38 34 32 39 22 39 Z" fill={c2} />
    </>
  ),
  pepper: (c1, c2) => (
    <>
      <Path d="M24 14 C24 10 26 7 29 6" fill="none" stroke="#3E6B2E" strokeWidth={2.5} strokeLinecap="round" /><Path d="M14 18 C12 30 15 41 21 42 C23 42 24 40 24 40 C24 40 25 42 27 42 C33 41 36 30 34 18 C30 13 18 13 14 18 Z" fill={c1} /><Ellipse cx={18.5} cy={26} rx={2} ry={6} fill="#FFFFFF" opacity={0.3} />
    </>
  ),
  pod: (c1, c2) => (
    <>
      <Path d="M10 40 C17 30 27 18 35 8" fill="none" stroke={c1} strokeWidth={5} strokeLinecap="round" /><Path d="M16 42 C23 32 32 21 40 12" fill="none" stroke={c2} strokeWidth={5} strokeLinecap="round" />
    </>
  ),
  seeds: (c1, c2) => (
    <>
      <G fill={c1} stroke={c2} strokeWidth={0.8}><Circle cx={14} cy={16} r={3.2} /><Circle cx={25} cy={13} r={3.2} /><Circle cx={35} cy={18} r={3.2} /><Circle cx={19} cy={25} r={3.2} /><Circle cx={30} cy={27} r={3.2} /><Circle cx={12} cy={33} r={3.2} /><Circle cx={23} cy={36} r={3.2} /><Circle cx={35} cy={36} r={3.2} /><Circle cx={40} cy={27} r={3.2} /></G>
    </>
  ),
  clove: (c1, c2) => (
    <>
      <Path d="M24 18 L24 42" fill="none" stroke="#6B3A1E" strokeWidth={4} strokeLinecap="round" /><Circle cx={24} cy={15} r={5.5} fill="#7A4424" /><Circle cx={24} cy={8.5} r={3} fill="#5A3018" /><Circle cx={18.5} cy={12} r={3} fill="#5A3018" /><Circle cx={29.5} cy={12} r={3} fill="#5A3018" />
    </>
  ),
  stick: (c1, c2) => (
    <>
      <Rect x={8} y={17} width={32} height={7} rx={3.5} fill={c1} transform="rotate(-25 24 20.5)" /><Rect x={8} y={26} width={32} height={7} rx={3.5} fill={c2} transform="rotate(-25 24 29.5)" />
    </>
  ),
  drop: (c1, c2) => (
    <>
      <Path d="M24 6 C30 16 36 23 36 30 C36 37 30.6 42 24 42 C17.4 42 12 37 12 30 C12 23 18 16 24 6 Z" fill={c1} stroke={c2} strokeWidth={1.2} /><Ellipse cx={19} cy={30} rx={2.5} ry={5} fill="#FFFFFF" opacity={0.4} />
    </>
  ),
  block: (c1, c2) => (
    <>
      <Rect x={8} y={14} width={32} height={22} rx={4} fill={c1} stroke={c2} strokeWidth={1.5} /><Path d="M8 20 H40" fill="none" stroke={c2} opacity={0.5} strokeWidth={1.5} /><Circle cx={17} cy={28} r={2} fill={c2} opacity={0.45} /><Circle cx={30} cy={26} r={1.6} fill={c2} opacity={0.45} />
    </>
  ),
  bread: (c1, c2) => (
    <>
      <Path d="M8 32 C8 20 14 14 24 14 C34 14 40 20 40 32 C40 35 38 36 36 36 H12 C10 36 8 35 8 32 Z" fill={c1} stroke={c2} strokeWidth={2} /><Path d="M16 20 L19 26 M23 18 L26 25 M30 20 L33 26" fill="none" stroke={c2} strokeWidth={2} strokeLinecap="round" />
    </>
  ),
  toast: (c1, c2) => (
    <>
      <Path d="M10 18 C10 10 16 8 24 8 C32 8 38 10 38 18 C38 21 36 22 35 23 L35 40 L13 40 L13 23 C12 22 10 21 10 18 Z" fill={c1} stroke={c2} strokeWidth={2.5} strokeLinejoin="round" /><Path d="M18 26 L30 34 M18 32 L26 37 M22 21 L32 27" fill="none" stroke={c2} opacity={0.7} strokeWidth={2} strokeLinecap="round" />
    </>
  ),
  cookie: (c1, c2) => (
    <>
      <Circle cx={24} cy={24} r={15} fill={c1} stroke={c2} strokeWidth={2} /><G fill={c2}><Circle cx={19} cy={19} r={1.5} /><Circle cx={28} cy={18} r={1.5} /><Circle cx={30} cy={27} r={1.5} /><Circle cx={20} cy={29} r={1.5} /><Circle cx={24} cy={24} r={1.5} /></G>
    </>
  ),
  nut: (c1, c2) => (
    <>
      <Ellipse cx={24} cy={25} rx={10} ry={15} fill={c1} stroke={c2} strokeWidth={1.5} transform="rotate(20 24 25)" /><Path d="M20 12 C22 21 23 29 27 38" fill="none" stroke={c2} opacity={0.6} strokeWidth={1.5} strokeLinecap="round" />
    </>
  ),
  stone: (c1, c2) => (
    <>
      <Path d="M8 34 C8 26 14 18 22 16 C30 14 38 20 40 28 C42 36 34 40 24 40 C14 40 8 38 8 34 Z" fill={c1} /><Path d="M14 30 L22 24 L30 27" fill="none" stroke="#FFFFFF" opacity={0.4} strokeWidth={1.5} strokeLinecap="round" /><Ellipse cx={18} cy={23} rx={3} ry={1.8} fill="#FFFFFF" opacity={0.3} />
    </>
  ),
  earth: (c1, c2) => (
    <>
      <Path d="M4 40 C10 28 18 24 24 24 C32 24 40 30 44 40 Z" fill={c1} /><Circle cx={18} cy={34} r={2.5} fill="#9C7A55" /><Circle cx={28} cy={31} r={2} fill="#9C7A55" /><Circle cx={34} cy={36} r={2.5} fill="#4E3420" /><Path d="M24 24 C23 18 25 14 22 10 M24 22 C27 18 30 17 32 13" fill="none" stroke="#5B6B2E" strokeWidth={2} strokeLinecap="round" />
    </>
  ),
  smoke: (c1, c2) => (
    <>
      <Path d="M16 42 C10 34 22 30 16 22 C11 15 20 12 18 6" fill="none" stroke={c1} strokeWidth={3} strokeLinecap="round" /><Path d="M25 42 C19 34 31 30 25 22 C20 15 29 12 27 6" fill="none" stroke={c2} strokeWidth={3} strokeLinecap="round" /><Path d="M34 42 C28 35 39 31 34 24 C30 18 37 15 36 10" fill="none" stroke={c1} opacity={0.6} strokeWidth={3} strokeLinecap="round" />
    </>
  ),
  bean: (c1, c2) => (
    <>
      <Ellipse cx={24} cy={24} rx={11} ry={15} fill={c1} transform="rotate(25 24 24)" /><Path d="M18 12 C26 20 20 28 30 37" fill="none" stroke={c2} strokeWidth={2} strokeLinecap="round" />
    </>
  ),
  mushroom: (c1, c2) => (
    <>
      <Rect x={19} y={22} width={10} height={18} rx={4} fill="#EADBC8" /><Path d="M8 25 C8 12 40 12 40 25 Z" fill={c1} /><Circle cx={17} cy={19} r={2} fill="#D9C2A5" /><Circle cx={27} cy={16} r={2.4} fill="#D9C2A5" /><Circle cx={33} cy={21} r={1.6} fill="#D9C2A5" /><Path d="M6 41 H42" fill="none" stroke="#6B4A2E" strokeWidth={2} strokeLinecap="round" />
    </>
  ),
  banana: (c1, c2) => (
    <>
      <Path d="M8 26 C12 40 32 42 42 24 C34 32 20 33 12 24 Z" fill={c1} /><Path d="M12 24 C20 33 34 32 42 24" fill="none" stroke={c2} strokeWidth={1.5} /><Path d="M8 26 L6 21" fill="none" stroke="#5B4A2E" strokeWidth={3} strokeLinecap="round" /><Circle cx={42} cy={24} r={1.8} fill="#5B4A2E" />
    </>
  ),
  pineapple: (c1, c2) => (
    <>
      <Path d="M24 17 L18 5 L22 10 L24 3 L26 10 L30 5 Z" fill="#4E8A3A" /><Ellipse cx={24} cy={30} rx={11} ry={13.5} fill={c1} /><Path d="M16 22 L32 38 M32 22 L16 38 M14 30 L26 42 M34 30 L22 42 M19 18 L34 33 M29 18 L14 33" fill="none" stroke={c2} opacity={0.7} strokeWidth={1} />
    </>
  ),
  dried: (c1, c2) => (
    <>
      <Ellipse cx={17} cy={26} rx={8} ry={6} fill={c1} /><Ellipse cx={31} cy={21} rx={8} ry={6} fill={c1} /><Ellipse cx={27} cy={34} rx={8} ry={6} fill={c1} /><Path d="M12 25 C15 27 18 24 21 27 M26 20 C29 22 32 19 35 22 M22 33 C25 35 28 32 31 35" fill="none" stroke={c2} strokeWidth={1.3} strokeLinecap="round" />
    </>
  ),
  jar: (c1, c2) => (
    <>
      <Rect x={14} y={10} width={20} height={7} rx={2} fill="#C9A227" /><Rect x={12} y={17} width={24} height={25} rx={5} fill={c1} /><Rect x={16} y={25} width={16} height={9} rx={2} fill="#F4F5F2" />
    </>
  ),
  pot: (c1, c2) => (
    <>
      <Path d="M20 14 C18 11 22 9 20 6 M28 14 C26 11 30 9 28 6" fill="none" stroke="#A9A7AE" strokeWidth={1.8} strokeLinecap="round" /><Path d="M8 22 H40 L37 38 C36 40 34 41 32 41 H16 C14 41 12 40 11 38 Z" fill="#6F6D76" /><Ellipse cx={24} cy={22} rx={16} ry={4} fill={c1} /><Path d="M4 25 H8 M40 25 H44" fill="none" stroke="#6F6D76" strokeWidth={3} strokeLinecap="round" />
    </>
  ),
  antler: (c1, c2) => (
    <>
      <G fill="none" stroke={c1} strokeWidth={3.2} strokeLinecap="round"><Path d="M26 42 C24 32 19 24 14 10" /><Path d="M22 31 L11 26" /><Path d="M19 23 L9 17" /><Path d="M16 15 L22 7" /><Path d="M24 34 L36 30" /></G>
    </>
  ),
  steak: (c1, c2) => (
    <>
      <Path d="M10 28 C8 18 18 12 28 14 C38 16 42 24 38 32 C35 38 26 40 20 38 C14 36 11 33 10 28 Z" fill={c1} /><Path d="M14 30 C18 34 26 35 32 32" fill="none" stroke={c2} strokeWidth={3} strokeLinecap="round" />
    </>
  ),
  hide: (c1, c2) => (
    <>
      <Path d="M12 9 C16 13 20 11 24 9 C28 11 32 13 36 9 C38 15 36 20 38 24 C36 30 38 34 36 40 C32 36 28 38 24 40 C20 38 16 36 12 40 C10 34 12 30 10 24 C12 20 10 15 12 9 Z" fill={c1} /><Path d="M16 16 C20 17 28 17 32 16 M15 24 H33 M16 32 C20 31 28 31 32 32" fill="none" stroke={c2} strokeWidth={1.2} strokeDasharray="2 2" />
    </>
  ),
  barn: (c1, c2) => (
    <>
      <Path d="M8 22 L24 10 L40 22 V40 H8 Z" fill={c1} /><Rect x={18} y={26} width={12} height={14} fill={c2} /><Path d="M18 26 L30 40 M30 26 L18 40" fill="none" stroke={c1} strokeWidth={1.5} />
    </>
  ),
  root: (c1, c2) => (
    <>
      <Path d="M8 30 C8 24 14 22 18 24 C20 18 26 16 30 20 C34 16 40 20 38 26 C42 30 38 36 32 34 C28 38 20 38 16 34 C12 36 8 34 8 30 Z" fill={c1} stroke={c2} strokeWidth={1.5} /><Path d="M16 28 L20 30 M26 26 L30 28" fill="none" stroke={c2} strokeWidth={1.2} strokeLinecap="round" />
    </>
  ),
};

export const AROMA_SHAPES = Object.keys(SHAPES);

export function AromaIcon({ shape, c1, c2, size = 38 }: { shape: string; c1: string; c2?: string; size?: number }) {
  const draw = SHAPES[shape] ?? SHAPES.fruit!;
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      {draw(c1, c2 ?? c1)}
    </Svg>
  );
}
