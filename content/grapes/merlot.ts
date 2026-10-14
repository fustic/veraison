import type { Grape } from '../../core/src/content.ts';

export default {
  id: 'grape:merlot',
  name: 'Merlot',
  colour: 'red',
  berryColour: '#3E2348',
  traits: ['Early ripening', 'Prone to coulure', 'Likes cooler clay'],
  structure: {
    cool: { appearanceIntensity: [1, 2], acidity: [2, 3], tannin: [2, 3], body: [2, 3], alcohol: [1, 1] },
    warm: { appearanceIntensity: [2, 2], acidity: [1, 2], tannin: [2, 2], body: [3, 4], alcohol: [2, 2] },
  },
  aromas: [
    { aromaId: 'aroma:red-cherry', ripeness: 'less' },
    { aromaId: 'aroma:green-bell-pepper', ripeness: 'less' },
    { aromaId: 'aroma:red-plum', ripeness: 'ripe' },
    { aromaId: 'aroma:black-cherry', ripeness: 'ripe' },
    { aromaId: 'aroma:blackberry', ripeness: 'very' },
    { aromaId: 'aroma:black-plum', ripeness: 'very' },
    { aromaId: 'aroma:jammy', ripeness: 'very' },
    { aromaId: 'aroma:vanilla' },
    { aromaId: 'aroma:cloves' },
    { aromaId: 'aroma:chocolate-oak' },
    { aromaId: 'aroma:forest-floor' },
    { aromaId: 'aroma:tobacco' },
  ],
  why: [
    { factor: 'Early ripening', effect: 'ripens on cooler clay soils', result: 'leads the blends of the Right Bank' },
    { factor: 'Ripens easily', effect: 'reliable in cool vintages', result: 'adds flesh and softness to Cabernet blends' },
    { factor: 'Too much heat', effect: 'loses acidity, jammy fruit', result: 'flabby wines in hot sites' },
  ],
  lookAlikes: [{ grapeId: 'grape:cabernet-sauvignon', tell: 'Cabernet is firmer and more acidic, with blackcurrant, mint and cedar.' }],
  regions: [
    {
      regionId: 'region:fr-bordeaux-saint-emilion',
      styleLevel: 3,
      style: 'Red and black plum with Cabernet Franc fragrance; medium(+) body.',
      producers: ['Château Cheval Blanc', 'Château Ausone'],
    },
    {
      regionId: 'region:fr-bordeaux-pomerol',
      styleLevel: 4,
      style: 'Plush and rich, black plum and chocolate, velvety tannin.',
      producers: ['Pétrus', 'Château Lafleur'],
    },
  ],
  alsoGrownIn: ["Hawke's Bay", 'Washington State', 'Napa Valley', 'Chile', 'Veneto'],
  verified: false,
} satisfies Grape;
