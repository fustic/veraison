// Theory: Port. Condensed from the user's notes, in our own words.
// Check against the course book, then set verified: true.
import type { Topic } from '../../core/src/content.ts';

export default {
  id: 'topic:port',
  title: 'Port',
  chapter: 'Fortified wines',
  summary:
    'Thick-skinned Douro grapes get one or two days of fierce extraction before grape spirit stops the fermentation. Ruby styles keep their fruit in large vessels; tawny styles fade and turn nutty in small pipes.',
  sections: [
    {
      heading: 'Where Port is made',
      points: [
        'Vineyards start 70 km up the Douro from the twin cities of Porto and Vila Nova de Gaia.',
        'Three sub-regions: Baixo Corgo (lightest wines, coolest and wettest), Cima Corgo (most top vineyards), Douro Superior (sparsely planted, hottest, also top quality).',
        'Warm continental, sheltered from Atlantic rain by the Serra do Marão; hotter and drier going east. Spring frost, occasional downpours at flowering or harvest, very hot dry summers.',
        'Schist bedrock fractures vertically, so roots reach water stored from winter rain.',
      ],
      causes: [{ factor: 'Vertically fractured schist', effect: 'roots reach deep winter water', result: 'vines survive the hot, dry summers' }],
      links: ['region:pt-douro', 'region:pt-douro-baixo-corgo', 'region:pt-douro-cima-corgo', 'region:pt-douro-superior'],
    },
    {
      heading: 'Slopes and terraces',
      points: [
        'Very steep, high slopes in Baixo and Cima Corgo; growers use altitude and aspect (north-facing sites avoid full sun).',
        'Socalcos: narrow, stone-walled terraces of a few rows; no machines, costly walls, still widely used.',
        'Patamares: wider terraces without walls, wide enough for a tractor.',
        'Vinha ao alto: rows up and down gentler slopes, worked by winches from cross-slope roads.',
        'Patamares and especially vinha ao alto are prone to erosion; vinha ao alto is impossible on the steepest slopes.',
      ],
    },
    {
      heading: 'Grapes',
      points: [
        'Most red Port blends many grapes: thick-skinned, tannic, black-fruited and floral.',
        'Five preferred for premium Port: Touriga Franca, Tinta Roriz, Tinta Barroca, Touriga Nacional, Tinto Cão.',
      ],
      links: ['grape:touriga-nacional', 'grape:touriga-franca', 'grape:tempranillo', 'grape:tinta-barroca', 'grape:tinto-cao'],
    },
    {
      heading: 'Fermentation and extraction',
      points: [
        'Fermentation is stopped at 5–9% abv, after only 24–48 hours, so normal extraction is not enough.',
        'Foot treading: teams tread for three or four hours in shallow granite lagares, then punch down the cap; the benchmark, now used only for some premium wines.',
        'Autovinifiers: CO₂ pressure pushes juice up into a holding tank; a valve releases it to flood the cap, every 15–20 minutes at peak. Little pre-fermentation extraction, so newer ones add paddles.',
        'Piston plungers (robotic pistons pushing the cap in shallow round vats) and robotic lagares (a gantry with robotic “feet” treading in a lagar-sized steel tank): many rate them as good as feet.',
      ],
      causes: [{ factor: 'Only 24–48 hours on the skins', effect: 'extraction must be very vigorous', result: 'treading, autovinifiers and robotic lagares' }],
    },
    {
      heading: 'Fortification',
      points: [
        'Spirit (aguardente) kills the yeast, giving a stable sweet wine of 19–22% abv; timing sets each house’s sweetness.',
        'Aguardente is at most 77% abv, so a lot is needed: about 20% of a bottle of Port is spirit, compared with about 3.5% in Fino Sherry.',
      ],
    },
    {
      heading: 'Maturation: ruby vs tawny',
      points: [
        'Traditionally aged in cooler coastal Vila Nova de Gaia; air conditioning now allows ageing in the Douro.',
        'Old oak (small or very large) or steel; never new-oak flavour.',
        'Ruby styles (Ruby, Reserve Ruby, LBV, Vintage): short ageing in very large oak or steel to limit oxygen; deep colour, intense primary fruit. Ruby, Reserve Ruby and most LBV are fined and filtered and do not improve.',
        'Unfiltered LBV and all Vintage Port improve in bottle: garnet, with cooked fruit, prune, leather, wet leaves.',
        'True Tawny: long oxidative ageing in pipes (casks of about 550 L); garnet then tawny (only the oldest fully brown); raisin, walnut, coffee, chocolate, caramel; deposit thrown in wood; ready on release.',
        'Blending (grapes, sites) goes on throughout maturation, even for Vintage Port.',
      ],
      causes: [
        { factor: 'Large vessels, short time', effect: 'little oxygen', result: 'ruby styles: deep colour, primary fruit' },
        { factor: 'Years in small pipes', effect: 'slow oxidation', result: 'tawny colour, nuts, caramel, dried fruit' },
      ],
    },
    {
      heading: 'Types of Port',
      points: [
        'Ruby: blends of 1–3-year-old wines, simple. Basic Tawny: no older than Ruby; colour from lighter wines (often Baixo Corgo) rather than long ageing.',
        'Reserve / Reserva: better Ruby or Tawny approved by a tasting panel; Reserve Tawny needs at least 6 years in wood.',
        'Late Bottled Vintage (LBV): one year, bottled after 4–6 years, mostly filtered and ready to drink (like a fine Reserve Ruby); a few unfiltered ones age and need decanting.',
        'Tawny with an indication of age: 10, 20, 30 or 40 Years Old, matching the style of that age (an average, not a minimum); bottling year on the label; the finest Tawnies.',
        'Vintage: declared in the second year after harvest, bottled by the third; unfined and unfiltered; the most concentrated and tannic; ages for decades with heavy sediment. About three declarations a decade; some years nearly everyone declares (2011, 2016), others not (2015).',
        'Single Quinta Vintage: one estate named on the label. Small one-quinta producers declare only in great years; big houses use them in undeclared years, often releasing them ready to drink.',
      ],
    },
  ],
  verified: false,
} satisfies Topic;
