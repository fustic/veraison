import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:muscadelle',
  name: 'Muscadelle',
  colour: 'white',
  berryColour: '#C9C27A',
  synonyms: ['Topaque (Rutherglen fortified)'],
  traits: ['Floral, grapey', 'Minor blending partner in Bordeaux', 'Not related to Muscat'],
  structure: {
    cool: { appearanceIntensity: [0, 1], sweetness: [0, 0], acidity: [2, 2], body: [1, 2], alcohol: [1, 1], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [2, 2], sweetness: [5, 5], acidity: [1, 2], body: [4, 4], alcohol: [2, 2], noseIntensity: [4, 4] },
  },
  aromas: [
    { aromaId: 'aroma:grape', ripeness: 'less' },
    { aromaId: 'aroma:peach', ripeness: 'ripe' },
    { aromaId: 'aroma:blossom' },
    { aromaId: 'aroma:honeysuckle' },
    { aromaId: 'aroma:toffee' },
    { aromaId: 'aroma:raisin' },
  ],
  why: [
    { factor: 'Small share in dry and sweet Bordeaux whites', effect: 'adds a floral, grapey perfume', result: 'lifts Semillon–Sauvignon blends' },
    { factor: 'Very ripe, raisined grapes fortified and aged for years (Rutherglen)', effect: 'oxidative ageing', result: 'Topaque: luscious, toffee and raisin' },
  ],
  lookAlikes: [{ grapeId: 'grape:muscat', tell: 'Both are grapey and floral; Muscat is far more intense.' }],
  regions: [
    { regionId: 'region:fr-bordeaux-entre-deux-mers', styleLevel: 1, style: 'A little in dry white blends.', producers: [] },
    { regionId: 'region:fr-bordeaux-sauternes', styleLevel: 3, style: 'A few per cent in some sweet blends.', producers: [] },
    { regionId: 'region:au-rutherglen', styleLevel: 5, style: 'Fortified Topaque: luscious, toffee, raisin and tea.', producers: [] },
  ],
  verified: false,
} satisfies Grape;
