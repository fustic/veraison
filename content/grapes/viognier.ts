import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:viognier',
  name: 'Viognier',
  colour: 'white',
  berryColour: '#D9C35A',
  traits: ['Aromatic', 'Low acidity', 'High sugar, high alcohol', 'Low, irregular yields', 'Harvest timing is critical'],
  structure: {
    cool: { appearanceIntensity: [1, 1], sweetness: [0, 0], acidity: [1, 2], body: [3, 3], alcohol: [2, 2], noseIntensity: [3, 4] },
    warm: { appearanceIntensity: [1, 2], sweetness: [0, 0], acidity: [0, 1], body: [3, 4], alcohol: [2, 2], noseIntensity: [3, 4] },
  },
  aromas: [
    { aromaId: 'aroma:pear', ripeness: 'less' },
    { aromaId: 'aroma:peach', ripeness: 'ripe' },
    { aromaId: 'aroma:apricot', ripeness: 'ripe' },
    { aromaId: 'aroma:mango', ripeness: 'very' },
    { aromaId: 'aroma:blossom' },
    { aromaId: 'aroma:acacia' },
    { aromaId: 'aroma:honeysuckle' },
    { aromaId: 'aroma:vanilla' },
    { aromaId: 'aroma:cream' },
  ],
  why: [
    { factor: 'Aromas only develop at full ripeness', effect: 'must be picked late, when sugar is high', result: 'full body, high alcohol, low acidity' },
    { factor: 'Picked too early', effect: 'little aroma', result: 'neutral, thin wine; too late and it turns oily and flabby' },
    { factor: 'Some lees, MLC and old oak (Condrieu)', effect: 'more texture and complexity', result: 'rich, creamy, apricot and blossom' },
    { factor: 'Co-fermented with Syrah (Côte-Rôtie)', effect: 'adds perfume', result: 'floral Syrah' },
    { factor: 'Low acidity, high sugar', effect: 'risk of an oily texture that hides the aroma', result: 'needs careful handling; new oak used with restraint' },
  ],
  lookAlikes: [
    { grapeId: 'grape:chardonnay', tell: 'Oaked Chardonnay has more acidity and far less floral perfume.' },
    { grapeId: 'grape:gewurztraminer', tell: 'Gewurztraminer shows lychee and rose rather than apricot and blossom.' },
  ],
  regions: [
    { regionId: 'region:fr-rhone-condrieu', styleLevel: 4, style: 'Benchmark: full, rich, intense apricot and blossom.', producers: ['E. Guigal', 'Georges Vernay'] },
    { regionId: 'region:fr-rhone-cote-rotie', styleLevel: 2, style: 'Up to a fifth of the vineyard; co-fermented with Syrah.', producers: [] },
    { regionId: 'region:fr-languedoc', styleLevel: 3, style: 'Varietal IGP Pays d’Oc: ripe, peachy, inexpensive.', producers: [] },
    { regionId: 'region:au-eden-valley', styleLevel: 3, style: 'Fresh, aromatic Australian examples.', producers: ['Yalumba'] },
    { regionId: 'region:za-swartland', styleLevel: 3, style: 'Rich, perfumed, a hint of toasty oak; in white blends.', producers: [] },
    { regionId: 'region:cl-southern', styleLevel: 2, style: 'Fresh, fruity, from cool regions.', producers: [] },
  ],
  alsoGrownIn: ['California', 'Chile', 'South Africa'],
  verified: false,
} satisfies Grape;
