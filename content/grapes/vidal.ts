import type { Grape } from '../../core/src/content.ts';

// Drafted from the user's USA and Canada notes, in our own words. Check against your book, then set verified: true.
export default {
  id: 'grape:vidal',
  name: 'Vidal',
  colour: 'white',
  berryColour: '#D2C77E',
  synonyms: ['Vidal Blanc'],
  traits: ['Hybrid', 'Winter hardy', 'Thick skins', 'Icewine grape'],
  structure: {
    cool: { appearanceIntensity: [1, 2], sweetness: [4, 5], acidity: [2, 3], body: [3, 4], alcohol: [0, 1], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [2, 2], sweetness: [5, 5], acidity: [2, 2], body: [4, 4], alcohol: [0, 1], noseIntensity: [3, 3] },
  },
  aromas: [
    { aromaId: 'aroma:peach', ripeness: 'ripe' },
    { aromaId: 'aroma:apricot', ripeness: 'very' },
    { aromaId: 'aroma:pineapple', ripeness: 'very' },
    { aromaId: 'aroma:mango', ripeness: 'very' },
    { aromaId: 'aroma:honey' },
  ],
  why: [
    { factor: 'Hybrid bred for cold: hardy vine, thick skins', effect: 'grapes hang into deep winter without splitting', result: 'reliable Icewine in Ontario and British Columbia' },
    { factor: 'Little character as a dry wine', effect: 'its value is in concentration', result: 'high-quality Icewine, but less acidity and aromatic complexity than Riesling Icewine' },
  ],
  lookAlikes: [{ grapeId: 'grape:riesling', tell: 'Riesling Icewine has higher, sharper acidity and more aromatic complexity (citrus, floral).' }],
  regions: [
    { regionId: 'region:ca-niagara-peninsula', styleLevel: 4, style: 'Icewine: sweet, rich, tropical and stone fruit, moderate acidity.', producers: [] },
    { regionId: 'region:ca-okanagan-valley', styleLevel: 4, style: 'Icewine, alongside Riesling.', producers: [] },
  ],
  verified: false,
} satisfies Grape;
