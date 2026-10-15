import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:dolcetto',
  name: 'Dolcetto',
  colour: 'red',
  berryColour: '#2C1736',
  traits: ['Early ripening', 'Low acidity', 'Medium(+) tannin', 'Deep colour', 'Best drunk young'],
  structure: {
    cool: { appearanceIntensity: [2, 2], acidity: [1, 2], tannin: [3, 3], body: [2, 3], alcohol: [1, 1], noseIntensity: [2, 2] },
    warm: { appearanceIntensity: [2, 2], acidity: [1, 2], tannin: [3, 3], body: [3, 3], alcohol: [1, 2], noseIntensity: [2, 3] },
  },
  aromas: [
    { aromaId: 'aroma:blackberry', ripeness: 'less' },
    { aromaId: 'aroma:black-cherry', ripeness: 'ripe' },
    { aromaId: 'aroma:black-plum', ripeness: 'ripe' },
    { aromaId: 'aroma:liquorice' },
    { aromaId: 'aroma:almond' },
    { aromaId: 'aroma:dried-herbs' },
  ],
  why: [
    { factor: 'Ripens early', effect: 'suits cooler, higher sites', result: 'planted where Nebbiolo will not ripen' },
    { factor: 'Low acidity, firm tannin', effect: 'soft fruit with grip', result: 'drink young; often a bitter-almond finish' },
  ],
  lookAlikes: [{ grapeId: 'grape:barbera', tell: 'Barbera has high acidity and little tannin.' }],
  regions: [{ regionId: 'region:it-piemonte-dolcetto-d-alba', styleLevel: 3, style: 'Black fruit, soft acidity, firm tannin; Dogliani is the DOCG.', producers: [] }],
  verified: false,
} satisfies Grape;
