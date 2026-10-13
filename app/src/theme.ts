// Tokens from the screen drafts.
export const colors = {
  paper: '#F4F5F2',
  surface: '#FFFFFF',
  ink: '#18161C',
  muted: '#5B5862',
  line: '#DAD9D3',
  track: '#ECEBE6',
  wine: '#7A1F3D',
  wineDark: '#5A142C',
  wineTint: '#F3E6EA',
  rose: '#C25B7F',
  good: '#2E6B3F',
  water: '#B9CCD8',
  land: '#E4E8DF',
} as const;

export const statusColors = {
  unseen: '#D8D6CF',
  seen: '#E7C9D3',
  studied: '#C25B7F',
  mastered: '#7A1F3D',
} as const;

/** Font files bundled in assets/fonts and loaded in app/_layout.tsx. */
export const fonts = {
  regular: 'IBMPlexSans-Regular',
  medium: 'IBMPlexSans-Medium',
  semibold: 'IBMPlexSans-SemiBold',
  bold: 'IBMPlexSans-Bold',
  display: 'BricolageGrotesque-Bold',
  mono: 'IBMPlexMono-Medium',
} as const;

export const space = (n: number) => n * 4;
export const radius = { sm: 10, md: 14, lg: 18 } as const;
