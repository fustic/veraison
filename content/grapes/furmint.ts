import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
// Structure: "cool" = dry Furmint, "warm" = Tokaji Aszú.
export default {
  id: 'grape:furmint',
  name: 'Furmint',
  colour: 'white',
  berryColour: '#C9C06A',
  traits: ['Late ripening', 'Very high acidity', 'Thin skins: prone to noble rot'],
  structure: {
    cool: { appearanceIntensity: [0, 1], sweetness: [0, 0], acidity: [4, 4], body: [2, 3], alcohol: [1, 2], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [1, 2], sweetness: [4, 5], acidity: [4, 4], body: [3, 4], alcohol: [1, 1], noseIntensity: [3, 4] },
  },
  aromas: [
    { aromaId: 'aroma:apple', ripeness: 'less' },
    { aromaId: 'aroma:lemon', ripeness: 'less' },
    { aromaId: 'aroma:pear', ripeness: 'ripe' },
    { aromaId: 'aroma:apricot', ripeness: 'very' },
    { aromaId: 'aroma:wet-stones' },
    { aromaId: 'aroma:dried-apricot' },
    { aromaId: 'aroma:marmalade' },
    { aromaId: 'aroma:honey' },
    { aromaId: 'aroma:ginger' },
    { aromaId: 'aroma:nutty' },
  ],
  why: [
    { factor: 'Thin skins and autumn mists from the Bodrog and Tisza rivers', effect: 'reliable noble rot', result: 'shrivelled aszú berries' },
    { factor: 'Aszú berries macerated in base wine or must, then fermented', effect: 'very sweet, concentrated', result: 'Tokaji Aszú: at least 120 g/L sugar (5 or 6 puttonyos)' },
    { factor: 'Very high acidity', effect: 'balances the sugar', result: 'fresh even when luscious; ages for decades' },
    { factor: 'Dry Furmint', effect: 'full, high acid, smoky-mineral', result: 'a growing dry style' },
    { factor: 'Young dry Furmint', effect: 'concentrated, high acid', result: 'apple when young, nuts and honey with age' },
    { factor: 'Blended with Hárslevelű (perfume) and Sárga Muskotály (aroma)', effect: 'extra fragrance', result: 'classic Tokaji blends' },
  ],
  lookAlikes: [
    { grapeId: 'grape:riesling', tell: 'Riesling is more floral and lighter in body.' },
    { grapeId: 'grape:semillon', tell: 'Sauternes has lower acidity and more oak.' },
  ],
  regions: [{ regionId: 'region:hu-tokaj', styleLevel: 5, style: 'Tokaji Aszú, Szamorodni, Eszencia and dry Furmint; blended with Hárslevelű.', producers: ['Royal Tokaji', 'Disznókő', 'Oremus'] }],
  verified: false,
} satisfies Grape;
