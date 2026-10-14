import type { Grape } from '../../core/src/content.ts';

export default {
  id: 'grape:gamay',
  name: 'Gamay',
  colour: 'red',
  berryColour: '#4B2A5E',
  traits: ['Early budding', 'Early ripening', 'Vigorous'],
  structure: {
    cool: { appearanceIntensity: [0, 1], acidity: [3, 4], tannin: [0, 1], body: [0, 1], alcohol: [1, 1], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [1, 1], acidity: [3, 3], tannin: [1, 2], body: [1, 2], alcohol: [1, 1], noseIntensity: [3, 3] },
  },
  aromas: [
    { aromaId: 'aroma:cranberry', ripeness: 'less' },
    { aromaId: 'aroma:redcurrant', ripeness: 'less' },
    { aromaId: 'aroma:raspberry', ripeness: 'ripe' },
    { aromaId: 'aroma:red-cherry', ripeness: 'ripe' },
    { aromaId: 'aroma:strawberry', ripeness: 'ripe' },
    { aromaId: 'aroma:black-cherry', ripeness: 'very' },
    { aromaId: 'aroma:kirsch', ripeness: 'very' },
    { aromaId: 'aroma:banana' },
    { aromaId: 'aroma:violet' },
    { aromaId: 'aroma:earth' },
  ],
  why: [
    { factor: 'Carbonic or semi-carbonic maceration', effect: 'fermentation inside whole berries', result: 'soft tannin, banana and bubblegum aromas' },
    { factor: 'Granite soils of the crus', effect: 'lower vigour and yields', result: 'more concentrated wines that can age' },
  ],
  lookAlikes: [{ grapeId: 'grape:pinot-noir', tell: 'Pinot is more savoury, with earth or forest floor and often oak spice; Gamay is juicier and purer.' }],
  regions: [
    {
      regionId: 'region:fr-beaujolais',
      styleLevel: 1,
      style: 'Light, juicy and fruity; drink young. Beaujolais Nouveau is the extreme.',
      producers: [],
    },
    {
      regionId: 'region:fr-beaujolais-fleurie',
      styleLevel: 2,
      style: 'Perfumed and floral, lighter-bodied cru.',
      producers: [],
    },
    {
      regionId: 'region:fr-beaujolais-morgon',
      styleLevel: 4,
      style: 'Fuller and firmer cru; can develop earthy notes with age.',
      producers: ['Marcel Lapierre', 'Jean Foillard'],
    },
    {
      regionId: 'region:fr-beaujolais-moulin-a-vent',
      styleLevel: 5,
      style: 'The most structured cru, sometimes oak-aged.',
      producers: [],
    },
  ],
  verified: false,
} satisfies Grape;
