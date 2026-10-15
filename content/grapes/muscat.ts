import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
// A family of varieties: Muscat Blanc à Petits Grains (finest), Muscat of Alexandria, Muscat Ottonel.
export default {
  id: 'grape:muscat',
  name: 'Muscat',
  colour: 'white',
  berryColour: '#D6C46A',
  synonyms: ['Moscato', 'Moscatel', 'Muscat Blanc à Petits Grains', 'Muscat of Alexandria'],
  traits: ['Very aromatic (grapey, floral)', 'A family of varieties', 'Dry, sweet, sparkling and fortified styles'],
  structure: {
    cool: { appearanceIntensity: [0, 0], sweetness: [0, 3], acidity: [2, 3], body: [0, 1], alcohol: [0, 1], noseIntensity: [3, 4] },
    warm: { appearanceIntensity: [1, 2], sweetness: [4, 5], acidity: [1, 2], body: [3, 4], alcohol: [2, 2], noseIntensity: [4, 4] },
  },
  aromas: [
    { aromaId: 'aroma:grape', ripeness: 'less' },
    { aromaId: 'aroma:orange-peel', ripeness: 'ripe' },
    { aromaId: 'aroma:peach', ripeness: 'ripe' },
    { aromaId: 'aroma:apricot', ripeness: 'very' },
    { aromaId: 'aroma:blossom' },
    { aromaId: 'aroma:rose' },
    { aromaId: 'aroma:elderflower' },
    { aromaId: 'aroma:raisin' },
    { aromaId: 'aroma:sultana' },
    { aromaId: 'aroma:toffee' },
  ],
  why: [
    { factor: 'High levels of grapey, floral aroma compounds', effect: 'the wine smells of fresh grapes', result: 'one of the few wines that tastes of the grape itself' },
    { factor: 'Asti and Moscato d’Asti: fermentation stopped by chilling', effect: 'low alcohol, sugar kept', result: 'light, sweet, fresh sparkling or frizzante wine' },
    { factor: 'Vin doux naturel: grape spirit added mid-fermentation', effect: 'sweet, about 15% abv', result: 'Muscat de Beaumes-de-Venise, Muscat de Rivesaltes' },
    { factor: 'Rutherglen: very ripe, raisined grapes, years of oxidative ageing', effect: 'concentration, tertiary flavours', result: 'luscious toffee and raisin Muscat' },
  ],
  lookAlikes: [
    { grapeId: 'grape:gewurztraminer', tell: 'Gewurztraminer is oilier with lychee, rose and ginger rather than fresh grape.' },
    { grapeId: 'grape:torrontes', tell: 'Torrontés is similar but drier and often slightly bitter.' },
  ],
  regions: [
    { regionId: 'region:it-piemonte-asti', styleLevel: 1, style: 'Asti and Moscato d’Asti: light, sweet, low alcohol, sparkling or frizzante.', producers: [] },
    { regionId: 'region:fr-alsace', styleLevel: 2, style: 'Dry, light, intensely grapey.', producers: [] },
    { regionId: 'region:fr-rhone-muscat-de-beaumes-de-venise', styleLevel: 4, style: 'Vin doux naturel: sweet, fresh, orange and blossom.', producers: [] },
    { regionId: 'region:fr-roussillon-rivesaltes', styleLevel: 4, style: 'Muscat de Rivesaltes: vin doux naturel.', producers: [] },
    { regionId: 'region:au-rutherglen', styleLevel: 5, style: 'Fortified, aged: luscious, raisin, toffee, coffee.', producers: [] },
  ],
  alsoGrownIn: ['Spain (Moscatel, Málaga)', 'Greece (Samos)', 'Austria (Muscat Ottonel)'],
  verified: false,
} satisfies Grape;
