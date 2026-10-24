// Theory: making sparkling wine. Condensed from the user's notes, in our own words.
// Check against the course book, then set verified: true.
import type { Topic } from '../../core/src/content.ts';

export default {
  id: 'topic:sparkling-winemaking',
  title: 'Sparkling winemaking',
  chapter: 'Sparkling wines',
  summary:
    'Cool-climate grapes with low sugar, high acid and ripe flavours make a neutral base wine. Six methods add the bubbles; where the CO₂ is trapped and how long the wine sits on its lees decide whether it tastes of fruit or of toast.',
  sections: [
    {
      heading: 'The vineyard',
      points: [
        'The second fermentation adds about 1.2–1.3% abv, so the dry base wine is aimed at 10–11% abv: grapes need relatively low sugar.',
        'Most styles want high acidity for freshness, yet the flavours must be ripe, with no green, herbaceous notes.',
        'In cool regions sugar, acid and flavour change slowly and together. In warm regions sugar rises and acid falls fast, so early picking risks green flavours.',
        'A cool enough climate is the foundation of premium sparkling wine.',
      ],
      causes: [{ factor: 'Cool climate', effect: 'sugar, acid and flavour ripen slowly in step', result: 'low-sugar, high-acid grapes with ripe flavour' }],
    },
    {
      heading: 'Harvest and pressing',
      points: [
        'The best grapes are hand-picked as whole, unsplit bunches; in warm regions making cheap fizz, machines pick fast before acidity is lost.',
        'Pressed as soon as possible and gently, ideally whole bunches without crushing, to keep tannin and colour out (vital for black grapes in white sparkling).',
        'Most EU regions limit press pressure and how much juice may be extracted.',
      ],
    },
    {
      heading: 'Traditional method: base wine and blending',
      points: [
        'First fermentation usually in temperature-controlled stainless steel, sometimes oak; the base wine is dry, neutral and high in acid. MLC and oak are house-style choices.',
        'Most base wine is used the following year; some is kept back as reserve wine.',
        'Blending keeps a house style despite vintage variation, balances the wine (Chardonnay: citrus, finesse, longevity; Pinot Noir: body) and adds complexity (old reserve wines give dried fruit; oaked wines give texture and spice).',
        'Grapes are fermented in many small parcels to give the blender more options.',
      ],
      causes: [{ factor: 'Many parcels and reserve wines', effect: 'more blending options', result: 'consistent non-vintage house style and more complexity' }],
    },
    {
      heading: 'Traditional method: second fermentation and lees',
      points: [
        'Liqueur de tirage (wine, sugar, yeast, nutrients, clarifying agent) is added; the bottle is closed with a crown cap holding a plastic cup (bidule) and laid down in a cool cellar.',
        'A slow second fermentation adds about 1.2–1.3% abv; the CO₂ dissolves, creating 5–6 atmospheres of pressure.',
        'The dead yeast (lees) break down over months: yeast autolysis gives bread, biscuit and toast. It is most active in the first four to five years; longer on lees means more yeast character.',
        'Once autolysis is complete, lees contact can keep the wine fresh for years, though most wines are disgorged before then.',
      ],
      causes: [{ factor: 'Months to years on the lees in bottle', effect: 'yeast autolysis', result: 'bread, biscuit and toast' }],
    },
    {
      heading: 'Traditional method: riddling, disgorgement, dosage',
      points: [
        'Riddling moves the bottle from horizontal to upside-down so the lees slide into the cap. By hand on A-frame pupitres it took up to eight weeks; a gyropalette (500 bottles) does it in days.',
        'Disgorgement: the neck is frozen, the cap removed, and the pressure shoots out the frozen plug with the lees; fully mechanised, seconds long, so little pressure or oxygen is lost.',
        'Liqueur d’expédition (wine and sugar, the dosage) tops up the bottle and sets the sweetness; without sugar the wine is Brut Nature or Zéro dosage. The wine in it (fresh, oaked or aged) is a second blending step.',
        'Sealed with a cork (about three times the neck’s area before compression, mushroom-shaped after) and a wire cage, then rested a few months so the dosage integrates.',
        'Most sparkling is non-vintage, so its age is hard to know; some producers now print the disgorgement date.',
      ],
    },
    {
      heading: 'Transfer method',
      points: [
        'Same as the traditional method up to riddling; then all bottles are emptied into a pressurised tank, filtered, dosed and rebottled.',
        'Avoids costly riddling and disgorgement; good quality at a lower price and consistent large batches.',
        'Often labelled “bottle-fermented”, whereas traditional-method wines proudly say “traditional method” or méthode traditionnelle.',
      ],
    },
    {
      heading: 'Tank method',
      points: [
        'Base wine fermented cool in stainless steel, usually without MLC or oak, to keep pure fruit and floral notes.',
        'Yeast, sugar, nutrients and clarifying agents are added and the second fermentation happens in a sealed pressure tank; the wine is filtered and bottled under pressure.',
        'Little time on lees, so usually no autolytic notes (paddles stirring the lees can add some).',
        'Cheaper, faster and less labour-intensive; ideal for aromatic grapes (Muscat, Riesling) and fruity styles such as Prosecco. High quality is possible with good grapes.',
      ],
      causes: [{ factor: 'Second fermentation in tank, short lees contact', effect: 'little autolysis', result: 'fresh, fruity, floral sparkling (Prosecco, Sekt)' }],
      links: ['region:it-veneto-prosecco', 'grape:glera'],
    },
    {
      heading: 'Ancestral method, Asti method, carbonation',
      points: [
        'Ancestral (Pétillant naturel, Pét-Nat): a single fermentation; the wine is bottled part-way through and the CO₂ is trapped. May not be disgorged, so can be cloudy with sediment. Dry to off-dry, low to medium alcohol, varying fizz; sold young.',
        'Asti method: one fermentation. Chilled juice is warmed and fermented in pressure tanks, at first letting CO₂ escape, then sealed; stopped by chilling at about 7% abv and 4–5 atmospheres, filtered under pressure and bottled for immediate sale.',
        'Carbonation: CO₂ injected into still wine, bottled under pressure. Keeps strong varietal flavours (e.g. Sauvignon Blanc). The cheapest method.',
      ],
      links: ['region:it-piemonte-asti', 'grape:muscat', 'grape:sauvignon-blanc'],
    },
    {
      heading: 'Styles and terms',
      points: [
        'EU sweetness terms (each a range, so house styles differ): Brut Nature 0–3 g/L; Extra Brut 0–6; Brut 0–12; Extra Dry 12–17; Sec 17–32; Demi-Sec 32–50; Doux over 50. Extra Dry is sweeter than Brut.',
        'Non-vintage: grapes from several years; the producer’s standard wine and house style (not a legal term).',
        'Vintage: in Champagne a single year, made only in the best years; elsewhere small amounts of other years may be allowed and it may be less special.',
        'Rosé: by blending red and white base wines or by short maceration; dosage can adjust colour. Some appellations allow maceration only.',
        'Blanc de Blancs: white grapes only. Blanc de Noirs: white wine from black grapes only. Prestige Cuvée: a producer’s best wine (not a legal term).',
      ],
    },
  ],
  verified: false,
} satisfies Topic;
