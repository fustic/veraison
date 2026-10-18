import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:chenin-blanc',
  name: 'Chenin Blanc',
  colour: 'white',
  berryColour: '#C9C77A',
  synonyms: ['Steen', 'Pineau de la Loire'],
  traits: ['Early budding, late ripening', 'High acidity at any ripeness', 'Vigorous', 'Prone to noble rot', 'Dry to sweet and sparkling'],
  structure: {
    cool: { appearanceIntensity: [0, 1], sweetness: [0, 5], acidity: [4, 4], body: [1, 3], alcohol: [1, 1], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [0, 1], sweetness: [0, 0], acidity: [3, 3], body: [2, 3], alcohol: [1, 2], noseIntensity: [2, 3] },
  },
  aromas: [
    { aromaId: 'aroma:apple', ripeness: 'less' },
    { aromaId: 'aroma:quince', ripeness: 'less' },
    { aromaId: 'aroma:lemon', ripeness: 'less' },
    { aromaId: 'aroma:peach', ripeness: 'ripe' },
    { aromaId: 'aroma:pear', ripeness: 'ripe' },
    { aromaId: 'aroma:pineapple', ripeness: 'very' },
    { aromaId: 'aroma:mango', ripeness: 'very' },
    { aromaId: 'aroma:wet-wool' },
    { aromaId: 'aroma:honey' },
    { aromaId: 'aroma:dried-apricot' },
    { aromaId: 'aroma:toast-bottle' },
  ],
  why: [
    { factor: 'Keeps high acidity even when very ripe', effect: 'balance at any sweetness', result: 'dry (sec), off-dry (demi-sec), sweet (moelleux) and sparkling' },
    { factor: 'Ripens unevenly and late in the cool Loire', effect: 'several pickings (tries)', result: 'different styles from one vineyard and vintage' },
    { factor: 'Misty autumns along the Layon', effect: 'noble rot', result: 'sweet Coteaux du Layon, Bonnezeaux, Quarts de Chaume' },
    { factor: 'Old bush vines in South Africa', effect: 'low yields', result: 'concentrated, often lees- or oak-aged premium Chenin' },
    { factor: 'Bottle age', effect: 'tertiary development', result: 'honey, toast, lanolin; acidity keeps it fresh for decades' },
    { factor: 'Grapes in one bunch ripen unevenly', effect: 'green, herbaceous notes if unripe berries are picked', result: 'several passes through the vineyard' },
    { factor: 'Barely ripe fruit (10–11% potential alcohol)', effect: 'high acid, neutral base', result: 'used for sparkling wine; riper fruit for dry, medium and sweet' },
    { factor: 'Riper picking for dry wines in recent years', effect: 'more alcohol, a few grams of sugar', result: 'fuller, rounder dry Chenin' },
  ],
  lookAlikes: [
    { grapeId: 'grape:riesling', tell: 'Riesling is more floral and citrus; Chenin has apple, quince and a waxy, woolly note.' },
    { grapeId: 'grape:chardonnay', tell: 'Chardonnay has less acidity and no lanolin note.' },
  ],
  regions: [
    { regionId: 'region:fr-loire-vouvray', styleLevel: 2, style: 'Sec to moelleux and sparkling, on tuffeau limestone; ages very well.', producers: ['Domaine Huet'] },
    { regionId: 'region:fr-loire-montlouis', styleLevel: 2, style: 'Across the river from Vouvray; similar range, a little lighter.', producers: [] },
    { regionId: 'region:fr-loire-savennieres', styleLevel: 3, style: 'Dry, intense, high acid; needs years.', producers: [] },
    { regionId: 'region:za-stellenbosch', styleLevel: 3, style: 'Ripe and fruity to oaked and textured.', producers: [] },
    { regionId: 'region:za-swartland', styleLevel: 4, style: 'Old dry-farmed bush vines: concentrated, textured.', producers: [] },
    { regionId: 'region:fr-loire-coteaux-du-layon', styleLevel: 5, style: 'Sweet, often botrytised: honey, apricot, high acidity.', producers: [] },
  ],
  alsoGrownIn: ['Anjou (sparkling Saumur)', 'California', 'Argentina'],
  verified: false,
} satisfies Grape;
