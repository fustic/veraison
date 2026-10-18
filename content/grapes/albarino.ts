import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:albarino',
  name: 'Albariño',
  colour: 'white',
  berryColour: '#C8D38A',
  synonyms: ['Alvarinho'],
  traits: ['Thick skins (resists rot)', 'Aromatic', 'High acidity'],
  structure: {
    cool: { appearanceIntensity: [0, 0], sweetness: [0, 0], acidity: [4, 4], body: [1, 2], alcohol: [1, 1], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [0, 1], sweetness: [0, 0], acidity: [3, 4], body: [2, 2], alcohol: [1, 2], noseIntensity: [3, 3] },
  },
  aromas: [
    { aromaId: 'aroma:lemon', ripeness: 'less' },
    { aromaId: 'aroma:grapefruit', ripeness: 'less' },
    { aromaId: 'aroma:peach', ripeness: 'ripe' },
    { aromaId: 'aroma:nectarine', ripeness: 'ripe' },
    { aromaId: 'aroma:blossom' },
    { aromaId: 'aroma:wet-stones' },
  ],
  why: [
    { factor: 'Thick skins', effect: 'resist fungal disease', result: 'suits damp, humid Galicia; often trained on high pergolas for airflow' },
    { factor: 'Cool, wet Atlantic climate', effect: 'slow ripening', result: 'light to medium body, high acidity, citrus and stone fruit' },
    { factor: 'Some lees ageing', effect: 'texture', result: 'rounder, fuller examples' },
    { factor: 'Monção e Melgaço: sheltered, warmer', effect: 'riper grapes', result: 'fuller, more aromatic Alvarinho' },
    { factor: 'Vinho Verde Alvarinho: 100% Alvarinho from Monção e Melgaço', effect: 'riper than other Vinho Verde', result: '11.5–14% abv, more tropical fruit' },
  ],
  lookAlikes: [{ grapeId: 'grape:sauvignon-blanc', tell: 'Sauvignon Blanc is grassy and herbaceous; Albariño is peachy and floral, with no green notes.' }],
  regions: [
    { regionId: 'region:es-rias-baixas', styleLevel: 3, style: 'Benchmark: high acid, citrus, peach and blossom, often with a saline edge.', producers: [] },
    { regionId: 'region:pt-vinho-verde', styleLevel: 3, style: 'As Alvarinho, mostly from Monção e Melgaço: riper and fuller.', producers: [] },
  ],
  alsoGrownIn: ['California', 'Uruguay', 'New Zealand'],
  verified: false,
} satisfies Grape;
