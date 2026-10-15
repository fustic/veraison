import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:touriga-nacional',
  name: 'Touriga Nacional',
  colour: 'red',
  berryColour: '#22102C',
  traits: ['Small, thick-skinned berries', 'Low yields', 'Deep colour, high tannin', 'Floral (violet)', 'Key Port grape'],
  structure: {
    cool: { appearanceIntensity: [2, 2], acidity: [3, 3], tannin: [3, 4], body: [3, 3], alcohol: [1, 2], noseIntensity: [3, 3] },
    warm: { appearanceIntensity: [2, 2], acidity: [2, 3], tannin: [4, 4], body: [3, 4], alcohol: [2, 2], noseIntensity: [3, 4] },
  },
  aromas: [
    { aromaId: 'aroma:blackberry', ripeness: 'ripe' },
    { aromaId: 'aroma:blueberry', ripeness: 'ripe' },
    { aromaId: 'aroma:black-plum', ripeness: 'ripe' },
    { aromaId: 'aroma:jammy', ripeness: 'very' },
    { aromaId: 'aroma:violet' },
    { aromaId: 'aroma:dried-herbs' },
    { aromaId: 'aroma:vanilla' },
  ],
  why: [
    { factor: 'Small, thick-skinned berries', effect: 'lots of colour, tannin and aroma', result: 'concentrated wines from low yields' },
    { factor: 'Port: fermentation stopped early by fortification', effect: 'only a short time to extract', result: 'needs grapes this rich in colour and tannin' },
  ],
  lookAlikes: [{ grapeId: 'grape:syrah', tell: 'Syrah is more peppery and meaty; Touriga more floral.' }],
  regions: [
    { regionId: 'region:pt-dao', styleLevel: 3, style: 'Fresher, elegant, floral reds.', producers: [] },
    { regionId: 'region:pt-douro', styleLevel: 5, style: 'Port and powerful dry Douro reds.', producers: [] },
  ],
  alsoGrownIn: ['Alentejo', 'Australia'],
  verified: false,
} satisfies Grape;
