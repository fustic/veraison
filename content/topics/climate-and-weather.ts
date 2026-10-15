// Theory: the vine, climate and weather. Drafted from general WSET Level 3 knowledge,
// in our own words. Check against the course book, then set verified: true.
import type { Topic } from '../../core/src/content.ts';

export default {
  id: 'topic:climate-and-weather',
  title: 'Climate, weather and ripening',
  chapter: 'The vineyard',
  summary:
    'Heat, sunlight and water decide how ripe grapes get. Climate is the long-term pattern of a place; weather is what happens in a given year and explains vintage variation.',
  sections: [
    {
      heading: 'What the vine needs',
      points: [
        'Sunlight, heat, water, carbon dioxide and nutrients. Photosynthesis turns CO₂ and water into sugar using sunlight.',
        'Growth starts at about 10 °C; photosynthesis works best between roughly 18 and 33 °C. Above that the vine shuts down to save water.',
        'Too much vigour (water, nitrogen) means leaves and shoots grow at the expense of the fruit; a little stress focuses the vine on ripening.',
      ],
      causes: [{ factor: 'Moderate water and nutrient stress', effect: 'shoot growth slows before veraison', result: 'energy goes into the grapes: smaller berries, more concentration' }],
    },
    {
      heading: 'The growing cycle',
      points: [
        'Winter dormancy (Nov–Mar in the north): the vine rests; pruning is done now.',
        'Budburst (Mar–Apr): sensitive to spring frost.',
        'Flowering and fruit set (May–Jun): needs warm, dry, calm weather. Poor fruit set gives coulure (flowers fail to set) or millerandage (uneven, small seedless berries).',
        'Veraison (Jul–Aug): berries soften and change colour; sugar starts to build.',
        'Ripening and harvest (Sep–Oct): sugar rises, acidity falls, colour, tannin and aromas mature. In the Southern Hemisphere everything is six months later.',
      ],
      causes: [
        { factor: 'Cold or wet weather at flowering', effect: 'poor fruit set (coulure, millerandage)', result: 'smaller crops' },
        { factor: 'Ripening', effect: 'sugar up, acidity down, tannin and flavour mature', result: 'harvest date sets the balance of the wine' },
      ],
    },
    {
      heading: 'Climate types',
      points: [
        'Classified by the average temperature of the growing season: cool up to 16.5 °C, moderate 16.5–18.5 °C, warm 18.5–21 °C, hot above 21 °C.',
        'Continental: big difference between summer and winter, short summers, cold winters, spring frost risk (Burgundy, Champagne).',
        'Maritime: small difference between seasons thanks to the sea; mild, often rainy (Bordeaux).',
        'Mediterranean: warm, dry summers and mild, wet winters (southern France, much of the New World).',
        'Cool climates: lighter body, higher acidity, green and citrus fruit. Hot climates: riper fruit, more alcohol and body, softer acidity.',
      ],
      causes: [
        { factor: 'Cool climate', effect: 'slow ripening, acidity kept', result: 'lighter body, high acid, green and red fruit' },
        { factor: 'Hot climate', effect: 'fast ripening, acidity falls', result: 'full body, high alcohol, ripe black or tropical fruit' },
      ],
      links: ['region:fr-champagne', 'region:fr-bordeaux', 'region:fr-languedoc'],
    },
    {
      heading: 'What changes temperature',
      points: [
        'Latitude: most vineyards lie between 30° and 50°; nearer the poles grapes struggle to ripen.',
        'Altitude: about 0.6 °C cooler per 100 m; high vineyards keep acidity in hot countries (Mendoza, Salta).',
        'Slope and aspect: slopes facing the equator catch more sun; cold air drains down slopes, reducing frost.',
        'Water bodies: seas, lakes and rivers moderate temperatures and reflect light (Mosel, Finger Lakes).',
        'Ocean currents and fog: cold currents (Humboldt, Benguela, California) cool coastal areas; fog slows ripening.',
        'Soil: stones and dark soils store heat; wet clay soils stay cool.',
        'Diurnal range: cool nights keep acidity and aromas while warm days ripen sugar.',
      ],
      causes: [
        { factor: 'High altitude', effect: 'cooler, especially at night', result: 'fresh acidity in hot regions' },
        { factor: 'Cold ocean current and coastal fog', effect: 'cooler, slower ripening near the coast', result: 'cool-climate styles in warm countries' },
        { factor: 'Large diurnal range', effect: 'sugar builds by day, acid and aromas kept by night', result: 'ripe fruit with freshness' },
      ],
      links: ['region:ar-mendoza', 'region:de-mosel', 'region:cl-casablanca-valley'],
    },
    {
      heading: 'Sunlight and water',
      points: [
        'More sunlight means more photosynthesis; slopes facing the equator, long summer days at high latitude and clear skies all help.',
        'The vine needs about 500–700 mm of water a year depending on heat, ideally in winter and spring.',
        'Too much water: vigour, dilution, rot. Too little: stress, stopped ripening, damaged vines.',
        'Where rain is low, irrigation (drip, sprinkler, flood) is used, often under controlled deficit to limit vigour.',
      ],
    },
    {
      heading: 'Weather hazards',
      points: [
        'Spring frost kills new shoots; prevented by wind machines, heaters, sprinklers (ice protects the buds) or late pruning.',
        'Winter freeze below about −20 °C can kill vines (Washington, Canada, New York).',
        'Hail tears leaves and berries; nets are used in Argentina.',
        'Rain at harvest swells berries and spreads rot.',
        'Drought and heat stress stop ripening; fire can taint grapes with smoke.',
        'Climate change: earlier harvests, higher alcohol, new regions (England) becoming viable.',
      ],
      causes: [
        { factor: 'Spring frost', effect: 'kills buds and young shoots', result: 'small or no crop' },
        { factor: 'Rain at harvest', effect: 'dilution and grey rot', result: 'lighter, lower-quality wines' },
      ],
      links: ['region:gb-england', 'region:ar-mendoza'],
    },
  ],
  verified: false,
} satisfies Topic;
