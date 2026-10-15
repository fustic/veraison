import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:gruner-veltliner',
  name: 'Grüner Veltliner',
  colour: 'white',
  berryColour: '#B9CC6E',
  traits: ['Vigorous, high-yielding', 'White pepper', 'Austria’s signature white'],
  structure: {
    cool: { appearanceIntensity: [0, 0], sweetness: [0, 0], acidity: [3, 4], body: [1, 2], alcohol: [1, 1], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [0, 1], sweetness: [0, 0], acidity: [3, 3], body: [3, 4], alcohol: [2, 2], noseIntensity: [3, 3] },
  },
  aromas: [
    { aromaId: 'aroma:apple', ripeness: 'less' },
    { aromaId: 'aroma:lemon', ripeness: 'less' },
    { aromaId: 'aroma:grapefruit', ripeness: 'ripe' },
    { aromaId: 'aroma:peach', ripeness: 'very' },
    { aromaId: 'aroma:white-pepper' },
    { aromaId: 'aroma:dried-herbs' },
    { aromaId: 'aroma:honey' },
    { aromaId: 'aroma:toast-bottle' },
  ],
  why: [
    { factor: 'High yields on fertile loess plains', effect: 'lighter fruit', result: 'fresh, peppery, light everyday wines (Weinviertel)' },
    { factor: 'Low yields on Danube terraces of loess and rock', effect: 'concentration', result: 'full, rich, long-lived wines (Wachau, Kremstal, Kamptal)' },
    { factor: 'Warm days, cold nights by the Danube', effect: 'ripe fruit with high acidity', result: 'balance even at 13–14% abv' },
  ],
  lookAlikes: [
    { grapeId: 'grape:riesling', tell: 'Riesling is more floral and fruity, with no white pepper.' },
    { grapeId: 'grape:sauvignon-blanc', tell: 'Sauvignon is more pungent and grassy.' },
  ],
  regions: [
    { regionId: 'region:at-weinviertel', styleLevel: 2, style: 'Weinviertel DAC: light, fresh, white pepper and citrus.', producers: [] },
    { regionId: 'region:at-kremstal', styleLevel: 3, style: 'Loess and rock terraces: ripe and spicy.', producers: [] },
    { regionId: 'region:at-kamptal', styleLevel: 3, style: 'Fuller, structured, ages well.', producers: [] },
    { regionId: 'region:at-wachau', styleLevel: 4, style: 'Federspiel to Smaragd: from medium to full, concentrated and long-lived.', producers: ['F.X. Pichler', 'Domäne Wachau'] },
  ],
  alsoGrownIn: ['Czechia', 'Slovakia', 'New Zealand', 'Australia'],
  verified: false,
} satisfies Grape;
