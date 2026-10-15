import type { Grape } from '../../core/src/content.ts';

export default {
  id: 'grape:cabernet-franc',
  name: 'Cabernet Franc',
  colour: 'red',
  berryColour: '#4A2A55',
  traits: ['Earlier ripening than Cabernet Sauvignon', 'Thinner skins'],
  structure: {
    cool: { appearanceIntensity: [1, 1], acidity: [3, 4], tannin: [2, 3], body: [1, 2], alcohol: [1, 1] },
    warm: { appearanceIntensity: [1, 2], acidity: [3, 3], tannin: [3, 3], body: [2, 3], alcohol: [1, 2] },
  },
  aromas: [
    { aromaId: 'aroma:green-bell-pepper', ripeness: 'less' },
    { aromaId: 'aroma:blackcurrant-leaf', ripeness: 'less' },
    { aromaId: 'aroma:raspberry', ripeness: 'ripe' },
    { aromaId: 'aroma:red-cherry', ripeness: 'ripe' },
    { aromaId: 'aroma:blackcurrant', ripeness: 'very' },
    { aromaId: 'aroma:violet' },
    { aromaId: 'aroma:cedar' },
  ],
  why: [
    { factor: 'Ripens earlier than Cabernet Sauvignon', effect: 'succeeds in cooler sites', result: 'the main red of the Loire' },
    { factor: 'Less tannin and body', effect: 'adds fragrance rather than power', result: 'a blending partner for Merlot in Saint-Émilion' },
  ],
  lookAlikes: [{ grapeId: 'grape:cabernet-sauvignon', tell: 'Cabernet Sauvignon is fuller and more tannic, with darker fruit.' }],
  regions: [
    {
      regionId: 'region:fr-bordeaux-saint-emilion',
      styleLevel: 3,
      style: 'Blended with Merlot for fragrance and freshness.',
      producers: ['Château Cheval Blanc'],
    },
    { regionId: 'region:fr-loire-saumur-champigny', styleLevel: 1, style: "Fresh, red fruit, light tannin; drink young.", producers: [] },
    { regionId: 'region:fr-loire-chinon', styleLevel: 1, style: "From light (sand, gravel) to structured (tuffeau); raspberry and pencil shavings.", producers: [] },
    { regionId: 'region:fr-loire-bourgueil', styleLevel: 2, style: "Firmer, deeper than Chinon.", producers: [] },
    { regionId: 'region:ca-niagara-peninsula', styleLevel: 2, style: "Red wines and Icewine.", producers: [] },
    { regionId: 'region:us-finger-lakes', styleLevel: 2, style: "Fresh, red-fruited cool-climate reds.", producers: [] },
    { regionId: 'region:ar-uco-valley', styleLevel: 4, style: "Rising star: ripe, floral, fresh.", producers: [] },
  ],
  alsoGrownIn: ['Hungary (Villány)', 'Tuscany (Bolgheri blends)'],
  verified: false,
} satisfies Grape;
