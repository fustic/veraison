// Study notes: white winemaking. Condensed from the user's own notes, in our own words.
// Check against the course book, then set verified: true.
import type { Topic } from '../../core/src/content.ts';

export default {
  id: 'topic:white-winemaking',
  title: 'White winemaking',
  chapter: 'Winemaking',
  summary:
    'Fewer steps than red winemaking. Almost every decision trades protecting fresh primary fruit against building texture and complexity.',
  sections: [
    {
      heading: 'Skin contact',
      points: [
        'Usual path: crush, run off the free-run juice, press the rest quickly. Little skin contact means little oxidation.',
        'Whole-bunch pressing (uncrushed grapes into the press) is the gentlest option: least oxidation, purer and more delicate wines.',
        'Some aromatic varieties get a few hours of cold skin contact (too cold to ferment) for more flavour and texture.',
        'Orange or amber wines ferment white grapes on their skins like a red. Traditional in Georgia, Slovenia and Friuli-Venezia Giulia.',
        'Orange wine taste: noticeable tannin, dried fruit, dried herbs, hay, nuts.',
      ],
      causes: [
        { factor: 'Whole-bunch pressing', effect: 'least skin contact and oxidation', result: 'purer, more delicate wine' },
        { factor: 'Fermenting on the skins', effect: 'colour and tannin extracted', result: 'orange wine with grip and dried-fruit notes' },
      ],
    },
    {
      heading: 'Clarity of the juice',
      points: [
        'Fresh juice carries skin and pulp fragments (solids). Fermenting them can give off-flavours or a stuck fermentation, so juice is clarified first.',
        'Methods: settling, centrifuge, fining, filtration. Settling is gentle but slow; centrifuge or filter when tank space and time matter.',
        'Leaving some solids can add complexity and richer texture (and may help resist oxidation), but risks off-flavours, so it is rare for pure varietal styles.',
      ],
      causes: [{ factor: 'Very clean juice', effect: 'nothing masks the fruit', result: 'clean, fruity, varietal wine' }],
    },
    {
      heading: 'Fermentation temperature and vessel',
      points: [
        'Whites ferment at about 12–22 °C.',
        'Too cold: pear-drop aromas and varietal fruit not captured. Warmer: more complex non-fruit aromas, but varietal fruit can be lost.',
        'Stainless steel tanks allow precise temperature control.',
        'Barrels are harder to control but small and usually in cool cellars, so they lose heat well; barrel ferments still run at the warm end of the range.',
      ],
      causes: [
        { factor: 'Cool fermentation in stainless steel', effect: 'keeps volatile primary aromas', result: 'fresh, fruity style' },
        { factor: 'Barrel fermentation', effect: 'warmer ferment, oak contact', result: 'rounder texture, toasty notes, more complexity' },
      ],
    },
    {
      heading: 'After fermentation',
      points: [
        'Oak: mature in barrel, or keep in an inert vessel, with or without oak staves or chips.',
        'Fine lees: add texture and flavour. Lees stirring (mixing the settled lees back into the wine) strengthens the effect.',
        'Malolactic conversion: allow it for a rounder, creamier, buttery wine with softer acidity and less primary fruit; block it (chill and add SO₂) to keep acidity and fruit.',
        'Blending: for fruity styles mainly about consistency; for Chardonnay, batches with different lees, MLC and oak are blended for complexity.',
        'Clarification and stabilisation: pale wines show any haze, so most are fined and/or filtered. Wines with residual sugar are sterile filtered so yeast or bacteria cannot spoil them.',
      ],
      causes: [
        { factor: 'Malolactic conversion', effect: 'malic acid becomes softer lactic acid', result: 'lower perceived acidity, creamy and buttery notes' },
        { factor: 'Lees ageing and stirring', effect: 'lees compounds dissolve into the wine', result: 'richer, rounder texture' },
      ],
    },
    {
      heading: 'High-volume, inexpensive whites',
      points: [
        'Goal: easy-drinking, consistent, good value; not complex, not for ageing. Often blends labelled simply "dry white" or "fruity white".',
        'Typical grapes: neutral and easy to ripen, such as Chardonnay and Pinot Grigio. Sauvignon Blanc is used too, rarely at the lowest prices; its vigour gives high yields, but herbaceous notes can dominate unripe fruit.',
        'Grown in warm regions, so low acidity is common: acidification is one of the most frequent adjustments (flat, flabby Chardonnay otherwise).',
        'Protective handling throughout; SO₂ monitored. Destem, crush, press.',
        'Juice highly clarified, quickly (centrifuge or filter), to keep fruit.',
        'Stainless steel, cool fermentation, commercial yeast for a fast, reliable ferment.',
        'MLC usually blocked (chill + SO₂) and wine racked off the lees at once; a soft buttery Chardonnay may go through MLC.',
        'Oak flavour from chips or staves in steel, not barrels (cost and time).',
        'Often a little residual sugar (more often Chardonnay than Pinot Grigio): ferment dry, then add measured grape juice or RCGM.',
        'Stabilised, fined and sterile filtered; SO₂ topped up at bottling.',
      ],
      links: ['grape:chardonnay', 'grape:pinot-gris', 'grape:sauvignon-blanc'],
    },
    {
      heading: 'Premium aromatic varieties',
      points: [
        'Sauvignon Blanc, Riesling, Muscat, Gewurztraminer, Torrontés. Aim: keep and show the primary fruit and floral aromas.',
        'Crushed or whole bunch into the press, sometimes after a short skin contact. Juice cleaned gently (settling).',
        'Inert vessels so nothing masks the fruit: stainless steel (New Zealand Sauvignon Blanc and Riesling). Alsace Riesling may use large old oak (foudres): slight oxidation, more texture, no oak flavour.',
        'Cool, slow fermentation. Sauvignon Blanc fermented dry.',
        'Riesling from dry to luscious: stop the fermentation by chilling or SO₂ to keep sugar; with botrytised grapes it stops by itself.',
        'No MLC (SO₂ straight after fermentation): keeps the high acidity and avoids buttery notes clashing with the fruit.',
        'Bottled early; new oak avoided. Riesling may get lees contact, or up to a year in large old vats (Alsace, sometimes Germany).',
        'Rarely blended. Exception: Sauvignon Blanc with Semillon for more body (Bordeaux, Western Australia).',
        'Oaked Sauvignon Blanc (Pessac-Léognan, California Fumé Blanc): barrel fermentation, maybe ambient yeast, months on lees, MLC avoided, some new oak. Creamy and spicy.',
      ],
      causes: [
        { factor: 'Inert vessels and no MLC', effect: 'nothing added on top of the fruit', result: 'pure, pungent primary aromas and high acidity' },
        { factor: 'Stopping fermentation by chilling or SO₂', effect: 'yeast stops with sugar left', result: 'off-dry to sweet Riesling with low alcohol' },
      ],
      links: ['grape:sauvignon-blanc', 'grape:riesling', 'region:fr-bordeaux-pessac-leognan'],
    },
    {
      heading: 'Premium less-aromatic varieties',
      points: [
        'Chardonnay and Pinot Gris/Grigio are neutral, so the winemaker shapes the style: keep it pure, or build complexity and texture.',
        'Whole-bunch pressing is common for Chardonnay. Some let the juice take in a little oxygen, thought to help ageing (it would strip an aromatic variety).',
        'Gentle settling; some solids may be left for complexity and texture.',
        'Vessels: stainless steel or concrete for fresh fruit (Chablis, north-east Italian Pinot Grigio, New Zealand Pinot Gris); large old oak (Alsace Pinot Gris); small new barrels for toast and roundness (Côte d’Or Chardonnay).',
        'Pinot Gris with residual sugar: New Zealand stops the fermentation (chill or SO₂); in Alsace very ripe grapes may stop it naturally.',
        'Oak after fermentation: new barriques give toast; older and larger barrels give gentle oxidation and complexity without much flavour. Some new oak is usual for Chardonnay (not Chablis); Pinot Gris mostly older oak.',
        'MLC is used in almost all premium white Burgundy, Chablis included, to soften sharp acidity; avoided where fruit should lead.',
        'Long fine-lees contact and lees stirring for a richer, rounder texture.',
        'Usually not blended with other varieties.',
      ],
      causes: [
        { factor: 'Small new oak barrels', effect: 'toast and vanilla, slow oxygen', result: 'rounder, more complex wine that can age' },
        { factor: 'MLC in Chablis', effect: 'softens very high acidity', result: 'balanced wine without losing freshness' },
      ],
      links: ['grape:chardonnay', 'grape:pinot-gris', 'region:fr-burgundy-chablis'],
    },
  ],
  verified: false,
} satisfies Topic;
