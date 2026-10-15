import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:mencia',
  name: 'Mencía',
  colour: 'red',
  berryColour: '#4A1E3A',
  synonyms: ['Jaen (Portugal)'],
  traits: ['Aromatic', 'Fresh acidity', 'Medium tannin', 'Old vines on steep slate slopes'],
  structure: {
    cool: { appearanceIntensity: [1, 1], acidity: [3, 3], tannin: [2, 3], body: [2, 2], alcohol: [1, 1], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [1, 2], acidity: [2, 3], tannin: [2, 3], body: [2, 3], alcohol: [1, 2], noseIntensity: [3, 3] },
  },
  aromas: [
    { aromaId: 'aroma:raspberry', ripeness: 'less' },
    { aromaId: 'aroma:red-cherry', ripeness: 'ripe' },
    { aromaId: 'aroma:blackberry', ripeness: 'ripe' },
    { aromaId: 'aroma:violet' },
    { aromaId: 'aroma:dried-herbs' },
    { aromaId: 'aroma:wet-stones' },
  ],
  why: [
    { factor: 'Old vines on steep slate slopes (Bierzo)', effect: 'low yields, good drainage', result: 'concentrated, fragrant, fresh reds' },
    { factor: 'Atlantic-influenced north-west Spain', effect: 'moderate ripening', result: 'medium body, red fruit, floral lift' },
  ],
  lookAlikes: [
    { grapeId: 'grape:cabernet-franc', tell: 'Cabernet Franc is leafier, with more pencil-shaving and green notes.' },
    { grapeId: 'grape:pinot-noir', tell: 'Pinot Noir is paler with less tannin; Mencía is more floral and peppery.' },
  ],
  regions: [
    { regionId: 'region:es-bierzo', styleLevel: 3, style: 'Fragrant, fresh, red and black fruit; top wines from old hillside vines.', producers: ['Descendientes de J. Palacios'] },
    { regionId: 'region:pt-dao', styleLevel: 2, style: 'As Jaen: in Dão blends.', producers: [] },
  ],
  alsoGrownIn: ['Ribeira Sacra', 'Valdeorras'],
  verified: false,
} satisfies Grape;
