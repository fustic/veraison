// Theory: sparkling wines of the world. Drafted from general WSET Level 3 knowledge, in our own words.
// Check against the course book, then set verified: true.
import type { Topic } from '../../core/src/content.ts';

export default {
  id: 'topic:sparkling-wines',
  title: 'Sparkling wines of the world',
  chapter: 'Sparkling wines',
  summary: 'Champagne sets the benchmark; Crémant, Cava, Franciacorta, England and the New World use the same method, while Prosecco, Asti and Sekt show the fresher tank-method styles.',
  sections: [
    {
      heading: 'Champagne',
      points: [
        'Cold northern climate and chalk soils give high-acid, low-sugar grapes: Chardonnay (finesse), Pinot Noir (body, structure) and Meunier (fruit).',
        'Pressing is strictly limited: 4,000 kg of grapes give at most 2,550 L, split into the cuvée (first, finest juice) and the taille.',
        'Non-vintage: at least 15 months from bottling to release, 12 of them on lees; vintage: at least 3 years. Many houses age far longer.',
        'Non-vintage blends many villages and reserve wines to keep a house style; vintage wines show one year; prestige cuvées are the top blends.',
        'Styles: Blanc de Blancs (Chardonnay only), Blanc de Noirs (black grapes only), rosé (usually by blending red wine into white), sweetness from Brut Nature to Doux.',
        'Label codes: NM (négociant-manipulant, the houses), RM (récoltant-manipulant, growers), CM (co-operative).',
      ],
      causes: [
        { factor: 'Reserve wines in the blend', effect: 'smooth out vintage variation', result: 'consistent non-vintage style' },
        { factor: 'Chalk subsoil and cellars', effect: 'drainage, water reserve, cool steady ageing', result: 'fine, long-lived wines' },
      ],
      links: ['region:fr-champagne', 'region:fr-champagne-cote-des-blancs', 'region:fr-champagne-montagne-de-reims', 'region:fr-champagne-vallee-de-la-marne', 'grape:chardonnay', 'grape:pinot-noir', 'grape:pinot-meunier'],
    },
    {
      heading: 'Crémant',
      points: [
        'Traditional-method French sparkling from outside Champagne: Alsace (Pinot Blanc), Loire (Chenin), Burgundy (Chardonnay, Pinot Noir), Limoux and others.',
        'At least 9 months on lees; whole-bunch pressing; usually fresher and fruitier, less autolytic, and cheaper than Champagne.',
      ],
      links: ['region:fr-alsace', 'region:fr-loire-saumur', 'region:fr-burgundy-rully'],
    },
    {
      heading: 'Cava',
      points: [
        'Traditional method, mostly from Penedès; Macabeo (fruit), Xarel·lo (body) and Parellada (freshness), plus Chardonnay and Pinot Noir.',
        'Warmer climate: riper fruit, lower acidity, a little earthy; at least 9 months on lees, Reserva 18, Gran Reserva 30.',
      ],
      links: ['region:es-penedes', 'grape:viura', 'grape:xarello', 'grape:parellada'],
    },
    {
      heading: 'Prosecco, Asti and Sekt',
      points: [
        'Prosecco: tank method from Glera in Veneto and Friuli; fresh pear, apple and blossom; Brut or Extra Dry. Conegliano Valdobbiadene DOCG hills give finer wines.',
        'Asti and Moscato d’Asti: Muscat, Asti method, sweet and low in alcohol.',
        'Sekt: Germany’s sparkling, mostly tank method; Deutscher Sekt must use German grapes; the best are traditional-method Riesling or Pinot.',
      ],
      links: ['region:it-veneto-prosecco', 'region:it-piemonte-asti', 'region:de'],
    },
    {
      heading: 'Franciacorta, England and the New World',
      points: [
        'Franciacorta: traditional method in Lombardy; riper and rounder than Champagne; Satèn is a softer, lower-pressure style.',
        'England: chalk soils and a cool climate close to Champagne’s; high-acid traditional-method wines from the three Champagne grapes.',
        'New World: cool sites chosen for acidity: Tasmania, Adelaide Hills, Yarra (Australia); Marlborough (NZ); Carneros, Anderson Valley (California); Cap Classique (South Africa).',
        'Warmer New World climates give riper fruit and less acidity, so many producers rely more on fruit than long autolysis.',
      ],
      links: ['region:it-franciacorta', 'region:gb-england', 'region:au-tasmania', 'region:us-los-carneros', 'region:nz-marlborough'],
    },
  ],
  verified: false,
} satisfies Topic;
