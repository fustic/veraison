// Study notes: French wine law, classifications and hierarchies. Condensed from the user's
// France notes, in our own words. Check against the course book, then set verified: true.
import type { Topic } from '../../core/src/content.ts';

export default {
  id: 'topic:france-classifications',
  title: 'France: wine law and classifications',
  chapter: 'France',
  summary:
    'Three national categories, then each region’s own ladder. Bordeaux ranks estates (châteaux), Burgundy ranks vineyards, and Alsace, Beaujolais and the Rhône have simple tiers of their own.',
  sections: [
    {
      heading: 'National categories',
      points: [
        'PDO: Appellation d’origine protégée (AOP), usually still written Appellation d’origine contrôlée (AC / AOC) on labels.',
        'PGI: Indication géographique protégée (IGP); the old term Vin de Pays (VdP) is still seen.',
        'No GI: Vin de France.',
        'One plot can belong to a generic and a more prestigious appellation. Producers register each year which one they will use, so a weak vintage can be sold under the lesser name.',
      ],
      links: ['region:fr', 'topic:wine-law-and-labelling'],
    },
    {
      heading: 'Bordeaux: the appellations',
      points: [
        'Over 50 appellations, from generic Bordeaux to small communes. They do not form a quality ladder like Burgundy’s, so group them by style.',
        'Generic: Bordeaux and Bordeaux Supérieur (stricter rules, higher minimum alcohol) for reds; Bordeaux for whites; Bordeaux Rosé and Clairet (longer maceration, deeper, fuller).',
        'Left Bank (west and south of the Gironde and Garonne): Médoc, Haut-Médoc and its communes, Graves, Pessac-Léognan, Sauternes.',
        'Between the rivers: Entre-Deux-Mers (white only). Right Bank: Saint-Émilion, Pomerol and their satellites, and the Côtes de Bordeaux group.',
        'Top Médoc estates make dry whites that can only be sold as Bordeaux.',
      ],
      causes: [{ factor: 'Leading châteaux make second and third wines', effect: 'weaker vats are kept out of the grand vin', result: 'consistent top wine; surplus may go to négociants' }],
      links: ['region:fr-bordeaux', 'region:fr-bordeaux-haut-medoc', 'region:fr-bordeaux-saint-emilion', 'region:fr-bordeaux-cotes-de-bordeaux'],
    },
    {
      heading: 'Bordeaux: the classifications',
      points: [
        'They rank estates, not vineyards, and (except in Saint-Émilion) sit outside the appellation system. An estate can buy or sell land, so a château name is more a brand than a plot.',
        '1855 Classification (made for the Paris Exhibition): Médoc reds in five ranks; first growths Lafite Rothschild, Latour, Margaux, Mouton Rothschild, plus Haut-Brion from Graves. Sauternes in three ranks, with Yquem alone at the top.',
        'Almost unchanged since 1855, so how well it reflects quality today is debated. Classified estates are crus classés.',
        'Cru Bourgeois (Médoc): three tiers, Cru Bourgeois, Supérieur and Exceptionnel; reviewed every five years.',
        'Graves: separate red and white lists with no ranking: all are simply crus classés. All now lie in Pessac-Léognan, created after the list was drawn up.',
        'Saint-Émilion: built into the appellations. Saint-Émilion Grand Cru is an appellation; within it, Grand Cru Classé, then Premier Grand Cru Classé B and A. Reviewed about every ten years, with promotion and demotion.',
      ],
      causes: [{ factor: 'Classification by estate, not vineyard', effect: 'the land behind a name can change', result: 'reputation follows the château, not the plot' }],
      links: ['region:fr-bordeaux-pauillac', 'region:fr-bordeaux-margaux', 'region:fr-bordeaux-pessac-leognan', 'region:fr-bordeaux-sauternes', 'region:fr-bordeaux-saint-emilion'],
    },
    {
      heading: 'Burgundy: the hierarchy',
      points: [
        'Regional (about half of production): Bourgogne Rouge and Blanc from anywhere; narrower regional names such as Bourgogne Hautes Côtes de Nuits / de Beaune, Bourgogne Côte d’Or, Bourgogne Côte Chalonnaise; Mâcon and Mâcon-Villages.',
        'Some regional wine is declassified from better appellations because of high yields or a producer’s choice.',
        'Commune or village (about a third): e.g. Chablis, Gevrey-Chambertin. A non-classified single vineyard may be named after the village.',
        'Premier cru (over 600 vineyards, about a tenth): label says Premier Cru plus the vineyard, or no vineyard if several are blended from one village.',
        'Grand cru (33: 32 in the Côte d’Or, one in Chablis split into seven climats; just over 1%): only the vineyard name appears, with Grand Cru.',
        'Most vineyards have several owners; one with a single owner is a monopole.',
        'Gamay may be used in some regional wines; reds at village level and above must be Pinot Noir.',
      ],
      causes: [{ factor: 'Mid-slope sites', effect: 'better drainage, sun and less frost', result: 'they hold the premier and grand cru vineyards' }],
      links: ['region:fr-burgundy', 'region:fr-burgundy-cote-d-or', 'region:fr-burgundy-chablis'],
    },
    {
      heading: 'Beaujolais and the Rhône',
      points: [
        'Beaujolais: Beaujolais (southern plain), Beaujolais-Villages (39 villages on the northern granite hills, usually blended, village names rarely shown), then ten crus, each its own appellation.',
        'Beaujolais Nouveau: Beaujolais or Beaujolais-Villages only; released on the third Thursday of November, not sold by producers after 31 August of the next year. Crus may not be sold as Nouveau.',
        'Rhône: Côtes du Rhône (over half of the south’s appellation wine), Côtes du Rhône Villages (lower yields, higher minimum alcohol, more Grenache, Syrah and Mourvèdre), Villages plus a village name (100% from that village; e.g. Séguret), then the crus.',
        'Named villages can apply to become crus, as Gigondas and Vacqueyras did.',
      ],
      links: ['region:fr-beaujolais', 'region:fr-rhone', 'region:fr-rhone-southern'],
    },
    {
      heading: 'Alsace and the Loire',
      points: [
        'Alsace: two appellations for still wine, Alsace and Alsace Grand Cru. A named grape means 100% of it.',
        'Alsace Grand Cru: over 50 vineyards, usually one noble grape (Riesling, Gewurztraminer, Pinot Gris, Muscat); vineyard, vintage and grape on the label. Some boundaries are thought too wide, so some top producers ignore the term.',
        'Vendanges Tardives (late harvest, dry to medium-sweet) and Sélection de Grains Nobles (higher sugar, usually noble rot, sweet): noble grapes only, minimum ripeness by variety.',
        'Since the 2021 harvest the back label must state sweetness: sec, demi-sec, moelleux or doux. Terms like Réserve personnelle have no legal meaning. Blends are Edelzwicker or Gentil.',
        'Loire: no region-wide appellation; IGP Val de Loire covers it. Four sub-regions (Nantais, Anjou-Saumur, Touraine, Central Vineyards) are not appellations.',
      ],
      links: ['region:fr-alsace', 'region:fr-loire'],
    },
  ],
  verified: false,
} satisfies Topic;
