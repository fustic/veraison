import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:blaufrankisch',
  name: 'Blaufränkisch',
  colour: 'red',
  berryColour: '#2E1840',
  synonyms: ['Kékfrankos', 'Lemberger'],
  traits: ['Late ripening', 'Deep colour', 'High acidity', 'Spicy'],
  structure: {
    cool: { appearanceIntensity: [2, 2], acidity: [4, 4], tannin: [2, 2], body: [2, 3], alcohol: [1, 1], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [2, 2], acidity: [3, 4], tannin: [2, 3], body: [3, 3], alcohol: [1, 2], noseIntensity: [3, 3] },
  },
  aromas: [
    { aromaId: 'aroma:sour-cherry', ripeness: 'less' },
    { aromaId: 'aroma:black-cherry', ripeness: 'ripe' },
    { aromaId: 'aroma:blackberry', ripeness: 'ripe' },
    { aromaId: 'aroma:black-plum', ripeness: 'very' },
    { aromaId: 'aroma:black-pepper' },
    { aromaId: 'aroma:cloves' },
    { aromaId: 'aroma:vanilla' },
  ],
  why: [
    { factor: 'Late ripening', effect: 'needs the warmest sites', result: 'Burgenland in Austria' },
    { factor: 'High acidity and spice', effect: 'freshness with structure', result: 'fresh, peppery reds; top wines oak-aged and long-lived' },
    { factor: 'Austria’s most highly regarded black grape', effect: 'medium tannin, high acidity', result: 'peppery, sour-cherry reds; several DACs (Leithaberg, Mittelburgenland)' },
  ],
  lookAlikes: [{ grapeId: 'grape:syrah', tell: 'Syrah is fuller and meatier; Blaufränkisch fresher and more acidic.' }],
  regions: [
    { regionId: 'region:at-leithaberg', styleLevel: 2, style: 'Limestone and schist: elegant, mineral.', producers: [] },
    { regionId: 'region:at-mittelburgenland', styleLevel: 3, style: 'Its heartland: deep, spicy, structured.', producers: [] },
  ],
  alsoGrownIn: ['Hungary (Kékfrankos)', 'Germany (Lemberger)'],
  verified: false,
} satisfies Grape;
