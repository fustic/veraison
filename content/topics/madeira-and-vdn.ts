// Theory: Madeira and vins doux naturels. Drafted from general WSET Level 3 knowledge, in our own words.
// Check against the course book, then set verified: true.
import type { Topic } from '../../core/src/content.ts';

export default {
  id: 'topic:madeira-and-vdn',
  title: 'Madeira and vins doux naturels',
  chapter: 'Fortified wines',
  summary: 'Madeira is deliberately heated and oxidised, so it barely changes once opened. Vins doux naturels are French wines fortified early in fermentation to keep their sweetness.',
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
      heading: 'Vins doux naturels',
      points: [
        'Grape spirit is added early in fermentation, keeping lots of sugar; about 15–18% abv.',
        'Muscat VDN (Beaumes-de-Venise, Rivesaltes, Frontignan): kept away from oxygen and bottled young: fresh grape, orange blossom, peach.',
        'Grenache VDN (Banyuls, Maury, Rivesaltes): unoxidised (Rimage, Grenat: red fruit) or oxidatively aged, sometimes outdoors in glass bonbonnes (Tuilé, Ambré, Hors d’Âge: dried fruit, nuts, rancio).',
        'Rutherglen Muscat (Australia) is a related fortified style: very ripe, raisined grapes, years of hot oxidative ageing; graded Rutherglen, Classic, Grand, Rare.',
      ],
      causes: [
        { factor: 'Muscat VDN protected from oxygen', effect: 'primary aromas kept', result: 'fresh, grapey, sweet' },
        { factor: 'Grenache VDN aged oxidatively', effect: 'tertiary development', result: 'dried fruit, nuts, rancio' },
      ],
      links: ['region:fr-rhone-muscat-de-beaumes-de-venise', 'region:fr-roussillon-banyuls', 'region:fr-roussillon-maury', 'region:fr-roussillon-rivesaltes', 'region:au-rutherglen', 'grape:muscat', 'grape:grenache'],
    },
  ],
  verified: false,
} satisfies Topic;
