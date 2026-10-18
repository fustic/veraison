import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:tannat',
  name: 'Tannat',
  colour: 'red',
  berryColour: '#22122B',
  traits: ['Very high tannin', 'Deep colour', 'High acidity', 'Uruguay’s flagship'],
  structure: {
    cool: { appearanceIntensity: [2, 2], acidity: [3, 4], tannin: [4, 4], body: [3, 4], alcohol: [1, 2], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [2, 2], acidity: [2, 3], tannin: [4, 4], body: [3, 4], alcohol: [2, 2], noseIntensity: [2, 3] },
  },
  aromas: [
    { aromaId: 'aroma:blackcurrant', ripeness: 'less' },
    { aromaId: 'aroma:blackberry', ripeness: 'ripe' },
    { aromaId: 'aroma:black-plum', ripeness: 'ripe' },
    { aromaId: 'aroma:prune', ripeness: 'very' },
    { aromaId: 'aroma:vanilla' },
    { aromaId: 'aroma:toast-oak' },
    { aromaId: 'aroma:leather' },
    { aromaId: 'aroma:earth' },
  ],
  why: [
    { factor: 'Extremely tannic skins and seeds', effect: 'harsh when young', result: 'micro-oxygenation (developed in Madiran) and long oak ageing soften it' },
    { factor: 'Blended with Cabernet Franc or Cabernet Sauvignon', effect: 'adds fruit and fragrance', result: 'more approachable Madiran' },
    { factor: 'Riper grapes and modern winemaking', effect: 'softer, riper tannins', result: 'concentrated black fruit; less bottle age needed than before' },
  ],
  lookAlikes: [{ grapeId: 'grape:malbec', tell: 'Malbec is softer and fruitier; Tannat’s tannin is far grippier.' }],
  regions: [{ regionId: 'region:fr-south-west-madiran', styleLevel: 3, style: 'Deep, very tannic, black fruit; needs years in bottle.', producers: [] }],
  alsoGrownIn: ['Uruguay', 'Irouléguy'],
  verified: false,
} satisfies Grape;
