import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:mourvedre',
  name: 'Mourvèdre',
  colour: 'red',
  berryColour: '#2A1736',
  synonyms: ['Monastrell', 'Mataro'],
  traits: ['Late budding and very late ripening', 'Needs heat and sun', 'Thick skins', 'Prone to reductive, meaty notes'],
  structure: {
    cool: { appearanceIntensity: [2, 2], acidity: [2, 3], tannin: [3, 4], body: [3, 4], alcohol: [1, 2], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [2, 2], acidity: [1, 2], tannin: [3, 4], body: [4, 4], alcohol: [2, 2], noseIntensity: [3, 3] },
  },
  aromas: [
    { aromaId: 'aroma:blackberry', ripeness: 'ripe' },
    { aromaId: 'aroma:black-plum', ripeness: 'ripe' },
    { aromaId: 'aroma:blueberry', ripeness: 'ripe' },
    { aromaId: 'aroma:jammy', ripeness: 'very' },
    { aromaId: 'aroma:black-pepper' },
    { aromaId: 'aroma:dried-herbs' },
    { aromaId: 'aroma:meaty' },
    { aromaId: 'aroma:game' },
    { aromaId: 'aroma:leather' },
    { aromaId: 'aroma:earth' },
  ],
  why: [
    { factor: 'Very late ripening', effect: 'needs a hot, sunny site near the sea', result: 'Mediterranean coasts of France and Spain' },
    { factor: 'Thick skins', effect: 'deep colour, high tannin', result: 'adds structure and colour to Grenache blends (GSM)' },
    { factor: 'Bandol: at least half the blend, long oak ageing', effect: 'firm tannins soften slowly', result: 'dense, gamey, long-lived red' },
    { factor: 'Jumilla and Yecla heat, old bush vines', effect: 'very ripe grapes', result: 'full, high-alcohol, jammy Monastrell' },
  ],
  lookAlikes: [
    { grapeId: 'grape:syrah', tell: 'Syrah has more black pepper and violet; Mourvèdre is gamier and earthier.' },
    { grapeId: 'grape:grenache', tell: 'Grenache is paler with red fruit and softer tannin.' },
  ],
  regions: [
    { regionId: 'region:fr-provence-bandol', styleLevel: 3, style: 'Its finest home: dense, firm, gamey and herbal; also structured rosé.', producers: ['Domaine Tempier'] },
    { regionId: 'region:fr-rhone-chateauneuf-du-pape', styleLevel: 3, style: 'Blending partner for structure and spice.', producers: [] },
    { regionId: 'region:es-jumilla', styleLevel: 4, style: 'Monastrell: full, ripe, high alcohol; often good value.', producers: [] },
    { regionId: 'region:au-barossa-valley', styleLevel: 4, style: 'Mataro in Grenache–Shiraz–Mataro blends.', producers: [] },
  ],
  alsoGrownIn: ['Languedoc-Roussillon', 'Yecla', 'Alicante', 'California'],
  verified: false,
} satisfies Grape;
