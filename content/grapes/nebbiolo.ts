import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:nebbiolo',
  name: 'Nebbiolo',
  colour: 'red',
  berryColour: '#7A2A3E',
  synonyms: ['Spanna', 'Chiavennasca'],
  traits: ['Early budding, very late ripening', 'High acidity and high tannin', 'Pale colour that browns early', 'Needs long ageing'],
  structure: {
    cool: { appearanceIntensity: [0, 0], acidity: [4, 4], tannin: [3, 4], body: [2, 3], alcohol: [1, 2], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [0, 1], acidity: [4, 4], tannin: [4, 4], body: [3, 4], alcohol: [2, 2], noseIntensity: [3, 4] },
  },
  aromas: [
    { aromaId: 'aroma:sour-cherry', ripeness: 'less' },
    { aromaId: 'aroma:red-cherry', ripeness: 'ripe' },
    { aromaId: 'aroma:red-plum', ripeness: 'ripe' },
    { aromaId: 'aroma:kirsch', ripeness: 'very' },
    { aromaId: 'aroma:rose' },
    { aromaId: 'aroma:violet' },
    { aromaId: 'aroma:liquorice' },
    { aromaId: 'aroma:dried-herbs' },
    { aromaId: 'aroma:tar' },
    { aromaId: 'aroma:leather' },
    { aromaId: 'aroma:forest-floor' },
    { aromaId: 'aroma:mushroom' },
    { aromaId: 'aroma:dried-cranberry' },
  ],
  why: [
    { factor: 'Early budding', effect: 'spring frost risk', result: 'planted on slopes where cold air drains away' },
    { factor: 'Very late ripening', effect: 'needs the warmest south-facing hillsides', result: 'grown almost only in Piemonte; harvest often in October fog (nebbia)' },
    { factor: 'Few colour pigments in the skin', effect: 'pale ruby that turns garnet and orange early', result: 'colour is no guide to its power' },
    { factor: 'Very high tannin and acidity', effect: 'tough when young', result: 'long ageing: Barolo at least 38 months (18 in wood), Barbaresco 26 (9 in wood)' },
    { factor: 'Traditional large old botti or modern small barriques', effect: 'little oak flavour or vanilla and toast', result: 'two styles of Barolo' },
    { factor: 'Bottle age', effect: 'tertiary development', result: 'tar, roses, leather, truffle and dried cherry' },
    { factor: 'Barbaresco: lower slopes (200–400 m) near the Tanaro', effect: 'ripens earlier than in Barolo', result: 'fruitier, less perfumed, with similar acid and tannin' },
  ],
  lookAlikes: [
    { grapeId: 'grape:sangiovese', tell: 'Sangiovese is less tannic and less perfumed, with tomato leaf and more red cherry.' },
    { grapeId: 'grape:aglianico', tell: 'Aglianico is deeper in colour with black fruit.' },
    { grapeId: 'grape:pinot-noir', tell: 'Both pale, but Pinot has far less tannin.' },
  ],
  regions: [
    { regionId: 'region:it-piemonte-langhe', styleLevel: 2, style: 'Langhe Nebbiolo: earlier drinking, lighter, from younger vines or lesser sites.', producers: [] },
    { regionId: 'region:it-piemonte-barbaresco', styleLevel: 4, style: 'Slightly lower and warmer: a touch less tannic and more approachable than Barolo.', producers: ['Gaja', 'Produttori del Barbaresco', 'Bruno Giacosa'] },
    { regionId: 'region:it-piemonte-barolo', styleLevel: 5, style: 'Full, very tannic, high acid; rose, tar and cherry; needs a decade.', producers: ['Giacomo Conterno', 'Bartolo Mascarello', 'Vietti'] },
  ],
  alsoGrownIn: ['Gattinara and Ghemme (Alto Piemonte)', 'Valtellina (Lombardy)', 'Australia', 'California'],
  verified: false,
} satisfies Grape;
