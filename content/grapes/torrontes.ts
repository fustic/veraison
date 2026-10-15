import type { Grape } from '../../core/src/content.ts';

// Drafted from general WSET Level 3 knowledge. Check against your book, then set verified: true.
export default {
  id: 'grape:torrontes',
  name: 'Torrontés',
  colour: 'white',
  berryColour: '#D1C77A',
  traits: ['Very aromatic (Muscat family)', 'Argentina’s signature white', 'Can be bitter'],
  structure: {
    cool: { appearanceIntensity: [0, 1], sweetness: [0, 0], acidity: [2, 3], body: [1, 2], alcohol: [1, 2], noseIntensity: [4, 4] },
    warm: { appearanceIntensity: [0, 1], sweetness: [0, 0], acidity: [1, 2], body: [2, 3], alcohol: [2, 2], noseIntensity: [4, 4] },
  },
  aromas: [
    { aromaId: 'aroma:lemon', ripeness: 'less' },
    { aromaId: 'aroma:peach', ripeness: 'ripe' },
    { aromaId: 'aroma:grape', ripeness: 'ripe' },
    { aromaId: 'aroma:rose' },
    { aromaId: 'aroma:blossom' },
    { aromaId: 'aroma:honeysuckle' },
  ],
  why: [
    { factor: 'Very high vineyards in Salta (Cafayate)', effect: 'intense sun, cold nights', result: 'pronounced floral aromas with freshness' },
    { factor: 'Phenolic, slightly bitter skins', effect: 'careful handling and little skin contact', result: 'avoids a bitter finish' },
  ],
  lookAlikes: [{ grapeId: 'grape:muscat', tell: 'Dry Muscat is more grapey; Torrontés more perfumed and a little bitter.' }],
  regions: [{ regionId: 'region:ar-salta', styleLevel: 4, style: 'Dry, perfumed: rose, peach, citrus.', producers: [] }],
  verified: false,
} satisfies Grape;
