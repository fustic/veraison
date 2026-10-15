import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:assyrtiko',
  name: 'Assyrtiko',
  colour: 'white',
  berryColour: '#C9D19A',
  traits: ['Keeps very high acidity in heat', 'Drought tolerant', 'Santorini speciality'],
  structure: {
    cool: { appearanceIntensity: [0, 0], sweetness: [0, 0], acidity: [3, 4], body: [1, 2], alcohol: [1, 1], noseIntensity: [2, 2] },
    warm: { appearanceIntensity: [0, 1], sweetness: [0, 0], acidity: [4, 4], body: [2, 3], alcohol: [2, 2], noseIntensity: [2, 3] },
  },
  aromas: [
    { aromaId: 'aroma:lemon', ripeness: 'less' },
    { aromaId: 'aroma:lime', ripeness: 'less' },
    { aromaId: 'aroma:grapefruit', ripeness: 'ripe' },
    { aromaId: 'aroma:wet-stones' },
    { aromaId: 'aroma:flint' },
    { aromaId: 'aroma:honey' },
  ],
  why: [
    { factor: 'Keeps acidity even in heat', effect: 'ripe sugar with high acid', result: 'bone-dry, high-alcohol, very fresh wines' },
    { factor: 'Strong winds on Santorini', effect: 'vines trained into low baskets (kouloura)', result: 'grapes protected from wind and sun' },
    { factor: 'Volcanic soils phylloxera cannot live in', effect: 'very old, ungrafted vines', result: 'low yields, concentrated, mineral wines' },
    { factor: 'Sun-dried grapes', effect: 'concentrated sugar', result: 'sweet Vinsanto' },
  ],
  lookAlikes: [{ grapeId: 'grape:riesling', tell: 'Dry Riesling is lighter and more floral, with lower alcohol.' }],
  regions: [{ regionId: 'region:gr-santorini', styleLevel: 4, style: 'High acid, citrus, smoky-mineral; Nykteri is oaked; Vinsanto is sweet.', producers: [] }],
  alsoGrownIn: ['Mainland Greece', 'Australia'],
  verified: false,
} satisfies Grape;
