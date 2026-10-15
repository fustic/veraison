// Theory: storage, service and food pairing. Drafted from general WSET Level 3 knowledge, in our own words.
// Check against the course book, then set verified: true.
import type { Topic } from '../../core/src/content.ts';

export default {
  id: 'topic:storage-service-and-food',
  title: 'Storage, service and food',
  chapter: 'Tasting and service',
  summary: 'Keep wine cool, dark and still; serve it at the right temperature; spot faults; and match the food’s sweetness, acidity, salt, umami and heat to the wine.',
  sections: [
    {
      heading: 'Storage',
      points: [
        'Cool and constant (about 10–15 °C), dark, away from vibration and strong smells; bottles with corks lie flat so the cork stays moist.',
        'Heat speeds ageing and can push corks out; light can cause "light strike" in clear bottles.',
      ],
    },
    {
      heading: 'Serving temperatures',
      points: [
        'Sweet wines and sparkling: well chilled, about 6–10 °C.',
        'Light, aromatic and simple whites: 7–10 °C. Medium to full and oaked whites: 10–13 °C.',
        'Light reds (Beaujolais): about 13 °C, lightly chilled. Medium to full reds: 15–18 °C.',
        'Too cold hides aromas and makes tannins harsher; too warm makes alcohol stand out.',
      ],
    },
    {
      heading: 'Opening, decanting and faults',
      points: [
        'Decant to remove sediment (Vintage Port, old reds) or to let young wines breathe.',
        'Open sparkling wine by holding the cork and turning the bottle, at an angle, with no pop.',
        'Faults: cork taint (TCA, musty wet cardboard), oxidation (brown, flat, nutty in a wine that should be fresh), reduction (rotten egg, cabbage), Brettanomyces (farmyard, plasters), volatile acidity (vinegar, nail polish).',
        'Keep opened wine with less air: stopper and fridge, inert gas or vacuum. Fortified wines like Madeira and Tawny last longest.',
      ],
    },
    {
      heading: 'Food and wine',
      points: [
        'Sweetness in food makes wine taste drier, more acidic and more bitter: the wine should be at least as sweet.',
        'Umami (mushrooms, aged cheese, cured meat) makes wine taste more bitter, acidic and alcoholic and less fruity.',
        'Acidity and salt in food make wine taste softer, fuller and fruitier: high-acid wines suit acidic or salty dishes.',
        'Chilli heat increases the burn of alcohol and bitterness of tannin: choose low alcohol, low tannin, some sweetness.',
        'Fat and oil are cut by acidity and softened by tannin; bitterness adds to bitterness.',
        'Match intensity: delicate food with delicate wine, powerful with powerful.',
      ],
      causes: [
        { factor: 'Sweet dessert with dry wine', effect: 'wine tastes thin and sour', result: 'pair with a sweeter wine' },
        { factor: 'Salty or acidic food', effect: 'softens the wine', result: 'high-acid wines work well' },
        { factor: 'Chilli heat', effect: 'amplifies alcohol and tannin', result: 'off-dry, low-alcohol, low-tannin wines' },
      ],
    },
  ],
  verified: false,
} satisfies Topic;
