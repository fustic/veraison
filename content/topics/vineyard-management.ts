// Theory: growing the grapes. Drafted from general WSET Level 3 knowledge, in our own words.
// Check against the course book, then set verified: true.
import type { Topic } from '../../core/src/content.ts';

export default {
  id: 'topic:vineyard-management',
  title: 'Growing the grapes',
  chapter: 'The vineyard',
  summary:
    'The grower decides the site, plant material, training, canopy, yield and harvest. Each choice trades quality against cost and quantity.',
  sections: [
    {
      heading: 'Site and soil',
      points: [
        'A good site has the right temperature for the variety, enough sun and access to water without waterlogging.',
        'Soil matters mostly for water and heat: free-draining gravel and stone warm up and drain after rain; clay holds water and stays cool.',
        'Fertile soils give vigorous vines; poorer soils limit vigour and yields.',
      ],
      causes: [
        { factor: 'Free-draining, stony soil', effect: 'warm, dry roots, low vigour', result: 'late varieties ripen (Cabernet on Médoc gravel)' },
        { factor: 'Cool, water-retaining clay', effect: 'slower ripening', result: 'suits early varieties (Merlot in Pomerol)' },
      ],
      links: ['region:fr-bordeaux-haut-medoc', 'region:fr-bordeaux-pomerol'],
    },
    {
      heading: 'Plant material',
      points: [
        'Almost all wine comes from Vitis vinifera. Varieties can mutate (Pinot Noir → Pinot Gris, Pinot Blanc); growers choose clones for yield, disease resistance or flavour.',
        'Crossings are new varieties from two vinifera parents (Pinotage, Müller-Thurgau). Hybrids cross vinifera with other species for cold or disease resistance.',
        'Phylloxera, an aphid, eats vinifera roots. The fix is grafting onto American rootstocks, chosen for soil, vigour and drought tolerance.',
        'Places phylloxera never reached or cannot survive: Chile, parts of South Australia, sandy or volcanic soils (Santorini).',
      ],
      causes: [{ factor: 'Grafting onto resistant rootstock', effect: 'roots survive phylloxera', result: 'the standard practice almost everywhere' }],
      links: ['grape:pinotage', 'grape:muller-thurgau', 'region:cl', 'region:gr-santorini'],
    },
    {
      heading: 'Training and pruning',
      points: [
        'Winter pruning sets how many buds (and so shoots and bunches) the vine carries.',
        'Spur pruning keeps short stubs on a permanent cordon; cane pruning lays down one or two long canes each year (Guyot).',
        'Bush vines (head-trained, no wires) suit hot, dry, windy places: the canopy shades the fruit (Châteauneuf, Barossa, Priorat).',
        'Vertical shoot positioning (VSP) gives a neat wall of leaves for sun exposure and machine work.',
        'High training keeps fruit away from frost or ground humidity; pergolas give airflow in humid places (Rías Baixas, Vinho Verde).',
      ],
      causes: [
        { factor: 'Low bush vines in heat', effect: 'leaves shade the bunches', result: 'grapes protected from sunburn' },
        { factor: 'High pergola in humid climates', effect: 'air moves through the bunches', result: 'less fungal disease' },
      ],
      links: ['region:es-rias-baixas', 'region:au-barossa-valley', 'region:gr-santorini'],
    },
    {
      heading: 'Canopy and yield',
      points: [
        'Canopy management balances leaves and fruit: shoot thinning, leaf removal around the bunches, hedging.',
        'Leaf removal increases sun and airflow on grapes: better ripening, less rot, but sunburn risk in hot places.',
        'Yield is set by vine density, pruning and green harvesting (cutting bunches before veraison).',
        'Very high yields usually dilute flavour; very low yields cost more but are not automatically better.',
      ],
      causes: [
        { factor: 'Leaf removal around the fruit zone', effect: 'more sunlight and air on the bunches', result: 'riper fruit, less disease' },
        { factor: 'High yields', effect: 'the vine’s energy spread over more fruit', result: 'lighter, less concentrated wine' },
      ],
    },
    {
      heading: 'Pests, diseases and approaches',
      points: [
        'Fungal: powdery mildew (oidium) and downy mildew (peronospora) attack leaves and fruit; grey rot (Botrytis) spoils bunches in damp weather; trunk diseases kill old vines.',
        'Controlled by sprays (copper and sulfur allowed in organics), canopy airflow and resistant varieties.',
        'Viruses spread by insects or nematodes; birds and animals eat fruit.',
        'Integrated pest management: monitor and treat only when needed. Organic: no synthetic chemicals. Biodynamic: organic plus preparations and a calendar.',
      ],
      causes: [{ factor: 'Humid, warm weather', effect: 'fungal disease spreads', result: 'more spraying and careful canopy work' }],
    },
    {
      heading: 'Harvest',
      points: [
        'Timing balances sugar, acidity, tannin ripeness and flavour against weather risk; picking early keeps acidity, later gives riper fruit and more alcohol.',
        'Hand picking allows whole bunches, sorting and steep slopes, but is slow and costly.',
        'Machine picking is fast and cheap, works at night when it is cool, but needs flat land and breaks berries.',
      ],
      causes: [
        { factor: 'Night machine harvesting in hot regions', effect: 'grapes arrive cool and fresh', result: 'fresher aromas, less oxidation' },
        { factor: 'Hand picking', effect: 'whole bunches and selection', result: 'needed for whole-bunch, sparkling and botrytised wines' },
      ],
      links: ['topic:sweet-winemaking', 'topic:red-winemaking'],
    },
  ],
  verified: false,
} satisfies Topic;
