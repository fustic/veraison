import type { Grape } from '../../core/src/content.ts';

export default {
  id: 'grape:sauvignon-blanc',
  name: 'Sauvignon Blanc',
  colour: 'white',
  berryColour: '#A9C25A',
  traits: ['Aromatic', 'Vigorous', 'Prone to fungal disease'],
  structure: {
    cool: { appearanceIntensity: [0, 0], acidity: [4, 4], body: [0, 1], alcohol: [1, 1], noseIntensity: [3, 4] },
    warm: { appearanceIntensity: [0, 1], acidity: [3, 3], body: [1, 2], alcohol: [1, 2], noseIntensity: [3, 4] },
  },
  aromas: [
    { aromaId: 'aroma:grass', ripeness: 'less' },
    { aromaId: 'aroma:green-bell-pepper', ripeness: 'less' },
    { aromaId: 'aroma:asparagus', ripeness: 'less' },
    { aromaId: 'aroma:gooseberry', ripeness: 'less' },
    { aromaId: 'aroma:grapefruit', ripeness: 'ripe' },
    { aromaId: 'aroma:lime', ripeness: 'ripe' },
    { aromaId: 'aroma:passion-fruit', ripeness: 'very' },
    { aromaId: 'aroma:mango', ripeness: 'very' },
    { aromaId: 'aroma:elderflower' },
    { aromaId: 'aroma:flint' },
    { aromaId: 'aroma:toast-oak' },
  ],
  why: [
    { factor: 'Cool climate', effect: 'methoxypyrazines survive', result: 'grassy, herbaceous aromas' },
    { factor: 'Cool fermentation in stainless steel', effect: 'preserves volatile aromas', result: 'pungent, primary fruit' },
    { factor: 'Barrel fermentation (Pessac-Léognan, some Pouilly-Fumé)', effect: 'texture and toast', result: 'fuller style that can age' },
  ],
  lookAlikes: [
    { grapeId: 'grape:chardonnay', tell: 'Unoaked Chardonnay is far less aromatic and never grassy.' },
    { grapeId: 'grape:gruner-veltliner', tell: 'Grüner shows white pepper and less pungent fruit.' },
  ],
  regions: [
    {
      regionId: 'region:fr-loire-sancerre',
      styleLevel: 2,
      style: 'High acid, citrus, gooseberry, grass and a flinty note.',
      producers: ['Henri Bourgeois', 'Domaine Vacheron'],
    },
    {
      regionId: 'region:fr-bordeaux-pessac-leognan',
      styleLevel: 3,
      style: 'Blended with Sémillon, often barrel-fermented: citrus with toast and vanilla.',
      producers: ['Château Smith Haut Lafitte'],
    },
    {
      regionId: 'region:nz-marlborough',
      styleLevel: 4,
      style: 'Pronounced passion fruit and gooseberry with green pepper; high acid.',
      producers: [],
    },
  ],
  alsoGrownIn: ['Pouilly-Fumé', 'Menetou-Salon', 'Casablanca Valley', 'Adelaide Hills', 'Entre-Deux-Mers'],
  verified: false,
} satisfies Grape;
