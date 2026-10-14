import type { Grape } from '../../core/src/content.ts';

export default {
  id: 'grape:sauvignon-blanc',
  name: 'Sauvignon Blanc',
  colour: 'white',
  berryColour: '#A9C25A',
  traits: ['Aromatic', 'Early ripening', 'High acidity', 'Vigorous', 'Prone to fungal disease'],
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
    { factor: 'SO₂ straight after fermentation, no MLC', effect: 'acidity and fruit kept intact', result: 'crisp, pungent wine best drunk young' },
    { factor: 'Long hours of intense sunlight (Marlborough)', effect: 'riper, more vivid fruit in a cool climate', result: 'gooseberry, elderflower, grapefruit, passion fruit' },
    { factor: 'Vigour and high yields', effect: 'herbaceous notes can dominate under-ripe fruit', result: 'used in cheaper wines, rarely at the lowest prices' },
  ],
  lookAlikes: [
    { grapeId: 'grape:chardonnay', tell: 'Unoaked Chardonnay is far less aromatic and never grassy.' },
    { grapeId: 'grape:gruner-veltliner', tell: 'Grüner shows white pepper and less pungent fruit.' },
  ],
  regions: [
    {
      regionId: 'region:fr-loire-sancerre',
      styleLevel: 2,
      style: 'Elegant and restrained: green apple, asparagus, often a wet-pebble note; high acid. Pouilly-Fumé is similar.',
      producers: ['Henri Bourgeois', 'Domaine Vacheron'],
    },
    {
      regionId: 'region:fr-bordeaux-pessac-leognan',
      styleLevel: 3,
      style: 'Blended with Sémillon, barrel-fermented and matured on lees, MLC avoided, some new oak: rounder, with spicy, toasty notes.',
      producers: ['Château Smith Haut Lafitte'],
    },
    {
      regionId: 'region:nz-marlborough',
      styleLevel: 4,
      style: 'Cool but very sunny: powerful gooseberry, elderflower, grapefruit and passion fruit, sometimes herbaceous; high acid. Some oaked versions too.',
      producers: [],
    },
    {
      regionId: 'region:au-margaret-river',
      styleLevel: 4,
      style: 'Often blended with Semillon: a little less aromatic, fuller bodied.',
      producers: [],
    },
    {
      regionId: 'region:us-california',
      styleLevel: 5,
      style: 'Fumé Blanc: barrel-fermented, lees-aged, creamy and spicy.',
      producers: [],
    },
  ],
  alsoGrownIn: ['Pouilly-Fumé', 'Menetou-Salon', 'South Africa', 'Chile (Casablanca Valley)', 'Adelaide Hills', 'Entre-Deux-Mers'],
  verified: false,
} satisfies Grape;
