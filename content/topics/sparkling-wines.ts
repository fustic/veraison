// Theory: sparkling wines of the world. Condensed from the user's notes, in our own words.
// Check against the course book, then set verified: true.
import type { Topic } from '../../core/src/content.ts';

export default {
  id: 'topic:sparkling-wines',
  title: 'Sparkling wines of the world',
  chapter: 'Sparkling wines',
  summary:
    'Champagne sets the benchmark that most premium sparkling copies. Crémant, Saumur, Vouvray and Cava use the same method with less lees time; Asti, Prosecco and Sekt show fresher tank styles; the New World picks cool sites.',
  sections: [
    {
      heading: 'Champagne: place and grapes',
      points: [
        'One appellation. Villages, not vineyards, carry cru status: 17 grand cru and 44 premier cru, with no stricter rules such as lower yields.',
        'Five main sub-regions: Montagne de Reims, Vallée de la Marne, Côte des Blancs (near Reims and Épernay), Côte de Sézanne (about 30 km south-west of Épernay), Côte des Bar (over 100 km south-east).',
        'Cool continental: winter freeze, spring frost, rain and cloud; even in hot years sugar stays low and acid high. Vineyards on slopes to reduce frost; chalk drains yet holds water.',
        'Chardonnay (Côte des Blancs, Sézanne): light, high-acid, floral, citrus. Pinot Noir (Montagne de Reims, Côte des Bar): body and backbone. Meunier (Vallée de la Marne): buds late, avoiding frost; fruity, for young-drinking wines.',
      ],
      causes: [{ factor: 'Cool continental climate on chalk', effect: 'low sugar, high acid even in warm years', result: 'ideal base wine' }],
      links: ['region:fr-champagne', 'region:fr-champagne-cote-des-blancs', 'region:fr-champagne-montagne-de-reims', 'region:fr-champagne-vallee-de-la-marne', 'region:fr-champagne-cote-de-sezanne', 'region:fr-champagne-cote-des-bar', 'grape:pinot-meunier'],
    },
    {
      heading: 'Champagne: making and styles',
      points: [
        'Traditional method; hand-picking compulsory. The first pressing (cuvée) is the purest juice, the rest is the taille; the best wines use only the cuvée.',
        'Steel or oak, MLC or not, brief oak or inert vessels: all house style. Big houses blend dozens of wines from small parcels.',
        'Non-vintage: at least 15 months before release, 12 on lees. Vintage: at least 36 months, 12 on lees. Most age far longer.',
        'Non-vintage: lighter, fresher fruit; the best gain complexity from reserve wines. Vintage: best years, more concentrated, more toast and biscuit.',
        'Rosé (NV or vintage) balances autolysis with red berries. Blanc de Blancs: light to medium, citrus, austere young, long-lived. Blanc de Noirs: fuller, ages faster.',
        'Prestige cuvées: often vintage, best parcels, closed when young, premium prices. Brut is by far the main style; Brut Nature is rising but small.',
      ],
      links: ['grape:chardonnay', 'grape:pinot-noir', 'topic:sparkling-winemaking'],
    },
    {
      heading: 'Crémant, Saumur and Vouvray',
      points: [
        'Crémant: traditional-method French appellations, chiefly Crémant d’Alsace, de Bourgogne and de Loire; at least 9 months on lees; usually the region’s still-white grapes (in Alsace no Muscat or Gewurztraminer, but Chardonnay is allowed).',
        'The Loire is France’s second sparkling centre. Saumur: Chenin Blanc, Chardonnay and Cabernet Franc in the best wines; rosé from Cabernet Franc. Vouvray: more sparkling than still, nearly all Chenin.',
        'Chenin’s high acidity suits sparkling; its autolytic notes lean smoky and toasty rather than bready. Both appellations: traditional method, at least 9 months on lees.',
      ],
      links: ['region:fr-alsace', 'region:fr-burgundy', 'region:fr-loire-saumur', 'region:fr-loire-vouvray', 'grape:chenin-blanc'],
    },
    {
      heading: 'Cava',
      points: [
        'A DO of several separate areas across Spain, but mostly Catalonia around Sant Sadurní d’Anoia; also parts of Navarra, Rioja and Valencia.',
        'Traditional method. Ageing on lees: Cava de Guarda at least 9 months; Reserva at least 18; Gran Reserva at least 30.',
        'Whites from Macabeo, Xarel·lo and Parellada; rosés from Garnacha and Monastrell. Chardonnay and Pinot Noir are now allowed (more fruit and acid), which divides opinion.',
        'Usually dry, medium acidity, some autolytic character (not the bread and toast of Champagne); mostly non-vintage and ready on release, a few long-aged premium wines.',
      ],
      links: ['region:es-penedes', 'region:es-catalunya', 'grape:viura', 'grape:xarello', 'grape:parellada'],
    },
    {
      heading: 'Asti and Prosecco',
      points: [
        'Asti DOCG (Piemonte): Muscat Blanc à Petits Grains by the Asti method; peach, grape and flowers; always sweet, about 7% abv, no autolysis; drink as young as possible.',
        'Prosecco DOC (wide area of Veneto and Friuli) and the finer Conegliano Valdobbiadene DOCG on steep limestone hills; Rive and Cartizze mark exceptional sites.',
        'The grape was renamed Glera so that Prosecco names a protected place.',
        'Tank method: medium acid, green apple and melon; Brut, Extra Dry and Dry, usually a little sweeter than Champagne or Cava (fermentation stopped by chilling and filtering). Drink young.',
        'Since 2020, Prosecco DOC rosé: Glera with up to 15% Pinot Noir.',
      ],
      links: ['region:it-piemonte-asti', 'region:it-veneto-prosecco', 'grape:glera', 'grape:muscat'],
    },
    {
      heading: 'Sekt',
      points: [
        'Germany has the world’s highest per-capita sparkling consumption, mostly Sekt, nearly all tank method, often from imported base wine.',
        'Deutscher Sekt: German grapes only; the best from Riesling. Deutscher Sekt bA: all grapes from one quality region (e.g. Mosel).',
        'Top estates make small amounts of single-vineyard traditional-method Sekt.',
      ],
      links: ['region:de', 'region:de-mosel', 'grape:riesling'],
    },
    {
      heading: 'New World',
      points: [
        'Australia: elegant traditional-method Chardonnay and Pinot from Yarra, Adelaide Hills and Tasmania; cheap tank or carbonated fizz from warm Riverina. Sparkling red (mostly Shiraz): full, red berries, smooth tannin, some sweetness; declining sales.',
        'New Zealand: fine traditional-method wines from slow-ripened Chardonnay and Pinot; Marlborough leads in volume; richer North Island fruit often blended with the South. Sparkling Sauvignon Blanc by carbonation or tank.',
        'South Africa: Cap Classique (Méthode Cap Classique is the process), at least 12 months on lees; best from Chardonnay and Pinot on south-east-facing slopes or near the coast. Big market for sweeter carbonated wines.',
        'USA: mostly California; premium traditional-method Pinot and Chardonnay from Carneros and Anderson Valley with long lees ageing; cheap tank or carbonated wines from the Central Valley.',
      ],
      links: ['region:au-tasmania', 'region:au-yarra-valley', 'region:au-riverina', 'region:nz-marlborough', 'region:za', 'region:us-los-carneros', 'region:us-anderson-valley'],
    },
    {
      heading: 'Franciacorta and England',
      points: [
        'Franciacorta: traditional method in Lombardy; riper and rounder than Champagne; Satèn is a softer, lower-pressure style.',
        'England: chalk soils and a cool climate close to Champagne’s; high-acid traditional-method wines from the three Champagne grapes.',
      ],
      links: ['region:it-franciacorta', 'region:gb-england'],
    },
  ],
  verified: false,
} satisfies Topic;
