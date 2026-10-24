import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:touriga-franca',
  name: 'Touriga Franca',
  colour: 'red',
  berryColour: '#2A1430',
  traits: ['Most planted Douro variety', 'Thick skins', 'Floral, fruity'],
  structure: {
    cool: { appearanceIntensity: [2, 2], acidity: [3, 3], tannin: [3, 3], body: [2, 3], alcohol: [1, 2], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [2, 2], acidity: [2, 3], tannin: [3, 4], body: [3, 4], alcohol: [2, 2], noseIntensity: [3, 3] },
  },
  aromas: [
    { aromaId: 'aroma:blackberry', ripeness: 'ripe' },
    { aromaId: 'aroma:red-plum', ripeness: 'ripe' },
    { aromaId: 'aroma:violet' },
    { aromaId: 'aroma:rose' },
  ],
  why: [{ factor: 'Reliable, thick-skinned, aromatic', effect: 'fruit and perfume for the blend', result: 'backbone of most Port and Douro red blends' }],
  lookAlikes: [{ grapeId: 'grape:touriga-nacional', tell: 'Touriga Nacional is more concentrated and tannic.' }],
  regions: [
    { regionId: 'region:pt-douro', styleLevel: 4, style: 'In Port and Douro blends.', producers: [] },
    { regionId: 'region:pt-douro-cima-corgo', styleLevel: 4, style: 'Widely planted in the best sites.', producers: [] },
  ],
  verified: false,
} satisfies Grape;
