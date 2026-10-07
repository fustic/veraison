import type { Grape } from '../../core/src/content.ts';

// Draft from general wine knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:pinot-noir',
  name: 'Pinot Noir',
  colour: 'red',
  synonyms: ['Spätburgunder', 'Pinot Nero'],
  traits: ['Thin skins', 'Early budding', 'Early ripening'],
  structure: {
    cool: { appearanceIntensity: [0, 0], acidity: [4, 4], tannin: [1, 2], body: [1, 2], alcohol: [1, 1], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [0, 1], acidity: [3, 3], tannin: [2, 2], body: [2, 3], alcohol: [1, 2], noseIntensity: [3, 3] },
  },
  aromas: [
    { aromaId: 'aroma:cranberry', ripeness: 'less' },
    { aromaId: 'aroma:sour-cherry', ripeness: 'less' },
    { aromaId: 'aroma:redcurrant', ripeness: 'less' },
    { aromaId: 'aroma:red-cherry', ripeness: 'ripe' },
    { aromaId: 'aroma:strawberry', ripeness: 'ripe' },
    { aromaId: 'aroma:raspberry', ripeness: 'ripe' },
    { aromaId: 'aroma:black-cherry', ripeness: 'very' },
    { aromaId: 'aroma:red-plum', ripeness: 'very' },
    { aromaId: 'aroma:jammy', ripeness: 'very' },
    { aromaId: 'aroma:vanilla' },
    { aromaId: 'aroma:cloves' },
    { aromaId: 'aroma:smoke' },
    { aromaId: 'aroma:forest-floor' },
    { aromaId: 'aroma:mushroom' },
    { aromaId: 'aroma:game' },
  ],
  why: [
    { factor: 'Early budding', effect: 'spring frost risk', result: 'careful site selection' },
    { factor: 'Thin skins', effect: 'pale colour, low tannin', result: 'and prone to rot in wet vintages' },
    { factor: 'Too much heat', effect: 'jammy fruit, lost fragrance', result: 'best in cool to moderate climates' },
    { factor: 'Whole-bunch fermentation (some producers)', effect: 'adds fragrance and structure', result: 'stemmy, spicy notes' },
  ],
  lookAlikes: [
    { grapeId: 'grape:gamay', tell: 'Gamay is juicier, often with banana or bubblegum from carbonic maceration, and rarely earthy.' },
    { grapeId: 'grape:corvina', tell: 'Corvina shows sour cherry and a bitter-almond finish.' },
  ],
  regions: [
    {
      regionId: 'region:fr-burgundy-cote-de-nuits',
      styleLevel: 1,
      style: 'Pale, high acid, red cherry and earthy notes that age into forest floor. Firmer than the Côte de Beaune.',
      producers: ['Domaine de la Romanée-Conti', 'Domaine Armand Rousseau'],
    },
    {
      regionId: 'region:fr-burgundy-cote-de-beaune',
      styleLevel: 1,
      style: 'Softer and more perfumed, especially in Volnay; Pommard is firmer.',
      producers: [],
    },
    {
      regionId: 'region:de-baden',
      styleLevel: 2,
      style: "Germany's warmest region. Light to medium body, bright red fruit, often matured in French oak.",
      producers: ['Bernhard Huber'],
    },
    {
      regionId: 'region:us-willamette-valley',
      styleLevel: 3,
      style: 'Cool, with a risk of autumn rain. Red and black cherry with earthy notes, between Burgundy and California in style.',
      producers: ['The Eyrie Vineyards', 'Domaine Drouhin Oregon'],
    },
    {
      regionId: 'region:nz-central-otago',
      styleLevel: 4,
      style: 'Far south, high altitude, big day–night swings. Intense ripe red and black fruit, herbal notes, fresh acidity.',
      producers: ['Felton Road', 'Rippon'],
    },
    {
      regionId: 'region:us-sonoma-coast',
      styleLevel: 5,
      style: 'Pacific fog cools sunny days. Riper black cherry, fuller body, higher alcohol, often noticeable new oak.',
      producers: ['Williams Selyem', 'Littorai'],
    },
  ],
  alsoGrownIn: ['Martinborough', 'Yarra Valley', 'Tasmania', 'Casablanca Valley', 'Walker Bay', 'Champagne (sparkling)'],
  verified: false,
} satisfies Grape;
