import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:dolcetto',
  name: 'Dolcetto',
  colour: 'red',
  berryColour: '#2C1736',
  traits: ['Early ripening', 'Medium acidity', 'Medium(+) to high tannin', 'Deep colour', 'Best drunk young'],
  structure: {
    cool: { appearanceIntensity: [2, 2], acidity: [2, 2], tannin: [3, 4], body: [2, 3], alcohol: [1, 1], noseIntensity: [2, 2] },
    warm: { appearanceIntensity: [2, 2], acidity: [2, 2], tannin: [3, 4], body: [3, 3], alcohol: [1, 2], noseIntensity: [2, 3] },
  },
  aromas: [
    { aromaId: 'aroma:blackberry', ripeness: 'less' },
    { aromaId: 'aroma:black-cherry', ripeness: 'ripe' },
    { aromaId: 'aroma:black-plum', ripeness: 'ripe' },
    { aromaId: 'aroma:liquorice' },
    { aromaId: 'aroma:almond' },
    { aromaId: 'aroma:dried-herbs' },
    { aromaId: 'aroma:red-cherry' },
  ],
  why: [
    { factor: 'Ripens early', effect: 'suits cooler, higher sites', result: 'planted where Nebbiolo will not ripen' },
    { factor: 'Medium acidity, medium to high tannin, deep often purple colour', effect: 'black plum, red cherry, dried herbs', result: 'most drunk young, the best age several years; often a bitter-almond finish' },
  ],
  lookAlikes: [{ grapeId: 'grape:barbera', tell: 'Barbera has high acidity and little tannin.' }],
  regions: [{ regionId: 'region:it-piemonte-dolcetto-d-alba', styleLevel: 3, style: 'Many of the finest Dolcetto: deep purple, medium acidity, firm tannin, black plum and red cherry; Dogliani is the DOCG.', producers: [] }],
  verified: false,
} satisfies Grape;
