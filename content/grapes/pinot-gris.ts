import type { Grape } from '../../core/src/content.ts';

// Drafted from the user's notes on white winemaking. Check against your book, then set verified: true.
// "Cool" here stands for the light Italian Pinot Grigio style, "warm" for the rich Alsace / New Zealand Pinot Gris style.
export default {
  id: 'grape:pinot-gris',
  name: 'Pinot Gris',
  colour: 'white',
  berryColour: '#B48A93',
  synonyms: ['Pinot Grigio'],
  traits: ['Early budding', 'Early ripening', 'Less aromatic', 'Deep-coloured skins'],
  structure: {
    cool: { appearanceIntensity: [0, 0], sweetness: [0, 0], acidity: [2, 3], body: [0, 2], alcohol: [1, 1], noseIntensity: [0, 2] },
    warm: { appearanceIntensity: [1, 2], sweetness: [0, 2], acidity: [2, 2], body: [3, 4], alcohol: [2, 2], noseIntensity: [2, 3] },
  },
  aromas: [
    { aromaId: 'aroma:pear', ripeness: 'less' },
    { aromaId: 'aroma:apple', ripeness: 'less' },
    { aromaId: 'aroma:lemon', ripeness: 'less' },
    { aromaId: 'aroma:peach', ripeness: 'ripe' },
    { aromaId: 'aroma:melon', ripeness: 'ripe' },
    { aromaId: 'aroma:mango', ripeness: 'very' },
    { aromaId: 'aroma:pineapple', ripeness: 'very' },
    { aromaId: 'aroma:ginger' },
    { aromaId: 'aroma:honey' },
  ],
  why: [
    { factor: 'Early budding and early ripening', effect: 'builds sugar fast, loses acidity in warm sites or if left late', result: 'rich, high-alcohol, softer wines' },
    { factor: 'Deep-coloured skins', effect: 'colour picked up from the skins', result: 'golden wines in Alsace' },
    { factor: 'Small-berried French/German clones (Alto Adige)', effect: 'concentrated flavour', result: 'premium Pinot Grigio with depth' },
    { factor: 'Pale, large-berried Veneto clone at high yields', effect: 'dilute, neutral juice', result: 'light, inexpensive Pinot Grigio' },
    { factor: 'Old oak, lees contact, sometimes residual sugar', effect: 'texture and roundness', result: 'oily, rich Alsace style' },
  ],
  lookAlikes: [
    { grapeId: 'grape:chardonnay', tell: 'Unoaked Chardonnay is similarly neutral; rich Pinot Gris is oilier, often off-dry, with ginger and honey.' },
  ],
  regions: [
    {
      regionId: 'region:it-veneto',
      styleLevel: 1,
      style: 'High-volume Pinot Grigio: light body, medium acidity, light pear drop; pale large-berried clone, high yields, early picking.',
      producers: [],
    },
    {
      regionId: 'region:it-alto-adige',
      styleLevel: 2,
      style: 'Dry premium Pinot Grigio with real depth (also Trentino and Friuli-Venezia Giulia).',
      producers: [],
    },
    {
      regionId: 'region:nz',
      styleLevel: 3,
      style: 'Labelled Pinot Gris: viscous, medium acidity, purer fruit, often a little more residual sugar.',
      producers: [],
    },
    {
      regionId: 'region:fr-alsace',
      styleLevel: 5,
      style: 'Dry or off-dry, oily texture, ripe tropical fruit, ginger and honey; often golden.',
      producers: [],
    },
    { regionId: 'region:it-trentino', styleLevel: 1, style: "Volume Pinot Grigio from the valley floor.", producers: [] },
    { regionId: 'region:it-friuli', styleLevel: 2, style: "Fresh, more aromatic Pinot Grigio from the hills.", producers: [] },
    { regionId: 'region:de-baden', styleLevel: 3, style: "As Grauburgunder: dry, full.", producers: [] },
    { regionId: 'region:us-willamette-valley', styleLevel: 3, style: "Fresh, fruity Pinot Gris.", producers: [] },
  ],
  alsoGrownIn: ['Tasmania', 'Romania', 'Hungary'],
  verified: false,
} satisfies Grape;
