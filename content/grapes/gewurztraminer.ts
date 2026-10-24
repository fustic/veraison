import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:gewurztraminer',
  name: 'Gewurztraminer',
  colour: 'white',
  berryColour: '#C88A8E',
  synonyms: ['Gewürztraminer', 'Traminer Aromatico'],
  traits: ['Early budding (frost risk)', 'Pink-skinned', 'Very aromatic', 'Low acidity, high alcohol'],
  structure: {
    cool: { appearanceIntensity: [0, 1], sweetness: [0, 1], acidity: [1, 2], body: [2, 3], alcohol: [1, 2], noseIntensity: [3, 4] },
    warm: { appearanceIntensity: [1, 2], sweetness: [0, 3], acidity: [1, 1], body: [3, 4], alcohol: [2, 2], noseIntensity: [4, 4] },
  },
  aromas: [
    { aromaId: 'aroma:grapefruit', ripeness: 'less' },
    { aromaId: 'aroma:lychee', ripeness: 'ripe' },
    { aromaId: 'aroma:peach', ripeness: 'ripe' },
    { aromaId: 'aroma:mango', ripeness: 'very' },
    { aromaId: 'aroma:rose' },
    { aromaId: 'aroma:blossom' },
    { aromaId: 'aroma:ginger' },
    { aromaId: 'aroma:cinnamon' },
    { aromaId: 'aroma:honey' },
  ],
  why: [
    { factor: 'Aromas develop late, with high sugar', effect: 'must ripen fully', result: 'full body, high alcohol, low acidity, oily texture' },
    { factor: 'Low acidity and a slight bitterness', effect: 'a touch of sweetness balances it', result: 'many are off-dry' },
    { factor: 'Dry autumns in Alsace', effect: 'late picking or noble rot', result: 'Vendanges Tardives and Sélection de Grains Nobles' },
    { factor: 'Pink-tinged skins', effect: 'some colour pick-up', result: 'golden wines; 14% abv is not unusual in Alsace' },
  ],
  lookAlikes: [
    { grapeId: 'grape:muscat', tell: 'Muscat is lighter and grapey; Gewurz is oilier with lychee and rose.' },
    { grapeId: 'grape:viognier', tell: 'Viognier is apricot and blossom rather than lychee and rose.' },
  ],
  regions: [
    { regionId: 'region:it-alto-adige', styleLevel: 3, style: 'Fresher, more delicate, usually dry.', producers: [] },
    { regionId: 'region:fr-alsace', styleLevel: 5, style: 'Benchmark: deep, oily, lychee, rose, ginger; dry to luscious.', producers: ['Zind-Humbrecht', 'Trimbach'] },
    { regionId: 'region:us-anderson-valley', styleLevel: 3, style: 'Very cool coastal valley: aromatic.', producers: [] },
    { regionId: 'region:nz-gisborne', styleLevel: 3, style: 'Small amounts, high quality.', producers: [] },
    { regionId: 'region:cl-bio-bio-valley', styleLevel: 2, style: 'Fresh, fruity.', producers: [] },
  ],
  alsoGrownIn: ['Germany', 'Austria', 'New Zealand', 'Chile', 'Oregon'],
  verified: false,
} satisfies Grape;
