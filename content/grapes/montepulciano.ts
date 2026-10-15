import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
// The grape, not the Tuscan town of Montepulciano (whose wine is made from Sangiovese).
export default {
  id: 'grape:montepulciano',
  name: 'Montepulciano',
  colour: 'red',
  berryColour: '#2B1430',
  traits: ['Late ripening', 'Deep colour', 'Ripe, high tannin', 'Moderate acidity'],
  structure: {
    cool: { appearanceIntensity: [2, 2], acidity: [2, 3], tannin: [3, 3], body: [2, 3], alcohol: [1, 1], noseIntensity: [2, 3] },
    warm: { appearanceIntensity: [2, 2], acidity: [2, 2], tannin: [3, 4], body: [3, 4], alcohol: [2, 2], noseIntensity: [2, 3] },
  },
  aromas: [
    { aromaId: 'aroma:red-plum', ripeness: 'less' },
    { aromaId: 'aroma:black-cherry', ripeness: 'ripe' },
    { aromaId: 'aroma:black-plum', ripeness: 'ripe' },
    { aromaId: 'aroma:jammy', ripeness: 'very' },
    { aromaId: 'aroma:dried-herbs' },
    { aromaId: 'aroma:black-pepper' },
    { aromaId: 'aroma:leather' },
  ],
  why: [
    { factor: 'Late ripening', effect: 'needs warmth', result: 'grown in central and southern Italy' },
    { factor: 'High yields on the coastal plains', effect: 'fruity, soft', result: 'inexpensive Montepulciano d’Abruzzo' },
    { factor: 'Lower yields, oak ageing', effect: 'concentration and structure', result: 'deep, tannic premium wines' },
  ],
  lookAlikes: [{ grapeId: 'grape:sangiovese', tell: 'Sangiovese is paler with higher acidity and sour cherry.' }],
  regions: [
    { regionId: 'region:it-abruzzo-montepulciano-d-abruzzo', styleLevel: 3, style: 'From soft, fruity, inexpensive to deep and tannic; Cerasuolo d’Abruzzo is the rosé.', producers: [] },
    { regionId: 'region:it-marche', styleLevel: 3, style: 'Rosso Conero and Rosso Piceno.', producers: [] },
  ],
  verified: false,
} satisfies Grape;
