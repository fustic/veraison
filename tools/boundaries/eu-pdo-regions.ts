// Which EU wine PDO outlines (Candiago et al. 2022, EU_PDO.gpkg) make up each study region.
// A region that is itself a PDO lists one name; a district that is not (Côte de Nuits) lists
// the PDOs inside it, and their outlines are combined. Names are matched ignoring accents,
// case and punctuation; `npm run map:boundaries -- --list fr` prints every French name.

export const PDO_FOR_REGION: Record<string, string[]> = {
  // Bordeaux
  'region:fr-bordeaux': ['Bordeaux'],
  'region:fr-bordeaux-medoc': ['Médoc'],
  'region:fr-bordeaux-haut-medoc': ['Haut-Médoc'],
  'region:fr-bordeaux-saint-estephe': ['Saint-Estèphe'],
  'region:fr-bordeaux-pauillac': ['Pauillac'],
  'region:fr-bordeaux-saint-julien': ['Saint-Julien'],
  'region:fr-bordeaux-margaux': ['Margaux'],
  'region:fr-bordeaux-graves': ['Graves'],
  'region:fr-bordeaux-pessac-leognan': ['Pessac-Léognan'],
  'region:fr-bordeaux-sauternes': ['Sauternes'],
  'region:fr-bordeaux-barsac': ['Barsac'],
  'region:fr-bordeaux-entre-deux-mers': ['Entre-deux-Mers'],
  'region:fr-bordeaux-saint-emilion': ['Saint-Émilion'],
  'region:fr-bordeaux-pomerol': ['Pomerol'],

  // Burgundy (the regional Bourgogne PDO also spreads into Beaujolais, so use its parts;
  // the Hautes-Côtes are named areas inside that regional PDO, with no outline of their own)
  'region:fr-burgundy': [
    'Chablis', 'Petit Chablis', 'Irancy',
    'Côte de Nuits-Villages', 'Côte de Beaune',
    'Marsannay', 'Fixin', 'Gevrey-Chambertin', 'Morey-Saint-Denis', 'Chambolle-Musigny', 'Vougeot', 'Vosne-Romanée', 'Nuits-Saint-Georges',
    'Ladoix', 'Aloxe-Corton', 'Pernand-Vergelesses', 'Savigny-lès-Beaune', 'Chorey-lès-Beaune', 'Beaune', 'Pommard', 'Volnay', 'Monthélie',
    'Auxey-Duresses', 'Saint-Romain', 'Meursault', 'Puligny-Montrachet', 'Chassagne-Montrachet', 'Saint-Aubin', 'Santenay', 'Maranges',
    'Rully', 'Mercurey', 'Givry', 'Montagny', 'Mâcon', 'Pouilly-Fuissé', 'Saint-Véran', 'Viré-Clessé',
  ],
  'region:fr-burgundy-chablis': ['Chablis'],
  'region:fr-burgundy-cote-de-nuits': [
    'Côte de Nuits-Villages', 'Marsannay', 'Fixin', 'Gevrey-Chambertin', 'Morey-Saint-Denis', 'Chambolle-Musigny', 'Vougeot', 'Vosne-Romanée', 'Nuits-Saint-Georges',
  ],
  'region:fr-burgundy-gevrey-chambertin': ['Gevrey-Chambertin'],
  'region:fr-burgundy-vougeot': ['Vougeot'],
  'region:fr-burgundy-vosne-romanee': ['Vosne-Romanée'],
  'region:fr-burgundy-nuits-saint-georges': ['Nuits-Saint-Georges'],
  'region:fr-burgundy-cote-de-beaune': [
    'Ladoix', 'Aloxe-Corton', 'Pernand-Vergelesses', 'Savigny-lès-Beaune', 'Chorey-lès-Beaune', 'Beaune', 'Pommard', 'Volnay', 'Monthélie',
    'Auxey-Duresses', 'Saint-Romain', 'Meursault', 'Puligny-Montrachet', 'Chassagne-Montrachet', 'Saint-Aubin', 'Santenay', 'Maranges',
  ],
  'region:fr-burgundy-beaune': ['Beaune'],
  'region:fr-burgundy-pommard': ['Pommard'],
  'region:fr-burgundy-volnay': ['Volnay'],
  'region:fr-burgundy-meursault': ['Meursault'],
  'region:fr-burgundy-puligny-montrachet': ['Puligny-Montrachet'],
  'region:fr-burgundy-chassagne-montrachet': ['Chassagne-Montrachet'],

  // Beaujolais
  'region:fr-beaujolais': ['Beaujolais'],
  'region:fr-beaujolais-morgon': ['Morgon'],
  'region:fr-beaujolais-fleurie': ['Fleurie'],
  'region:fr-beaujolais-moulin-a-vent': ['Moulin-à-Vent'],

  // Loire
  'region:fr-loire': [
    'Muscadet', 'Muscadet Sèvre et Maine', 'Anjou', 'Savennières', 'Saumur', 'Saumur-Champigny', 'Touraine', 'Chinon', 'Bourgueil', 'Vouvray',
    'Montlouis-sur-Loire', 'Sancerre', 'Pouilly-Fumé', 'Menetou-Salon', 'Quincy', 'Reuilly',
  ],
  'region:fr-loire-sancerre': ['Sancerre'],

  // Mâconnais
  'region:fr-burgundy-maconnais': ['Mâcon', 'Pouilly-Fuissé', 'Pouilly-Loché', 'Pouilly-Vinzelles', 'Saint-Véran', 'Viré-Clessé'],

  // Rhône (the north is the named crus; the south is the Villages area plus its crus)
  'region:fr-rhone': [
    'Côtes du Rhône', 'Côtes du Rhône Villages', 'Côte Rôtie', 'Condrieu', 'Château-Grillet', 'Saint-Joseph', 'Hermitage', 'Crozes-Hermitage', 'Cornas',
    'Châteauneuf-du-Pape', 'Gigondas', 'Vacqueyras', 'Rasteau', 'Tavel', 'Lirac',
  ],
  'region:fr-rhone-northern': ['Côte Rôtie', 'Condrieu', 'Château-Grillet', 'Saint-Joseph', 'Hermitage', 'Crozes-Hermitage', 'Cornas'],
  'region:fr-rhone-cote-rotie': ['Côte Rôtie'],
  'region:fr-rhone-hermitage': ['Hermitage'],
  'region:fr-rhone-southern': ['Côtes du Rhône Villages', 'Châteauneuf-du-Pape', 'Gigondas', 'Vacqueyras', 'Rasteau', 'Tavel', 'Lirac'],
  'region:fr-rhone-chateauneuf-du-pape': ['Châteauneuf-du-Pape'],

  // South and east
  'region:fr-languedoc': ['Languedoc'],
  'region:fr-alsace': ['Alsace'],

  // Italy (Veneto has no single PDO for the whole region, so use its main ones)
  'region:it-veneto': ['Soave', 'Valpolicella', 'Bardolino', 'Piave', 'Lison-Pramaggiore', 'Conegliano Valdobbiadene - Prosecco', 'Colli Asolani - Prosecco', 'Venezia'],
  'region:it-alto-adige': ['Alto Adige'],

  // Spain
  'region:es-rioja': ['Rioja'],
  'region:es-priorat': ['Priorat'],

  // Germany
  'region:de-baden': ['Baden'],

  // Names that differ from ours
  'region:it-sicily': ['Sicilia'],
  // Regions with no region-wide PDO: their main PDOs combined.
  'region:it-puglia': ['Aleatico di Puglia', 'Castel del Monte', 'Gioia del Colle', 'Colline Joniche Tarantine', 'Primitivo di Manduria', 'Salice Salentino', 'Brindisi'],
  'region:it-umbria': ['Orvieto', 'Montefalco', 'Torgiano', 'Todi', 'Assisi', 'Amelia', 'Colli del Trasimeno'],
  'region:it-basilicata': ['Aglianico del Vulture', 'Matera', 'Grottino di Roccanova', 'Terre dell\'Alta Val d\'Agri'],
  'region:it-sardinia': ['Cannonau di Sardegna', 'Vermentino di Sardegna'],
  'region:pt-lisboa': ['Alenquer', 'Arruda', 'Bucelas', 'Carcavelos', 'Colares', 'Encostas d’Aire', 'Óbidos', 'Torres Vedras'],
  'region:gr-naoussa': ['Νάουσα'],
  'region:gr-nemea': ['Νεμέα'],
  'region:gr-santorini': ['Σαντορίνη'],
  'region:gb-england': ['English'],

  // Dataset errors: the 2022 file gives Valdeorras the municipalities of Alicante. Keep the circle.
  'region:es-valdeorras': [],
};
