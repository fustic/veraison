// Theory: Sherry. Condensed from the user's notes, in our own words.
// Check against the course book, then set verified: true.
import type { Topic } from '../../core/src/content.ts';

export default {
  id: 'topic:sherry',
  title: 'Sherry',
  chapter: 'Fortified wines',
  summary:
    'Sherry is defined by maturation: a neutral Palomino wine is fortified and aged in a solera, under flor (biological), exposed to air (oxidative) or both. Sweet styles come from sun-dried PX or Muscat, or from sweetening.',
  sections: [
    {
      heading: 'Climate and soil',
      points: [
        'Around Jerez de la Frontera: hot, sunny Mediterranean; coastal vineyards are a little cooler, refreshed by the humid westerly poniente. The hot, drying easterly levante can stress vines and damage grapes.',
        'Fairly high yearly rain for Spain, but little in the growing season.',
        'Albariza: very chalky, drains well, yet deep and able to store water through the dry summer. Pits dug between rows after harvest catch winter rain; in summer a hard crust limits evaporation.',
        'Proposed rule changes would allow unfortified wines in the Sherry styles, and maturation anywhere in the DO (Fino not in Sanlúcar).',
      ],
      causes: [{ factor: 'Albariza soil', effect: 'stores winter rain and crusts over in summer', result: 'vines survive the hot, dry growing season' }],
      links: ['region:es-jerez'],
    },
    {
      heading: 'Grapes',
      points: [
        'Palomino: most of the vineyard; low acidity, little varietal aroma, so style comes from ageing.',
        'Pedro Ximénez: little varietal flavour; thin skins suit sun-drying for sweet wines. Little grown in Jerez; most comes from Montilla-Moriles, which the rules allow.',
        'Muscat of Alexandria: small amounts, for sweet wines.',
      ],
      links: ['grape:palomino', 'grape:pedro-ximenez', 'grape:muscat', 'region:es-montilla-moriles'],
    },
    {
      heading: 'Dry styles: base wine, classification, fortification',
      points: [
        'Palomino rushed to the press to avoid oxidation; fermented in steel at 22–26 °C (warm for a white) for a neutral, dry base wine of about 11–12% abv. Flor starts to grow on all of it.',
        'First classification (autumn): paler, finer wines for biological ageing; darker, heavier ones for oxidative. Cooler coastal fruit and cooler ferments lean biological; warmer inland fruit and warmer ferments lean oxidative. Producers also classify to meet brand volumes.',
        'Fortified with 95% abv neutral spirit: to 15–15.5% for biological (ideal for flor), to 17% for oxidative (flor dies).',
        'Sobretabla: a few months’ rest before the solera. For biological wines, a second classification checks the flor; failures are refortified for oxidative ageing or rejected.',
      ],
      causes: [
        { factor: 'Fortifying to 15–15.5%', effect: 'flor can grow', result: 'biological ageing' },
        { factor: 'Fortifying to 17%', effect: 'flor dies', result: 'oxidative ageing' },
      ],
    },
    {
      heading: 'Naturally sweet styles',
      points: [
        'PX or Muscat grapes are sun-dried to concentrate sugar, adding raisin flavours.',
        'The juice is so sweet that yeast manage only a few degrees of alcohol; then fortified to 17% abv.',
      ],
      links: ['topic:sweet-winemaking'],
    },
    {
      heading: 'The solera system',
      points: [
        'Aged in old 600 L oak butts filled only five-sixths full: the oak lets oxygen in but gives no flavour.',
        'Traditional bodegas keep cool with thick white walls, high ceilings, windows to the poniente and damp earth floors; some use air conditioning.',
        'Levels of butts: criaderas, with the oldest level called the solera. Wine for bottling is drawn equally from each solera butt; the solera is topped up with a blend drawn equally from the first criadera, which is topped up from the second, and so on; the youngest is fed with sobretabla wine.',
        'Only an average age can be given. The output is the same every time, as long as good wine goes in and not too much is drawn off.',
        'Each criadera belongs to one solera system; levels are often kept in different buildings to spread risk.',
      ],
      causes: [{ factor: 'Fractional blending', effect: 'new wine takes on the character of older wine', result: 'consistent style, no vintage' }],
    },
    {
      heading: 'Flor and biological ageing',
      points: [
        'Flor is several yeast strains forming a thick layer; they consume alcohol and nutrients with oxygen from the air, producing CO₂ and acetaldehyde, the key flavour.',
        'Needs at most 15.5% abv, cool to moderate temperatures and high humidity: thrives in spring and autumn, dies back in summer and winter. Even a butt’s position can change the style.',
        'Flor protects the wine from oxygen. Frequent draws through the year feed it with nutrients; Finos lose freshness fast after bottling.',
        'Wines from these soleras rarely average over three or four years; by about seven years nutrients run low, flor fails and oxidative notes appear.',
      ],
      causes: [{ factor: 'Flor over the wine', effect: 'no oxygen; acetaldehyde produced', result: 'pale, dry, tangy, bready (Fino, Manzanilla)' }],
    },
    {
      heading: 'Oxidative ageing, blending and finishing',
      points: [
        'Oloroso, PX and some Muscat age oxidatively without flor; Amontillado does so after biological ageing. Young wine fed in stops the system over-oxidising.',
        'Can age 30 years or more; as water evaporates, alcohol rises towards 22%.',
        'Most Sherries, including many of the best, blend several solera systems (e.g. very old, intense Oloroso freshened with younger wine).',
        'Usually fined and filtered, but the trend is to do less, especially for biological wines.',
      ],
    },
    {
      heading: 'Styles',
      points: [
        'Fino and Manzanilla: biological only; pale lemon; citrus, almond, herbs and bread from flor; drink fresh.',
        'Manzanilla de Sanlúcar de Barrameda is its own DO: made like Fino, but the cool, humid coast keeps flor thick all year, so it is tangier (Manzanilla fina). En rama is to mean not fined or cold-stabilised (filtration allowed).',
        'Oloroso: oxidative only; brown, full-bodied, toffee, leather, spice, walnut; very old ones are concentrated and astringent unless blended.',
        'Amontillado: biological then oxidative; refortified to 17% when flor dies; amber to brown, lighter than Oloroso, yeast and oxidative notes together.',
        'Palo Cortado: rare; Amontillado’s aroma with Oloroso’s body; made in various ways; almost always very high quality.',
        'PX: deep brown, luscious (often about 500 g/L sugar), dried fruit, coffee, liquorice. Muscat: similar, with dried citrus peel.',
        'Pale Cream: briefly biological, sweetened (often with RCGM); looks like Fino. Medium and Cream: any mix of biological and oxidative character; Cream is sweeter. Premium ones are sweetened with PX.',
        'Amontillado, Oloroso and Palo Cortado must be dry.',
      ],
      links: ['region:es-jerez-sanlucar', 'grape:palomino', 'grape:pedro-ximenez'],
    },
    {
      heading: 'Age-indicated Sherry',
      points: [
        'VORS (Very Old Rare Sherry): average age at least 30 years. VOS (Very Old Sherry): at least 20 years. Each batch is tested.',
        '12 Years Old and 15 Years Old apply to a whole solera system, so are used more flexibly.',
      ],
    },
  ],
  verified: false,
} satisfies Topic;
