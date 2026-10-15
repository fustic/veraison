// Theory: Sherry. Drafted from general WSET Level 3 knowledge, in our own words.
// Check against the course book, then set verified: true.
import type { Topic } from '../../core/src/content.ts';

export default {
  id: 'topic:sherry',
  title: 'Sherry',
  chapter: 'Fortified wines',
  summary: 'A dry, neutral Palomino base wine is fortified and aged in a solera, either under flor (biological ageing) or exposed to oxygen (oxidative ageing). Sweet styles come from PX, Moscatel or sweetening.',
  sections: [
    {
      heading: 'Vineyard and base wine',
      points: [
        'The Jerez triangle: Jerez de la Frontera, Sanlúcar de Barrameda and El Puerto de Santa María. Hot summers; humid Atlantic poniente wind near the coast.',
        'Albariza: white, chalky soil that soaks up winter rain and keeps it through the summer.',
        'Palomino gives a neutral, low-acid base wine fermented to dryness at about 11–12.5% abv. Free-run juice goes to Fino; heavier press juice to Oloroso.',
      ],
      links: ['region:es-jerez', 'grape:palomino'],
    },
    {
      heading: 'Classification and fortification',
      points: [
        'Each cask of new wine is tasted and classified: the most delicate for biological ageing, fuller ones for oxidative ageing.',
        'Biological: fortified to about 15–15.5% so flor yeast can survive. Oxidative: fortified to about 17%, which kills flor.',
      ],
      causes: [{ factor: 'Fortifying to about 17%', effect: 'flor cannot survive', result: 'oxidative ageing (Oloroso)' }],
    },
    {
      heading: 'Flor and biological ageing',
      points: [
        'Flor is a layer of yeast on the wine’s surface in part-filled casks. It needs alcohol below about 15.5%, humidity and moderate temperatures.',
        'It shields the wine from oxygen and consumes glycerol, alcohol and nutrients, giving a pale, light-bodied, bone-dry wine with bready, almond notes and acetaldehyde.',
        'Fino (Jerez, El Puerto) and Manzanilla (Sanlúcar, where the sea humidity keeps flor thick all year, giving an even lighter, saltier style).',
        'Drink fresh and chilled once opened.',
      ],
      causes: [{ factor: 'Flor yeast over the wine', effect: 'no oxygen, glycerol consumed', result: 'pale, light, dry, bready and almond (Fino, Manzanilla)' }],
    },
    {
      heading: 'The solera',
      points: [
        'Rows of casks of different ages: wine for bottling is drawn from the oldest level (the solera) and topped up from the next (criaderas), down to the youngest.',
        'Fractional blending keeps the style consistent and feeds flor with fresh nutrients. Minimum average age is two years.',
      ],
      causes: [{ factor: 'Fractional blending through the solera', effect: 'young wine refreshes old', result: 'consistent style; no vintage' }],
    },
    {
      heading: 'Styles',
      points: [
        'Amontillado: starts as Fino; when flor dies (or the wine is refortified to about 17%) it ages oxidatively. Amber, dry, with both bready and nutty notes.',
        'Oloroso: oxidative only. Deep brown, full-bodied, dry, walnut, toffee, leather; alcohol rises as water evaporates.',
        'Palo Cortado: rare; the delicacy of Amontillado with the body of Oloroso.',
        'Pedro Ximénez and Moscatel: sun-dried grapes, fortified, aged oxidatively: very sweet, raisin, fig, coffee.',
        'Sweetened blends: Pale Cream (Fino + sugar), Medium (Amontillado-based), Cream (Oloroso + PX).',
        'Age-dated: VOS (20+ years) and VORS (30+ years); also 12 and 15 years.',
      ],
      links: ['grape:pedro-ximenez', 'grape:muscat'],
    },
  ],
  verified: false,
} satisfies Topic;
