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

  // Burgundy (the regional Bourgogne PDO also spreads into Beaujolais, so use its parts)
  'region:fr-burgundy': [
    'Chablis', 'Petit Chablis', 'Irancy',
    'Côte de Nuits-villages', 'Bourgogne Hautes Côtes de Nuits', 'Bourgogne Hautes Côtes de Beaune', 'Côte de Beaune',
    'Marsannay', 'Fixin', 'Gevrey-Chambertin', 'Morey-Saint-Denis', 'Chambolle-Musigny', 'Vougeot', 'Vosne-Romanée', 'Nuits-Saint-Georges',
    'Ladoix', 'Aloxe-Corton', 'Pernand-Vergelesses', 'Savigny-lès-Beaune', 'Beaune', 'Pommard', 'Volnay', 'Monthélie',
    'Auxey-Duresses', 'Saint-Romain', 'Meursault', 'Puligny-Montrachet', 'Chassagne-Montrachet', 'Saint-Aubin', 'Santenay', 'Maranges',
    'Rully', 'Mercurey', 'Givry', 'Montagny', 'Mâcon', 'Pouilly-Fuissé', 'Saint-Véran', 'Viré-Clessé',
  ],
  'region:fr-burgundy-chablis': ['Chablis'],
  'region:fr-burgundy-cote-de-nuits': [
    'Côte de Nuits-villages', 'Marsannay', 'Fixin', 'Gevrey-Chambertin', 'Morey-Saint-Denis', 'Chambolle-Musigny', 'Vougeot', 'Vosne-Romanée', 'Nuits-Saint-Georges',
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
};
