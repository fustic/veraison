import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:barbera',
  name: 'Barbera',
  colour: 'red',
  berryColour: '#3A1A3F',
  traits: ['High acidity', 'Low tannin', 'Deep colour', 'Productive: yields must be limited'],
  structure: {
    cool: { appearanceIntensity: [2, 2], acidity: [4, 4], tannin: [1, 2], body: [2, 3], alcohol: [1, 1], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [2, 2], acidity: [3, 4], tannin: [1, 2], body: [3, 3], alcohol: [1, 2], noseIntensity: [3, 3] },
  },
  aromas: [
    { aromaId: 'aroma:sour-cherry', ripeness: 'less' },
    { aromaId: 'aroma:red-cherry', ripeness: 'ripe' },
    { aromaId: 'aroma:black-cherry', ripeness: 'ripe' },
    { aromaId: 'aroma:black-plum', ripeness: 'very' },
    { aromaId: 'aroma:black-pepper' },
    { aromaId: 'aroma:vanilla' },
    { aromaId: 'aroma:toast-oak' },
    { aromaId: 'aroma:cloves' },
  ],
  why: [
    { factor: 'High acidity, low tannin', effect: 'fresh, juicy and easy with food', result: 'everyday Piemonte red' },
    { factor: 'Small new oak barrels for premium wines', effect: 'adds the tannin it lacks plus spice', result: 'richer, structured Barbera' },
    { factor: 'High yields', effect: 'dilute fruit with sharp acidity', result: 'quality depends on yield control' },
  ],
  lookAlikes: [
    { grapeId: 'grape:dolcetto', tell: 'Dolcetto is the opposite: lower acidity, more tannin.' },
    { grapeId: 'grape:sangiovese', tell: 'Sangiovese has firmer tannin and more savoury, herbal notes.' },
  ],
  regions: [
    { regionId: 'region:it-piemonte-barbera-d-alba', styleLevel: 3, style: 'Grown on sites not used for Nebbiolo; often a little fuller.', producers: [] },
    { regionId: 'region:it-piemonte-barbera-d-asti', styleLevel: 3, style: 'Its main home; best from the Nizza zone (now DOCG).', producers: [] },
  ],
  alsoGrownIn: ['Monferrato', 'California', 'Australia', 'Argentina'],
  verified: false,
} satisfies Grape;
