import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:godello',
  name: 'Godello',
  colour: 'white',
  berryColour: '#CFC47A',
  traits: ['Early ripening', 'Medium acidity', 'Fuller body', 'Suits lees and oak'],
  structure: {
    cool: { appearanceIntensity: [0, 1], sweetness: [0, 0], acidity: [2, 3], body: [2, 3], alcohol: [1, 1], noseIntensity: [2, 2] },
    warm: { appearanceIntensity: [1, 1], sweetness: [0, 0], acidity: [2, 2], body: [3, 3], alcohol: [1, 2], noseIntensity: [2, 3] },
  },
  aromas: [
    { aromaId: 'aroma:apple', ripeness: 'less' },
    { aromaId: 'aroma:pear', ripeness: 'less' },
    { aromaId: 'aroma:peach', ripeness: 'ripe' },
    { aromaId: 'aroma:wet-stones' },
    { aromaId: 'aroma:bread' },
    { aromaId: 'aroma:toast-oak' },
  ],
  why: [{ factor: 'Lees ageing and barrel fermentation', effect: 'texture and complexity', result: 'rich, mineral whites compared with white Burgundy' }],
  lookAlikes: [{ grapeId: 'grape:chardonnay', tell: 'Similar texture; Godello is a little more mineral and less buttery.' }],
  regions: [
    { regionId: 'region:es-valdeorras', styleLevel: 3, style: 'Slate and granite slopes: textured, mineral, stone fruit.', producers: [] },
    { regionId: 'region:es-bierzo', styleLevel: 3, style: 'Concentrated whites from old vines.', producers: [] },
  ],
  verified: false,
} satisfies Grape;
