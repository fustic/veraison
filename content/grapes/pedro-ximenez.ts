import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
// Structure: "cool" = dry, unfortified Montilla-Moriles styles; "warm" = sweet PX Sherry.
export default {
  id: 'grape:pedro-ximenez',
  name: 'Pedro Ximénez',
  colour: 'white',
  berryColour: '#C9B060',
  synonyms: ['PX'],
  traits: ['Thin skins (dries easily in the sun)', 'High sugar', 'Montilla-Moriles speciality'],
  structure: {
    cool: { appearanceIntensity: [0, 1], sweetness: [0, 0], acidity: [1, 2], body: [1, 2], alcohol: [2, 2], noseIntensity: [1, 2] },
    warm: { appearanceIntensity: [2, 2], sweetness: [5, 5], acidity: [1, 2], body: [4, 4], alcohol: [2, 2], noseIntensity: [4, 4] },
  },
  aromas: [
    { aromaId: 'aroma:raisin', ripeness: 'very' },
    { aromaId: 'aroma:fig', ripeness: 'very' },
    { aromaId: 'aroma:prune', ripeness: 'very' },
    { aromaId: 'aroma:liquorice' },
    { aromaId: 'aroma:coffee-oxidative' },
    { aromaId: 'aroma:chocolate-oxidative' },
    { aromaId: 'aroma:toffee' },
  ],
  why: [
    { factor: 'Thin skins', effect: 'grapes dry quickly when laid out in the sun', result: 'raisined grapes with very concentrated sugar' },
    { factor: 'Fortified and aged oxidatively', effect: 'concentration and tertiary flavours', result: 'PX: black-brown, syrupy, raisin, fig, coffee' },
    { factor: 'Hot Montilla-Moriles', effect: 'grapes reach high sugar naturally', result: 'dry styles can reach 15% without fortification' },
  ],
  lookAlikes: [{ grapeId: 'grape:muscat', tell: 'Aged Muscat (Rutherglen, Moscatel) is similar but keeps a floral, grapey note.' }],
  regions: [{ regionId: 'region:es-jerez', styleLevel: 5, style: 'PX Sherry and sweetening for blended Sherries (often from Montilla-Moriles grapes).', producers: [] }],
  alsoGrownIn: ['Montilla-Moriles', 'Málaga', 'Australia (fortified)'],
  verified: false,
} satisfies Grape;
