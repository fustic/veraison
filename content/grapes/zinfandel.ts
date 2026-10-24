import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:zinfandel',
  name: 'Zinfandel',
  colour: 'red',
  berryColour: '#3A1735',
  synonyms: ['Primitivo', 'Tribidrag'],
  traits: ['Uneven ripening within bunches', 'High sugar, high alcohol', 'Thin skins (rot risk)', 'Old bush vines'],
  structure: {
    cool: { appearanceIntensity: [1, 2], acidity: [2, 3], tannin: [2, 3], body: [3, 3], alcohol: [2, 2], noseIntensity: [3, 3] },
    warm: { appearanceIntensity: [2, 2], acidity: [1, 2], tannin: [2, 3], body: [3, 4], alcohol: [2, 2], noseIntensity: [3, 4] },
  },
  aromas: [
    { aromaId: 'aroma:red-cherry', ripeness: 'less' },
    { aromaId: 'aroma:strawberry', ripeness: 'ripe' },
    { aromaId: 'aroma:blackberry', ripeness: 'ripe' },
    { aromaId: 'aroma:jammy', ripeness: 'very' },
    { aromaId: 'aroma:raisin' },
    { aromaId: 'aroma:prune' },
    { aromaId: 'aroma:black-pepper' },
    { aromaId: 'aroma:vanilla' },
    { aromaId: 'aroma:coconut' },
    { aromaId: 'aroma:cloves' },
  ],
  why: [
    { factor: 'Bunches ripen unevenly', effect: 'some berries raisin while others are still green', result: 'picked late: jammy, raisined fruit and 15%+ alcohol' },
    { factor: 'Old, dry-farmed bush vines (Lodi, Sonoma)', effect: 'low yields', result: 'concentrated, spicy premium Zinfandel' },
    { factor: 'American oak', effect: 'vanilla and coconut', result: 'sweet-spiced, rich style' },
    { factor: 'White Zinfandel', effect: 'short skin contact, sweet', result: 'pale, off-dry blush wine' },
    { factor: 'Raisined berries in the bunch', effect: 'concentration and sugar', result: 'full body, high alcohol, sometimes a little residual sugar; red and black fruit, dried berries, liquorice; under-ripe berries can add a herbal note' },
    { factor: 'Regarded as California’s own grape', effect: 'made in many styles', result: 'from White Zinfandel to old-vine reds; Lodi has some of the oldest and best vineyards' },
  ],
  lookAlikes: [
    { grapeId: 'grape:grenache', tell: 'Grenache is paler, with less tannin and more herbal notes.' },
    { grapeId: 'grape:syrah', tell: 'Syrah has more pepper and savoury notes, less jammy raisin.' },
  ],
  regions: [
    { regionId: 'region:us-dry-creek-valley', styleLevel: 3, style: 'Old vines: brambly, spicy, ripe.', producers: ['Ridge Vineyards'] },
    { regionId: 'region:us-lodi', styleLevel: 4, style: 'Hot inland: ripe, jammy, high alcohol; many old vines.', producers: [] },
    { regionId: 'region:us-paso-robles', styleLevel: 4, style: 'Warm Central Coast: rich, ripe.', producers: [] },
    { regionId: 'region:it-puglia-primitivo-di-manduria', styleLevel: 5, style: 'As Primitivo: very ripe, full, high alcohol, dried fruit.', producers: [] },
    { regionId: 'region:it-puglia', styleLevel: 3, style: 'As Primitivo: high yields give simple Puglia IGT; at controlled yields full, high alcohol, very ripe berry fruit.', producers: [] },
    { regionId: 'region:us-sonoma-valley', styleLevel: 3, style: 'Old vines.', producers: [] },
    { regionId: 'region:us-mendocino', styleLevel: 3, style: 'Warm, dry inland: full, soft.', producers: [] },
    { regionId: 'region:us-napa-calistoga', styleLevel: 4, style: 'Grown alongside Cabernet in the warm north of the valley.', producers: [] },
  ],
  alsoGrownIn: ['Croatia (Crljenak Kaštelanski / Tribidrag)', 'Australia'],
  verified: false,
} satisfies Grape;
