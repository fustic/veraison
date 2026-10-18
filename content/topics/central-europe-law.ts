// Study notes: wine law and styles in Germany, Austria, Tokaj and Greece. Condensed from the
// user's notes, in our own words. Check against the course book, then set verified: true.
import type { Topic } from '../../core/src/content.ts';

export default {
  id: 'topic:central-europe-law',
  title: 'Germany, Austria, Tokaj, Greece: labels and styles',
  chapter: 'Germany, Austria, Hungary, Greece',
  summary:
    'Germany and Austria grade wine by grape sugar at harvest (Prädikat) and by origin; Austria adds DACs for regional typicity. Tokaj defines its sweet styles by residual sugar; Greece follows the EU PDO/PGI model.',
  sections: [
    {
      heading: 'Germany: categories',
      points: [
        'Deutscher Wein (no GI), Landwein (PGI), Qualitätswein (PDO). Almost all German wine is PDO.',
        'Qualitätswein must come from one of 13 winegrowing areas (Anbaugebiete), named on the label. Dry wines of every colour and quality level are often just Qualitätswein.',
        'Prädikatswein is a step within Qualitätswein: higher minimum must weight, six levels. In rising order: Kabinett, Spätlese, Auslese, Beerenauslese, Eiswein, Trockenbeerenauslese.',
        'Kabinett and Spätlese: dry to medium-sweet; Auslese: dry to sweet; BA, Eiswein, TBA: sweet only. Think of the levels as styles.',
      ],
      causes: [{ factor: 'Classification by must weight', effect: 'pickers pass through the vineyard several times', result: 'several Prädikat levels from one site in one year' }],
      links: ['region:de', 'grape:riesling'],
    },
    {
      heading: 'Germany: sweetness and origin on the label',
      points: [
        'trocken = dry; halbtrocken = off-dry to medium; feinherb is used instead by some but has no legal definition. Often sweetness has to be guessed from the category or the alcohol.',
        'Since 2021 (five-year transition): winegrowing area → Region (the word Region on the label) → village → single vineyard, e.g. Piesport (village) vs Piesporter Goldtröpfchen (vineyard).',
        'Before this, some wide areas could be named like single vineyards, which confused buyers.',
        'Single vineyards can also be Erstes Gewächs or Grosses Gewächs: always dry, stricter rules (strictest for Grosses Gewächs).',
      ],
    },
    {
      heading: 'Germany: the VDP',
      points: [
        'A growers’ association with its own vineyard classification covering most of Germany’s best sites and strict rules; an eagle on the capsule.',
        'VDP.Erste Lage and VDP.Grosse Lage (best sites); a dry wine from a Grosse Lage is VDP.Grosses Gewächs, marked GG with a grape bunch on the bottle neck.',
        'VDP.Grosses Gewächs is a VDP trademark, not part of German law, but these are seen as Germany’s best dry wines. Permitted grapes vary by region.',
      ],
      links: ['region:de-rheingau', 'region:de-pfalz', 'region:de-mosel'],
    },
    {
      heading: 'Austria',
      points: [
        'Wein (no GI), Landwein (PGI), Qualitätswein (PDO): almost all Austrian wine is PDO.',
        'Qualitätswein from a generic region (Niederösterreich, Burgenland, Steiermark, Wien) or a specified region: 40 permitted grapes, any style.',
        'DAC (Districtus Austriae Controllatus, since 2002): growers agree on grapes and styles that typify their area; only wines in that style may use the DAC name. Others are labelled with the generic region. Village or single-vineyard names may appear within a DAC.',
        'Most specified regions are now DACs, e.g. Weinviertel (Grüner Veltliner, Klassik or Reserve), Wachau, Kamptal, Kremstal, Neusiedlersee (Zweigelt), Leithaberg and Mittelburgenland (Blaufränkisch), Ruster Ausbruch (sweet, TBA level).',
        'Prädikat levels work as in Germany but are mostly for medium-sweet and sweet wines; Austria adds Strohwein / Schilfwein (grapes dried on straw or reeds over winter).',
      ],
      causes: [{ factor: 'DAC rules tie a name to a style', effect: 'one recognisable wine per area', result: 'regional typicity for buyers' }],
      links: ['region:at', 'region:at-weinviertel', 'region:at-neusiedlersee'],
    },
    {
      heading: 'Tokaj: styles and rules',
      points: [
        'Dry wines (usually Furmint), 75 cl bottles; sweet wines traditionally in 50 cl bottles.',
        'Szamorodni ("as it comes"): partly botrytised bunches, dry (száraz) or sweet (édes); at least six months in cask, released from January of the second year. Dry ones age under a flor-like yeast in part-filled casks: Fino-like.',
        'Tokaji Aszú: aszú berries macerated 12–60 hours in base wine or must (whole berries avoid bitterness), pressed, then at least 18 months in oak. More berries, more sweetness.',
        'Since 2013: 5 puttonyos = at least 120 g/L sugar (the minimum for Aszú), 6 puttonyos = at least 150 g/L; 3 or 4 puttonyos may still appear but must also reach 120 g/L.',
        'Eszencia: only the free-run juice of aszú berries, at least 450 g/L sugar; ferments for years to under about 5% abv; lives a century.',
        'Modern Late Harvest: grapes left long on the vine, botrytised or not, fermented like Sauternes rather than macerated; shorter ageing.',
      ],
      links: ['region:hu-tokaj', 'grape:furmint', 'topic:sweet-winemaking'],
    },
    {
      heading: 'Greece',
      points: [
        'EU system: PDO and PGI. Dry PDO wines may say Protected Designation of Origin or, less often, Appellation d’origine de qualité supérieure; at home, Prostatevomeni Onomasia Proelefsis.',
        'Three PDOs lead exports, each tied to one grape: Naoussa (Xinomavro), Nemea (Agiorgitiko), Santorini (Assyrtiko).',
      ],
      links: ['region:gr-naoussa', 'region:gr-nemea', 'region:gr-santorini'],
    },
  ],
  verified: false,
} satisfies Topic;
