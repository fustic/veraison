// Italy, Spain, Germany, Austria: the places the grape pages refer to so far.
// Drafted from general wine knowledge — check every line against your course book,
// fix what differs, then set verified: true. Centroids are approximate [longitude, latitude].

import type { Region } from '../../core/src/content.ts';
import { r } from './r.ts';

export const italy: Region[] = [
  r({
    id: 'region:it',
    name: 'Italy',
    parentId: null,
    level: 'country',
    centroid: [12.5, 42.5],
    radiusKm: 500,
    labelTerms: ['DOCG', 'DOC', 'IGT', 'Classico', 'Superiore', 'Riserva'],
  }),
  r({
    id: 'region:it-veneto',
    name: 'Veneto',
    parentId: 'region:it',
    level: 'region',
    centroid: [11.8, 45.6],
    radiusKm: 80,
    climate: { type: 'moderate', influence: 'continental' },
    why: [
      { factor: 'Fertile plains, high yields', effect: 'dilute, neutral grapes', result: 'large volumes of light Pinot Grigio and Prosecco' },
      { factor: 'Hills (Soave, Valpolicella)', effect: 'lower yields, better drainage and ripening', result: 'the region’s quality wines' },
      { factor: 'Drying picked grapes', effect: 'concentrates sugar and flavour', result: 'Amarone (dry) and Recioto (sweet) della Valpolicella' },
    ],
    principalGrapes: ['grape:pinot-gris', 'grape:corvina', 'grape:garganega', 'grape:glera'],
    labelTerms: ['delle Venezie', 'Soave', 'Valpolicella', 'Amarone della Valpolicella', 'Recioto della Valpolicella', 'Prosecco'],
  }),
  r({
    id: 'region:it-alto-adige',
    name: 'Alto Adige',
    parentId: 'region:it',
    level: 'region',
    centroid: [11.3, 46.5],
    radiusKm: 45,
    climate: { type: 'cool', influence: 'continental' },
    why: [
      { factor: 'Alpine valley vineyards at altitude', effect: 'warm days, cold nights', result: 'ripe fruit with high acidity; precise, aromatic whites' },
      { factor: 'Small-berried French and German clones, lower yields', effect: 'concentrated flavour', result: 'premium Pinot Grigio with depth' },
    ],
    principalGrapes: ['grape:pinot-gris'],
    otherGrapes: ['grape:chardonnay', 'grape:sauvignon-blanc', 'grape:gewurztraminer', 'grape:pinot-noir'],
    labelTerms: ['Alto Adige / Südtirol DOC'],
  }),
];

export const spain: Region[] = [
  r({
    id: 'region:es',
    name: 'Spain',
    parentId: null,
    level: 'country',
    centroid: [-3.7, 40.2],
    radiusKm: 450,
    labelTerms: ['DOCa', 'DO', 'Vino de Pago', 'Crianza', 'Reserva', 'Gran Reserva'],
  }),
  r({
    id: 'region:es-rioja',
    name: 'Rioja',
    parentId: 'region:es',
    level: 'region',
    centroid: [-2.45, 42.45],
    radiusKm: 55,
    climate: { type: 'moderate', influence: 'continental' },
    why: [
      { factor: 'Sierra de Cantabria to the north', effect: 'shelters the vineyards from cold, wet Atlantic weather', result: 'reliable ripening' },
      { factor: 'Rioja Alta and Alavesa: higher, cooler, more Atlantic', effect: 'slower ripening', result: 'Tempranillo with fresh acidity' },
      { factor: 'Rioja Oriental: lower, warmer, drier', effect: 'suits late-ripening Garnacha', result: 'perfume, body and alcohol for the blend' },
    ],
    principalGrapes: ['grape:tempranillo', 'grape:grenache'],
    otherGrapes: ['grape:graciano', 'grape:carignan', 'grape:viura'],
    labelTerms: ['DOCa Rioja', 'Crianza', 'Reserva', 'Gran Reserva'],
  }),
  r({
    id: 'region:es-priorat',
    name: 'Priorat',
    parentId: 'region:es',
    level: 'region',
    centroid: [0.8, 41.2],
    radiusKm: 12,
    climate: { type: 'warm', influence: 'mediterranean' },
    soils: 'llicorella: crumbly slate and quartz',
    why: [
      { factor: 'Steep slopes of poor slate soil, many old vines', effect: 'very low yields', result: 'concentrated, deeply coloured, tannic wines' },
      { factor: 'Garnacha blended with Carignan', effect: 'Carignan adds colour, tannin and acidity', result: 'powerful wines with fresh black fruit' },
    ],
    principalGrapes: ['grape:grenache', 'grape:carignan'],
    otherGrapes: ['grape:syrah', 'grape:cabernet-sauvignon'],
    labelTerms: ['DOCa Priorat'],
    producers: ['Álvaro Palacios'],
  }),
];

export const germany: Region[] = [
  r({
    id: 'region:de',
    name: 'Germany',
    parentId: null,
    level: 'country',
    centroid: [10.4, 51.0],
    radiusKm: 350,
    climate: { type: 'cool', influence: 'continental' },
    why: [
      { factor: 'Northern limit of viticulture', effect: 'ripening is marginal', result: 'the best vineyards are steep, south-facing river slopes' },
      { factor: 'Grapes graded by sugar at harvest', effect: 'Prädikat levels from Kabinett to Trockenbeerenauslese', result: 'the label tells you ripeness, not always sweetness' },
    ],
    principalGrapes: ['grape:riesling'],
    otherGrapes: ['grape:pinot-noir', 'grape:muller-thurgau'],
    labelTerms: ['Qualitätswein', 'Prädikatswein', 'Kabinett', 'Spätlese', 'Auslese', 'Beerenauslese', 'Trockenbeerenauslese', 'Eiswein', 'trocken'],
  }),
  r({
    id: 'region:de-baden',
    name: 'Baden',
    parentId: 'region:de',
    level: 'region',
    centroid: [8.0, 48.3],
    radiusKm: 110,
    climate: { type: 'moderate', influence: 'continental' },
    why: [{ factor: 'Germany’s warmest, sunniest region, sheltered by the Black Forest', effect: 'riper grapes', result: 'Pinot Noir (Spätburgunder), Pinot Gris and Pinot Blanc' }],
    principalGrapes: ['grape:pinot-noir', 'grape:pinot-gris'],
    otherGrapes: ['grape:pinot-blanc', 'grape:muller-thurgau'],
  }),
];

export const austria: Region[] = [
  r({
    id: 'region:at',
    name: 'Austria',
    parentId: null,
    level: 'country',
    centroid: [14.5, 47.6],
    radiusKm: 250,
    climate: { type: 'cool', influence: 'continental' },
    why: [{ factor: 'Warm summer days, cold nights', effect: 'grapes ripen but keep acidity', result: 'dry whites with ripe fruit and freshness; very sweet wines near Lake Neusiedl' }],
    principalGrapes: ['grape:gruner-veltliner', 'grape:riesling'],
    otherGrapes: ['grape:blaufrankisch', 'grape:zweigelt'],
    labelTerms: ['DAC', 'Qualitätswein', 'Prädikatswein'],
  }),
];
