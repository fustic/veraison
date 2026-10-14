// Study notes: rosé winemaking. Condensed from the user's own notes, in our own words.
// Check against the course book, then set verified: true.
import type { Topic } from '../../core/src/content.ts';

export default {
  id: 'topic:rose-winemaking',
  title: 'Rosé winemaking',
  chapter: 'Winemaking',
  summary: 'Black grapes with only brief skin contact, or a dash of red in white. Three methods; oak is rarely used.',
  sections: [
    {
      heading: 'Direct pressing',
      points: [
        'Black grapes are crushed and pressed straight away, as for a white wine.',
        'The skins give a little colour; care is needed not to extract tannin.',
        'Gives the palest rosés.',
      ],
    },
    {
      heading: 'Short maceration',
      points: [
        'Crushed black grapes sit on their skins until they have given the colour, flavour and tannin wanted. This can run into the start of fermentation.',
        'The juice is then drained off the skins and fermented cool, like a white.',
      ],
      causes: [
        { factor: 'Longer time on the skins', effect: 'more colour, flavour and tannin', result: 'deeper, fuller rosé' },
        { factor: 'Cool fermentation off the skins', effect: 'keeps volatile fruit aromas', result: 'fresh, fruity rosé' },
      ],
    },
    {
      heading: 'Blending',
      points: [
        'A little red wine is added to a white.',
        'Not allowed in many European geographical indications; Champagne is the best-known exception.',
      ],
    },
  ],
  verified: false,
} satisfies Topic;
