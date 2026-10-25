// Theory: Madeira and vins doux naturels. Drafted from general WSET Level 3 knowledge, in our own words.
// Check against the course book, then set verified: true.
import type { Topic } from '../../core/src/content.ts';

export default {
  id: 'topic:madeira-and-vdn',
  title: 'Madeira, fortified Muscats and VDN',
  chapter: 'Fortified wines',
  summary: 'Madeira is deliberately heated and oxidised, so it barely changes once opened. Fortified Muscats are either young and grapey or aged for decades; Grenache VDN can be fruity or oxidative.',
  sections: [
    {
      heading: 'Madeira: vineyards and grapes',
      points: [
        'Subtropical Atlantic island: humid, with fungal disease pressure; steep terraces (poios) worked by hand.',
        'Named grapes set the sweetness: Sercial (dry), Verdelho (medium-dry), Bual or Boal (medium-sweet), Malmsey or Malvasia (sweet). All keep very high acidity.',
        'Tinta Negra is the most planted grape and is used for most blends.',
      ],
      links: ['region:pt-madeira'],
    },
    {
      heading: 'Madeira: making and ageing',
      points: [
        'Fortified with grape spirit (to about 17–22%): early for sweet styles, late for dry ones.',
        'Estufagem: tanks heated to about 45–50 °C for at least three months; quick, for younger wines.',
        'Canteiro: casks left in warm lofts for years; slower, finer, for the best wines.',
        'Styles: blends sold by age (5, 10, 15, 20 years and more), Colheita (one year, at least 5 years in cask), Frasqueira (vintage, at least 20 years in cask).',
      ],
      causes: [{ factor: 'Heat and oxygen during ageing', effect: 'wine is already fully oxidised', result: 'brown, tangy, caramel and nutty; lasts for months once opened' }],
    },
    {
      heading: 'Fortified Muscats: the grapes',
      points: [
        'Several grapes are called Muscat; all have low to medium acidity and perfume of orange blossom, rose and grape.',
        'They thrive in warm and hot climates, but the best sites have some cooling to keep acidity and aroma.',
        'Two broad styles: youthful and unaged, or fully developed after long ageing.',
      ],
      links: ['grape:muscat'],
    },
    {
      heading: 'Youthful, unaged Muscat',
      points: [
        'Medium gold, floral, aromatic, sweet but rarely luscious; the aim is pure varietal character (e.g. Muscat de Beaumes-de-Venise, Southern Rhône).',
        'Ripe, healthy grapes; no raisining or drying, which would add dried fruit and mask the variety.',
        'Some skin contact, sometimes through fermentation, adds aroma and richness.',
        'Cool fermentation stopped with 96% abv grape spirit; stored in inert vessels away from oxygen.',
      ],
      causes: [{ factor: 'No raisining, inert storage, no oxygen', effect: 'primary aromas kept', result: 'fresh, grapey, floral sweet wine' }],
      links: ['region:fr-rhone-muscat-de-beaumes-de-venise', 'region:fr-roussillon-rivesaltes'],
    },
    {
      heading: 'Fully developed, aged Muscat',
      points: [
        'Amber to brown, sweet or luscious; the most famous luscious ones come from Rutherglen, Australia.',
        'Style depends on harvest timing, when the wine is fortified, and how long and how it ages.',
        'For luscious wines some raisining on the vine adds complexity, but too much loses the Muscat aroma.',
        'Fermented on skins; drained, pressed and fortified at just 1–2% abv, so very high sugar remains.',
        'Oxidative ageing for years, even decades, in old (often large) oak, sometimes in warm conditions; new oak would clash with the grape.',
        'Still Muscat-scented when very old; a little younger wine is often blended in for lift.',
      ],
      causes: [{ factor: 'Long oxidative ageing in old wood, sometimes warm', effect: 'tertiary development', result: 'amber to brown, toffee, dried fruit, still with Muscat aroma' }],
      links: ['region:au-rutherglen'],
    },
    {
      heading: 'Grenache vins doux naturels',
      points: [
        'Grape spirit added early in fermentation keeps lots of sugar; about 15–18% abv.',
        'Banyuls, Maury, Rivesaltes, and Rasteau in the Southern Rhône: unoxidised (Rimage, Grenat: red fruit) or oxidatively aged, sometimes outdoors in glass bonbonnes (Tuilé, Ambré, Hors d’Âge: dried fruit, nuts, rancio).',
      ],
      causes: [{ factor: 'Grenache VDN aged oxidatively', effect: 'tertiary development', result: 'dried fruit, nuts, rancio' }],
      links: ['region:fr-roussillon-banyuls', 'region:fr-roussillon-maury', 'grape:grenache'],
    },
  ],
  verified: false,
} satisfies Topic;
