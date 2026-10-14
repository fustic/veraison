import type { Grape } from '../../core/src/content.ts';

export default {
  id: 'grape:cabernet-sauvignon',
  name: 'Cabernet Sauvignon',
  colour: 'red',
  berryColour: '#2B1B3D',
  traits: ['Thick skins', 'Late budding', 'Late ripening'],
  structure: {
    cool: { appearanceIntensity: [2, 2], acidity: [3, 4], tannin: [3, 4], body: [2, 3], alcohol: [1, 1], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [2, 2], acidity: [2, 3], tannin: [3, 4], body: [3, 4], alcohol: [2, 2], noseIntensity: [3, 4] },
  },
  aromas: [
    { aromaId: 'aroma:green-bell-pepper', ripeness: 'less' },
    { aromaId: 'aroma:blackcurrant-leaf', ripeness: 'less' },
    { aromaId: 'aroma:blackcurrant', ripeness: 'ripe' },
    { aromaId: 'aroma:black-cherry', ripeness: 'ripe' },
    { aromaId: 'aroma:cassis', ripeness: 'very' },
    { aromaId: 'aroma:black-plum', ripeness: 'very' },
    { aromaId: 'aroma:jammy', ripeness: 'very' },
    { aromaId: 'aroma:mint' },
    { aromaId: 'aroma:cedar' },
    { aromaId: 'aroma:vanilla' },
    { aromaId: 'aroma:tobacco' },
    { aromaId: 'aroma:leather' },
  ],
  why: [
    { factor: 'Late ripening', effect: 'needs a long, warm season', result: 'only planted on the warmest gravel in Bordeaux' },
    { factor: 'Thick skins', effect: 'deep colour and high tannin', result: 'wines that need and reward ageing' },
    { factor: 'Under-ripe grapes', effect: 'methoxypyrazines remain', result: 'green bell pepper and leafy notes' },
    { factor: 'New oak maturation', effect: 'softens tannin, adds cedar and vanilla', result: 'classic premium style' },
  ],
  lookAlikes: [
    { grapeId: 'grape:merlot', tell: 'Merlot is softer and plummier, with less acidity and gentler tannin.' },
    { grapeId: 'grape:cabernet-franc', tell: 'Cabernet Franc is lighter, with more red fruit, leafy notes and less tannin.' },
  ],
  regions: [
    {
      regionId: 'region:fr-bordeaux-margaux',
      styleLevel: 2,
      style: 'Fragrant and elegant within the Left Bank style.',
      producers: ['Château Margaux', 'Château Palmer'],
    },
    {
      regionId: 'region:fr-bordeaux-pauillac',
      styleLevel: 3,
      style: 'Powerful and long-lived; blackcurrant, cedar and firm tannin.',
      producers: ['Château Latour', 'Château Lafite Rothschild', 'Château Mouton Rothschild'],
    },
    {
      regionId: 'region:us-napa-valley',
      styleLevel: 5,
      style: 'Riper black fruit, fuller body, higher alcohol and plenty of new oak.',
      producers: [],
    },
  ],
  alsoGrownIn: ['Coonawarra', 'Margaret River', 'Maipo Valley', 'Stellenbosch', "Hawke's Bay", 'Bolgheri'],
  verified: false,
} satisfies Grape;
