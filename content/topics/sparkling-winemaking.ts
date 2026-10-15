// Theory: making sparkling wine. Drafted from general WSET Level 3 knowledge, in our own words.
// Check against the course book, then set verified: true.
import type { Topic } from '../../core/src/content.ts';

export default {
  id: 'topic:sparkling-winemaking',
  title: 'Sparkling winemaking',
  chapter: 'Sparkling wines',
  summary:
    'A second fermentation in a closed vessel traps CO₂. Where it happens (bottle or tank) and how long the wine stays on its lees decide the style: toasty and complex, or fresh and fruity.',
  sections: [
    {
      heading: 'Grapes and base wine',
      points: [
        'Grapes are picked early for high acidity, moderate sugar and delicate flavours; often hand-picked so whole bunches can be pressed gently.',
        'Gentle pressing keeps colour and bitter phenolics out, especially from black grapes.',
        'The base wine is dry, high in acidity, around 10–11% abv; it is often blended from many batches and vintages (reserve wines).',
      ],
      causes: [{ factor: 'Early picking in a cool climate', effect: 'high acidity, low sugar, neutral flavours', result: 'base wine that balances the bubbles and suits autolysis' }],
    },
    {
      heading: 'Traditional method',
      points: [
        'Liqueur de tirage (wine, sugar, yeast, nutrients) is added and the wine is bottled and capped. The second fermentation adds about 1.5% abv and around 6 atmospheres of pressure.',
        'The wine then ages on its lees in bottle. Yeast autolysis slowly gives bread, biscuit, brioche and toast, and finer bubbles.',
        'Riddling (by hand on pupitres or by gyropalette) moves the lees into the neck; disgorgement freezes the neck and the pressure pushes the plug out.',
        'Dosage (wine and sugar) sets the final sweetness, then the cork and wire go on.',
        'Used for Champagne, Crémant, Cava, Franciacorta and most premium New World and English sparkling wine.',
      ],
      causes: [
        { factor: 'Long ageing on the lees in bottle', effect: 'yeast autolysis', result: 'biscuit, brioche and toast; creamier mousse' },
        { factor: 'Dosage', effect: 'sugar balances acidity', result: 'Brut Nature to Doux' },
      ],
      links: ['region:fr-champagne', 'region:es-penedes', 'region:it-franciacorta', 'region:gb-england'],
    },
    {
      heading: 'Transfer method',
      points: [
        'Second fermentation and lees ageing in bottle as above, but the wine is then emptied into a pressurised tank, filtered, dosed and rebottled.',
        'Keeps some autolytic character without riddling; used for unusual bottle sizes and some New World wines.',
      ],
    },
    {
      heading: 'Tank method',
      points: [
        'The second fermentation happens in a sealed pressure tank, then the wine is filtered, dosed and bottled under pressure.',
        'Fast and cheap, with little or no lees contact, so primary fruit and floral aromas stay in front.',
        'Used for Prosecco, most Sekt and many inexpensive sparkling wines.',
      ],
      causes: [{ factor: 'Second fermentation in tank, short lees contact', effect: 'little autolysis', result: 'fresh, fruity, floral sparkling (Prosecco)' }],
      links: ['region:it-veneto-prosecco', 'grape:glera'],
    },
    {
      heading: 'Asti method and carbonation',
      points: [
        'Asti method: a single fermentation of Muscat juice in a sealed tank; CO₂ is kept and the fermentation is stopped by chilling at about 7–9.5% abv.',
        'Result: sweet, low alcohol, intensely grapey (Asti spumante; Moscato d’Asti is lightly sparkling at about 5%).',
        'Carbonation: CO₂ injected like a soft drink; large bubbles that fade quickly; only for the cheapest wines.',
      ],
      links: ['region:it-piemonte-asti', 'grape:muscat'],
    },
    {
      heading: 'Sweetness terms (EU)',
      points: [
        'Brut Nature 0–3 g/L; Extra Brut 0–6; Brut 0–12; Extra Dry 12–17; Sec 17–32; Demi-Sec 32–50; Doux over 50.',
        'Extra Dry is sweeter than Brut: a common exam trap.',
      ],
    },
  ],
  verified: false,
} satisfies Topic;
