import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:carignan',
  name: 'Carignan',
  colour: 'red',
  berryColour: '#3A1A33',
  synonyms: ['Cariñena', 'Mazuelo', 'Samsó', 'Carignano'],
  traits: ['Late budding, late ripening', 'High acidity, tannin and colour', 'Very productive', 'Prone to powdery mildew'],
  structure: {
    cool: { appearanceIntensity: [1, 2], acidity: [3, 4], tannin: [3, 3], body: [2, 3], alcohol: [1, 2], noseIntensity: [2, 2] },
    warm: { appearanceIntensity: [2, 2], acidity: [3, 3], tannin: [3, 4], body: [3, 3], alcohol: [2, 2], noseIntensity: [2, 3] },
  },
  aromas: [
    { aromaId: 'aroma:red-cherry', ripeness: 'less' },
    { aromaId: 'aroma:blackberry', ripeness: 'ripe' },
    { aromaId: 'aroma:black-plum', ripeness: 'ripe' },
    { aromaId: 'aroma:baked-fruit', ripeness: 'very' },
    { aromaId: 'aroma:dried-herbs' },
    { aromaId: 'aroma:liquorice' },
    { aromaId: 'aroma:earth' },
  ],
  why: [
    { factor: 'High yields from young vines', effect: 'dilute fruit with harsh tannin', result: 'rustic, astringent bulk wine' },
    { factor: 'Old, low-yielding bush vines', effect: 'concentration with natural acidity', result: 'serious wines in Priorat, Languedoc and Chile’s Maule' },
    { factor: 'Carbonic maceration', effect: 'softens the tannin', result: 'fruitier, rounder southern French reds' },
    { factor: 'Keeps acidity in heat', effect: 'freshens Grenache-based blends', result: 'colour, tannin and acidity for the blend' },
    { factor: 'Permitted in every Languedoc-Roussillon appellation', effect: 'still widely planted though much reduced', result: 'old vines on poor soils give the best wines' },
  ],
  lookAlikes: [{ grapeId: 'grape:grenache', tell: 'Grenache is softer, paler and more alcoholic; Carignan is sharper and more tannic.' }],
  regions: [
    { regionId: 'region:fr-languedoc-corbieres', styleLevel: 2, style: 'Rustic, herbal blends with Grenache and Syrah.', producers: [] },
    { regionId: 'region:es-priorat', styleLevel: 4, style: 'Old vines on slate: concentrated, high acid, firm tannin with Garnacha.', producers: [] },
    { regionId: 'region:cl-maule-valley', styleLevel: 3, style: 'Old dry-farmed vines: fresh, concentrated red fruit.', producers: [] },
  ],
  alsoGrownIn: ['Rioja (Mazuelo)', 'Sardinia (Carignano del Sulcis)', 'Roussillon', 'California'],
  verified: false,
} satisfies Grape;
