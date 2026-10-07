import type { Grape } from '../../core/src/content.ts';

export default {
  id: 'grape:chardonnay',
  name: 'Chardonnay',
  colour: 'white',
  traits: ['Early budding', 'Neutral grape', 'Takes on winemaking'],
  structure: {
    cool: { appearanceIntensity: [0, 0], acidity: [4, 4], body: [1, 2], alcohol: [1, 1], noseIntensity: [1, 2] },
    warm: { appearanceIntensity: [1, 2], acidity: [2, 3], body: [3, 4], alcohol: [2, 2], noseIntensity: [2, 3] },
  },
  aromas: [
    { aromaId: 'aroma:apple', ripeness: 'less' },
    { aromaId: 'aroma:pear', ripeness: 'less' },
    { aromaId: 'aroma:lemon', ripeness: 'less' },
    { aromaId: 'aroma:peach', ripeness: 'ripe' },
    { aromaId: 'aroma:apricot', ripeness: 'ripe' },
    { aromaId: 'aroma:melon', ripeness: 'ripe' },
    { aromaId: 'aroma:pineapple', ripeness: 'very' },
    { aromaId: 'aroma:banana', ripeness: 'very' },
    { aromaId: 'aroma:mango', ripeness: 'very' },
    { aromaId: 'aroma:wet-stones' },
    { aromaId: 'aroma:butter' },
    { aromaId: 'aroma:cream' },
    { aromaId: 'aroma:vanilla' },
    { aromaId: 'aroma:toast-oak' },
    { aromaId: 'aroma:hazelnut' },
  ],
  why: [
    { factor: 'Early budding', effect: 'spring frost risk in Chablis', result: 'sprinklers, heaters and candles in the vineyard' },
    { factor: 'Neutral variety', effect: 'shows climate and winemaking clearly', result: 'lean and citrusy to rich and toasty' },
    { factor: 'Malolactic conversion and lees stirring', effect: 'buttery notes and creamy texture', result: 'fuller, rounder style' },
    { factor: 'Barrel fermentation and new oak', effect: 'vanilla, toast and integration', result: 'premium styles that can age' },
  ],
  lookAlikes: [
    { grapeId: 'grape:sauvignon-blanc', tell: 'Unoaked Chablis is less aromatic than Sancerre and never grassy or herbaceous.' },
    { grapeId: 'grape:semillon', tell: 'Young Semillon is lower in alcohol and more neutral, with lemon and grass rather than apple.' },
  ],
  regions: [
    {
      regionId: 'region:fr-burgundy-chablis',
      styleLevel: 1,
      style: 'Lean, high acid, green apple, citrus and a stony note; little or no new oak.',
      producers: ['Domaine Raveneau', 'Domaine Vincent Dauvissat'],
    },
    {
      regionId: 'region:fr-burgundy-puligny-montrachet',
      styleLevel: 3,
      style: 'Precise and mineral, with citrus, stone fruit and subtle oak.',
      producers: ['Domaine Leflaive'],
    },
    {
      regionId: 'region:fr-burgundy-meursault',
      styleLevel: 4,
      style: 'Richer and nuttier, with butter and toast from oak and lees.',
      producers: ['Domaine des Comtes Lafon', 'Domaine Coche-Dury'],
    },
  ],
  alsoGrownIn: ['Mâconnais', 'Sonoma', 'Santa Barbara', 'Yarra Valley', 'Mornington Peninsula', 'Margaret River', 'Casablanca Valley', 'Champagne (sparkling)'],
  verified: false,
} satisfies Grape;
